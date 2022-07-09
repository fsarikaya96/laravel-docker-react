<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

</head>
<body>
<div id="app"></div>

{{--<div id="ajaxFails">--}}
{{--    <ul></ul>--}}
{{--</div>--}}
{{--<form id="ajaxForm" method="post" action="{{ route('test') }}">--}}
{{--    <input type="text" name="name">--}}
{{--    <input type="text" name="lastname">--}}
{{--    <button>Gönder</button>--}}
{{--</form>--}}
<script src="{{ asset('js/app.js') }}"></script>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<script>
    /*
    $(document).ready(function () {
        $(document).on('click', 'button', function (e) {
            let form = $('#ajaxForm').serializeArray();
            console.log(form);
            e.preventDefault();
            $.ajax({
                url: 'api/test',
                data: form,
                type: 'POST',
                success: function (result) {
                console.log(result);
                    if (result.success === true) {
                        console.log("Başarılı");
                    } else {
                        result.errorMessage.forEach(function (data) {
                            $('#ajaxFails ul').append('<li>' + data + '</li>');
                            $('#ajaxFails').show();
                        });
                    }
                }
            });
        });
    });
*/
</script>
</body>
</html>
