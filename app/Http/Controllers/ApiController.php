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

        // Fetch data from the events endpoit
        $api->fetch('results');

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

    public function tables(Request $request)
    {
        // Initiate a new API client
        $api = new ApiClient;

        // Fetch data from the events endpoit
        $api->fetch('tables');

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
