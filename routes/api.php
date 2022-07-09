<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\VehicleController;
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
Route::post('/passenger-create',[PassengerController::class,'create']);
Route::get('/passenger-edit/{id}',[PassengerController::class,'edit']);
Route::put('/passenger-update/{id}',[PassengerController::class,'update']);
Route::delete('/passenger-delete/{id}',[PassengerController::class,'destroy']);

Route::get('/passenger-type',[TypeController::class,'index']);
Route::post('/type-create',[TypeController::class,'create']);
Route::get('/type-edit/{id}',[TypeController::class,'edit']);
Route::put('/type-update/{id}',[TypeController::class,'update']);
Route::delete('/type-delete/{id}',[TypeController::class,'destroy']);

Route::get('/vehicle',[VehicleController::class,'index']);
Route::post('/vehicle-create',[VehicleController::class,'create']);
Route::get('/vehicle-edit/{id}',[VehicleController::class,'edit']);
Route::put('/vehicle-update/{id}',[VehicleController::class,'update']);
Route::delete('/vehicle-delete/{id}',[VehicleController::class,'destroy']);


Route::get('/driver',[DriverController::class,'index']);
Route::post('/driver-create',[DriverController::class,'create']);
Route::get('/driver-edit/{id}',[DriverController::class,'edit']);
Route::put('/driver-update/{id}',[DriverController::class,'update']);
Route::delete('/driver-delete/{id}',[DriverController::class,'destroy']);


//Route::post('/test',[TypeController::class,'test'])->name('test');
