<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PassengerController extends Controller
{
    /**
     * @return object
     */
    public function index(): object
    {
        $passenger = Passenger::with('type')->get();
        return response()->json(['success' => true, 'message' => $passenger]);

    }

    /** Sort By Passenger Type
     * @return object
     */
    public function sort(): object
    {
        Passenger::orderBy('type_id', 'desc')->get();
        return response()->json(['success' => true, 'message' => "Yolcu Tipleri Sıralandı..."]);
    }

    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request): object
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'lastname' => 'required|min:5',
            'phone' => 'required|min:10',
            'type' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        DB::table('passengers')->insert([
            'name' => $request->name,
            'phone' => $request->phone,
            'lastname' => $request->lastname,
            'type_id' => $request->type,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Kaydedildi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function edit($id): object
    {
        $passenger = Passenger::find($id);
        if ($passenger) {
            return response()->json(['success' => true, 'message' => $passenger,], 200);
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
            'lastname' => 'required|min:5',
            'phone' => 'required|min:10',
            'type' => 'required'
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);

        }
        Passenger::where('id', $id)->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'lastname' => $request->lastname,
            'type_id' => $request->type,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Güncellendi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function destroy($id): object
    {
        $passenger = Passenger::where('id', $id)->delete();
        if ($passenger) {
            return response()->json(['success' => true, 'message' => "Başarıyla Silinmiştir.."]);
        }
        return response()->json(['success' => false, 'message' => "Silinemedi.."], 404);
    }
}
