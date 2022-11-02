<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;
use WebGuard\Facades\WebGuard;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function store(Request $request)
    {
        /**
         * wbg-captcha-verification-token
         * wbg-captcha-verification-input
         */
        dd($this->test_composer_package($request->get('wbg-captcha-verification-token'), $request->get('wbg-captcha-verification-input')));
    }





    private function test_composer_package($token, $input): bool
    {
        return WebGuard::validate($token, $input);
    }
}
