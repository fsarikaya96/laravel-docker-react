<?php

use App\Http\Controllers\PassengerController;
use App\Http\Controllers\TypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/passenger',[PassengerController::class,'index']);
Route::post('/passenger-add',[PassengerController::class,'create']);
Route::get('/passenger-delete/{id}',[PassengerController::class,'destroy']);
Route::get('/passenger-type',[TypeController::class,'index']);
