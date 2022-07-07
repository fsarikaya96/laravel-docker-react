<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseCodes;
use App\Helpers\ResponseResult;
use App\Models\Passenger;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PassengerController extends Controller
{
    /**
     * @return object
     */
    public function index() : object
    {
        $passenger = Passenger::with('type')->orderBy('id', 'desc')->get();

        return ResponseResult::generate(true,$passenger,ResponseCodes::HTTP_OK);

    }
    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request) :object
    {
        $validate = Validator::make($request->all(),[
            'name' => 'required',
            'lastname' => 'required',
            'phone' => 'required',
            'type' => 'required'
        ]);

        if ($validate->fails()){
//            return ResponseResult::generate(false,$validate->messages(),ResponseCodes::HTTP_BAD_REQUEST);

            return response()->json([
                'validate_err' => $validate->messages()
            ]);

        }
        DB::table('passengers')->insert([
            'name' => $request->name,
            'phone' => $request->phone,
            'lastname' => $request->lastname,
            'type_id' => $request->type,
        ]);
        return ResponseResult::generate(true,"Başarıyla Kaydedildi..",ResponseCodes::HTTP_OK);
    }
}
