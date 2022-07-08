<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PassengerType extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'passenger_type';
}
