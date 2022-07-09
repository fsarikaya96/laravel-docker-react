<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;
    public function getPassenger()
    {
        return $this->belongsTo(Passenger::class,'passenger_id','id');
    }

    public function getVehicle()
    {
        return $this->belongsTo(Vehicle::class,'vehicle_id','id');
    }

    public function getDriver()
    {
        return $this->belongsTo(Driver::class,'driver_id','id');
    }
}
