<?php

namespace App\Helpers;


class ResponseResult
{
    public static function generate(bool $success = true,$message = null, int $errorCode = 200 ): object
    {
        if($success)
            return response()->json(['success' => $success, 'message' => $message], $errorCode);
        else {
            return response()->json(['success' => $success, 'errorMessage' => $message, 'errorCode' => $errorCode], $errorCode);
        }
    }
}
