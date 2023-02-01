<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Example implementation of WebGuard Captcha</title>


    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>
        html,
        body {
            height: 100%;
        }

        body {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #f5f5f5;
        }

        .form-signin {
            width: 100%;
            max-width: 330px;
            padding: 15px;
            margin: auto;
        }

        .form-signin .checkbox {
            font-weight: 400;
        }

        .form-signin .form-control {
            position: relative;
            box-sizing: border-box;
            height: auto;
            padding: 10px;
            font-size: 16px;
        }

        .form-signin .form-control:focus {
            z-index: 2;
        }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        textarea:focus,
        input[type="text"]:focus,
        input[type="password"]:focus,
        input[type="datetime"]:focus,
        input[type="datetime-local"]:focus,
        input[type="date"]:focus,
        input[type="month"]:focus,
        input[type="time"]:focus,
        input[type="week"]:focus,
        input[type="number"]:focus,
        input[type="email"]:focus,
        input[type="url"]:focus,
        input[type="search"]:focus,
        input[type="tel"]:focus,
        input[type="color"]:focus,
        .uneditable-input:focus {
            border-color: unset;
            box-shadow: unset;
            outline: 0 none;
        }

        .btn-primary:hover {
            color: #f5f5f5;
            background-color: #31373d !important;
            border-color: #31373d!important;
        }
        .btn-primary {
            color: #f5f5f5;
            background-color:#212529!important;
            border-color: #212529!important;
        }

    </style>
    <link rel="stylesheet" type="text/css" href="recaptcha.css">
</head>
<body class="text-center">
<form class="form-signin" method="post" action="{{route('api.example')}}">
    <h1 class="h3 mb-3 font-weight-normal">Formularz rejestracyjny</h1>
    <div class="form-group">
        <label for="inputEmail" class="sr-only">E-mail</label>
        <input name="email" type="email" id="inputEmail" class="form-control" value="test@example.com" placeholder="Wpisz e-mail" required="" autofocus=""/>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="sr-only">Hasło</label>
        <input name="password" type="password" id="password" class="form-control" value="test1234" placeholder="Wpisz hasło" required=""/>
    </div>
    <div id="recaptcha"></div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Zarejestruj się</button>
</form>
<script type="text/javascript" src="recaptcha.js"></script>
<script>
    new WBG_Recaptcha({
        container_id: "recaptcha",
        public_key: "293b5a57-a1d9-455c-a497-1485e86290e9",
        style: "light"
    })
</script>

</body>
</html>
