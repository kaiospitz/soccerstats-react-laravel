<?php

namespace App\Clients;

use Illuminate\Support\Facades\Http;


class ApiClient
{
    /**
     * API variables
     */
    private $apiBaseUrl = 'https://www.thesportsdb.com/api/v1/json/50130162';
    private $apiEndpoints = [
        'eventsEndpoint' => '/eventsseason.php',
        'eventsQuery' => [
            'id' => '4328',
            's' => '2021-2022'
        ],
        'tablesEndpoint' => '/lookuptable.php',
        'tablesQuery' => [
            'l' => '4328',
            's' => '2021-2022'
        ],
        'leagueTeamDataEndpoint' => '/lookup_all_teams.php',
        'leagueTeamDataQuery' => [
            'id' => '4328'
        ]
    ];

    /**
     * Error handling
     */
    public $requestHasFailed = false;
    public $requestErrorCode = '';

    /**
     * Response data
     */
    public $responseData = '';
    public $responseLeagueTeamData = [];
    public $responseDataFinal = [];

    /**
     * Fetch the events data from the API
     */
    function fetchEvents($endpoint)
    {

        /**
         * Set the url and queries
         */
        if ($endpoint == 'results') {
            $response = Http::get($this->apiBaseUrl . $this->apiEndpoints['eventsEndpoint'], $this->apiEndpoints['eventsQuery']);
        } else if ($endpoint == 'tables') {
            $response = Http::get($this->apiBaseUrl . $this->apiEndpoints['tablesEndpoint'], $this->apiEndpoints['tablesQuery']);
        }

        $statusCode = $response->status();
        $responseJSON = json_decode($response->getBody(), true);

        /**
         * Check for unexpected response codes
         */
        if ($statusCode !== 200) {
            $this->requestHasFailed = true;
            $this->requestErrorCode = 'fetchEvents_request_fail';
            return;
        } else {

            /**
             * Check if all expected data are in our response
             */
            if ($endpoint == 'results') {
                // Check for correct results data
                if (!isset($responseJSON['events'])) {
                    $this->authHasFailed = true;
                    $this->authErrorCode = 'fetchEvents_bad_response';
                    return;
                }
            } else if ($endpoint == 'tables') {
                // Check for correct table data
                if (!isset($responseJSON['table'])) {
                    $this->authHasFailed = true;
                    $this->authErrorCode = 'fetchEvents_bad_response';
                    return;
                }
            }

            /**
             * Successful request;
             */
            $this->responseData = $responseJSON;
        }
    }


    /**
     * Fetch league team data
     */
    function fetchLeagueTeamData()
    {
        /**
         * Set the url and queries
         */
        $response = Http::get($this->apiBaseUrl . $this->apiEndpoints['leagueTeamDataEndpoint'], $this->apiEndpoints['leagueTeamDataQuery']);

        $statusCode = $response->status();
        $responseJSON = json_decode($response->getBody(), true);

        /**
         * Check for unexpected response codes
         */
        if ($statusCode !== 200) {
            $this->requestHasFailed = true;
            $this->requestErrorCode = 'fetchLeagueTeamData_request_fail';
            return;
        } else {

            /**
             * Check if all expected data are in our response
             */
            if (!isset($responseJSON['teams'])) {
                $this->authHasFailed = true;
                $this->authErrorCode = 'fetchLeagueTeamData_bad_response';
                return;
            }
        }

        /**
         * Successful request;
         * Create a new array where the team's ID is the array key
         * So we can call it in the future with $this->responseLeagueTeamData[15851]
         * instead of having to loop search through the array everytime we want to grab
         * some data from this object for a specific team
         */
        $tempArray = [];
        $object = json_decode(json_encode($responseJSON), FALSE);

        $object = $object->teams;

        foreach ($object as $row) {
            $tempArray[$row->idTeam] = $row;
        }

        $this->responseLeagueTeamData = $tempArray;
    }

    /**
     * Merge fetchEvents and fetchLeagueTeamData
     * Events data does not contain data such as team logo and stadium name
     * So we merge with the fetchLeagueTeamData that contains all this extra information we need
     * Returns an array cotaining the event data, home team and away team data
     */
    function mergeEventsAndTeamData()
    {
        $tempArray = [];
        $object = json_decode(json_encode($this->responseData), FALSE);

        $object = $object->events;

        // Iterates the events object
        foreach ($object as $event) {
            $tempArray = [
                // all event data from fetchEvents
                'eventData' => [
                    $event
                ],
                // all event data from fetchLeagueTeamData related to this team
                'homeTeamData' => [
                    $this->responseLeagueTeamData[$event->idHomeTeam]
                ],
                // all event data from fetchLeagueTeamData related to this team
                'awayTeamData' => [
                    $this->responseLeagueTeamData[$event->idAwayTeam]
                ]
            ];

            array_push($this->responseDataFinal, $tempArray);
        }
    }
}
