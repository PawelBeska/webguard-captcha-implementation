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

    public function store(Request $request): string
    {
        return match (WebGuard::validate($request->get('wbg-captcha-verification-token'), $request->get('wbg-captcha-verification-input'))) {
            true => 'Pomyślnie zarejestrowano',
            false => 'Nie udało się zarejestrować'
        };
    }
}
