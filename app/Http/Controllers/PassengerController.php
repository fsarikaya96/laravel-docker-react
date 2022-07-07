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
    public function index(): object
    {
        $passenger = Passenger::with('type')->orderBy('id', 'desc')->get();

        return ResponseResult::generate(true, $passenger, ResponseCodes::HTTP_OK);

    }

    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request): object
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|min:5',
            'lastname' => 'required|min:7',
            'phone' => 'required|min:15',
            'type' => 'required'
        ]);

        if ($validate->fails()) {
//            return ResponseResult::generate(false,$validate->messages(),ResponseCodes::HTTP_BAD_REQUEST);

            return response()->json(['success'=>false,'errors' => $validate->messages()]);

        }
        DB::table('passengers')->insert([
            'name' => $request->name,
            'phone' => $request->phone,
            'lastname' => $request->lastname,
            'type_id' => $request->type,
        ]);
        return ResponseResult::generate(true, "Başarıyla Kaydedildi..", ResponseCodes::HTTP_OK);
    }

    public function edit($id): object
    {
        $passenger = Passenger::find($id);
        if ($passenger) {
            return response()->json(['success' => true, 'message' => $passenger]);
        }else {
            return response()->json(['success' => false, 'message' => "Böyle Bir Kayıt Bulunamadı.."]);
        }

        /*
        if ($passenger) {
            return ResponseResult::generate(true, $passenger, ResponseCodes::HTTP_OK);
        }
        return ResponseResult::generate(false, "Kişi Bulunamadı..", ResponseCodes::HTTP_NOT_FOUND);
        */
    }

    public function update(Request $request, $id): object
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|min:5',
            'lastname' => 'required|min:7',
            'phone' => 'required|min:15',
            'type' => 'required'
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors(),'errorCode' => 404]);
//            return ResponseResult::generate(false,$validate->errors(), ResponseCodes::HTTP_BAD_REQUEST);
        }

        Passenger::where('id', $id)->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'lastname' => $request->lastname,
            'type_id' => $request->type,
        ]);

        return ResponseResult::generate(true,"Başarıyla Güncellendi..", ResponseCodes::HTTP_OK);
    }
    public function destroy($id): object
    {
        $passenger = Passenger::where('id',$id)->delete();
        if ($passenger)
        {
            return ResponseResult::generate(true,"Başarıyla Silinmiştir..",ResponseCodes::HTTP_OK);
        }
        return ResponseResult::generate(false,"Silinemedi..",ResponseCodes::HTTP_BAD_REQUEST);
    }
}
