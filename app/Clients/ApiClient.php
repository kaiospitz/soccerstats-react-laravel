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

    /**
     * Fetch the events data from the API
     */
    function fetch($endpoint)
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
            $this->requestErrorCode = 'request_fail';
            return;
        } else {

            /**
             * Check if all expected data are in our response
             */
            if ($endpoint == 'results') {
                // Check for correct results data
                if (!isset($responseJSON['events'])) {
                    $this->authHasFailed = true;
                    $this->authErrorCode = 'bad_response';
                    return;
                }
            } else if ($endpoint == 'tables') {
                // Check for correct table data
                if (!isset($responseJSON['table'])) {
                    $this->authHasFailed = true;
                    $this->authErrorCode = 'bad_response';
                    return;
                }
            }

            /**
             * Successful request;
             */
            $this->responseData = $responseJSON;
        }
    }
}
