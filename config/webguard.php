<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Auth keys
    |--------------------------------------------------------------------------
    |
    | This values represents authorization data witch is required to successfully
    | maintain connection with right service in WebGuard API
    |
    */

    'public_key' => env('WEBGUARD_PUBLIC_KEY'),
    'private_key' => env('WEBGUARD_PRIVATE_KEY'),

];
