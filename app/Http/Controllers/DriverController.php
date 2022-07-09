<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DriverController extends Controller
{
    /**
     * @return object
     */
    public function index(): object
    {
        $driver = Driver::all();

        return response()->json(['success' => true, 'message' => $driver]);
    }

    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request): object
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'lastname' => 'required',
            'age' => 'required|numeric',
            'tc' => 'required|unique:drivers',
        ]);

        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        DB::table('drivers')->insert([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'age' => $request->age,
            'tc' => $request->tc,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Kaydedildi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function edit($id): object
    {
        $driver = Driver::find($id);
        if ($driver) {
            return response()->json(['success' => true, 'message' => $driver]);
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
            'lastname' => 'required',
            'age' => 'required|numeric',
            'tc' => 'required|unique:drivers,tc,'.$id,
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        $driverUpdate = Driver::where('id', $id)->update([
            'name'      => $request->name,
            'lastname'  => $request->lastname,
            'age'       => $request->age,
            'tc'        => $request->tc,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Güncellendi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function destroy($id):object
    {
        Driver::where('id',$id)->delete();
        return response()->json(['success' => true, 'message' => "Başarıyla Silindi.."]);
    }
}
