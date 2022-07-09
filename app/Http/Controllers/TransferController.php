<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransferController extends Controller
{
    public function index()
    {
        $transfer = Transfer::with('getPassenger', 'getVehicle', 'getDriver')->get();
        return response()->json(['success' => true, 'message' => $transfer]);
    }

    public function create(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'passenger_id' => 'required',
            'vehicle_id' => 'required',
            'driver_id' => 'required',
            'start_date' => 'required',
            'start_time' => 'required',
            'start_location' => 'required',
            'end_location' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
        DB::table('transfers')->insert([
            'passenger_id' => $request->passenger_id,
            'vehicle_id' => $request->vehicle_id,
            'driver_id' => $request->driver_id,
            'start_date' => $request->start_date,
            'start_time' => $request->start_time,
            'start_location' => $request->start_location,
            'end_location' => $request->end_location,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Kaydedildi.."]);
    }

    /**
     * @param $id
     * @return object
     */
    public function edit($id): object
    {
        $transfer = Transfer::find($id);
        if ($transfer) {
            return response()->json(['success' => true, 'message' => $transfer]);
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
            'passenger_id' => 'required',
            'vehicle_id' => 'required',
            'driver_id' => 'required',
            'start_date' => 'required',
            'start_time' => 'required',
            'start_location' => 'required',
            'end_location' => 'required',
        ]);
        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()]);
        }
         Transfer::where('id', $id)->update([
             'passenger_id' => $request->passenger_id,
             'vehicle_id' => $request->vehicle_id,
             'driver_id' => $request->driver_id,
             'start_date' => $request->start_date,
             'start_time' => $request->start_time,
             'start_location' => $request->start_location,
             'end_location' => $request->end_location,
        ]);
        return response()->json(['success' => true, 'message' => "Başarıyla Güncellendi.."]);
    }
    public function destroy($id): object
    {
        Transfer::where('id',$id)->delete();
        return response()->json(['success' => true, 'message' => "Başarıyla Silindi.."]);
    }
    public function today():object
    {
        $transfer = Transfer::with('getPassenger', 'getVehicle', 'getDriver')->whereDate('start_date', Carbon::today())->get();
        return response()->json(['success' => true, 'message' => $transfer]);

    }
}
