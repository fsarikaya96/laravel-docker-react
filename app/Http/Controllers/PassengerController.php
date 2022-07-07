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
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() : Collection
    {
        return Passenger::with('type')->orderBy('id', 'desc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return object
     */
    public function create(Request $request)
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return object
     */
    public function destroy($id)
    {
        $delete = Passenger::where('id',$id)->delete();
        if ($delete){
            return ResponseResult::generate(true,"Başarıyla Silinmiştir.",ResponseCodes::HTTP_OK);
        }
        return ResponseResult::generate(false,"Hatalı.",ResponseCodes::HTTP_NOT_FOUND);
    }
}
