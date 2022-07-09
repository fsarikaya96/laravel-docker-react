<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    /**
     * @return object
     */
    public function index(): object
    {
        $vehicle = Vehicle::all();

        return response()->json(['success' => true, 'message' => $vehicle]);
    }

    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request): object
    {
        $validate = Validator::make($request->all(), [
            'plate' => 'required',
            'model' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        DB::table('vehicles')->insert([
            'plate' => $request->plate,
            'model' => $request->model,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Kaydedildi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function edit($id): object
    {
        $vehicle = Vehicle::find($id);
        if ($vehicle) {
            return response()->json(['success' => true, 'message' => $vehicle]);
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
            'plate' => 'required',
            'model' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        Vehicle::where('id', $id)->update([
            'plate' => $request->plate,
            'model' => $request->model,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Güncellendi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function destroy($id): object
    {
        Vehicle::where('id', $id)->delete();

        return response()->json(['success' => true, 'message' => "Başarıyla Silindi.."]);
    }

}
