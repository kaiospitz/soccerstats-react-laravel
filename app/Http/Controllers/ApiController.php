<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clients\ApiClient;

class ApiController extends Controller
{
    public function events(Request $request)
    {
        // Initiate a new API client
        $api = new ApiClient;

        // Fetch league team data
        $api->fetchLeagueTeamData();

        // Fetch data from the events endpoit
        $api->fetchEvents('results');

        /**
         * Catch any errors in the API request
         * End with error response
         */
        if ($api->requestHasFailed || $api->requestErrorCode) {
            return response()->json(['errorCode' => $api->authErrorCode], 400);
        }

        /**
         * Merge the events data with the team data, there two come from two differente
         * enpoints so we need to merge them to serve it in one response
         */
        $api->mergeEventsAndTeamData();

        /**
         * Succesfull API request, respond with data
         */
        return response()->json($api->responseDataFinal, 200);
    }

    public function tables(Request $request)
    {
        // Initiate a new API client
        $api = new ApiClient;

        // Fetch data from the events endpoit
        $api->fetchEvents('tables');

        /**
         * Catch any errors in the API request
         * End with error response
         */
        if ($api->requestHasFailed || $api->requestErrorCode) {
            return response()->json(['errorCode' => $api->authErrorCode], 400);
        }

        /**
         * Succesfull API request, respond with data
         */
        return response()->json($api->responseData, 200);
    }
}
