<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseCodes;
use App\Helpers\ResponseResult;
use App\Models\PassengerType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TypeController extends Controller
{
    public function index():object
    {
        $type =  PassengerType::all();
        return response()->json(['success' => true, 'message' => $type]);
    }

    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request): object
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        DB::table('passenger_type')->insert([
            'name' => $request->name,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Kaydedildi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function edit($id): object
    {
        $type = PassengerType::find($id);
        if ($type) {
            return response()->json(['success' => true, 'message' => $type]);
        } else {
            return response()->json(['success' => false, 'errors' => "Böyle Bir Kayıt Bulunamadı.."]);
        }

    }

    /**
     * @param Request $request
     * @param $id
     * @return object
     */
    public function update(Request $request, $id): object
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        PassengerType::where('id', $id)->update([
            'name' => $request->name,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Güncellendi.."]);
    }
    public function destroy($id)
    {
        $type = PassengerType::where('id',$id)->delete();

        if ($type) {
            return response()->json(['success' => true, 'message' => "Başarıyla Silinmiştir.."]);
        }
        return response()->json(['success' => false, 'message' => "Silinemedi.."], 404);
    }
/*
    public function test(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'lastname' => 'required',
        ]);
        if ($validate->fails()) {
//            return response()->json(['success' => false, 'errorMessage' => $validate->messages()->all()],404);
             return ResponseResult::generate(false,$validate->messages()->all(),ResponseCodes::HTTP_BAD_REQUEST);
        }
        return ResponseResult::generate(true,"Başarılı",ResponseCodes::HTTP_OK);
    }
*/

}
