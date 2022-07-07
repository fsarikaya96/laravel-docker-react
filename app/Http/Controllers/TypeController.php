<?php

namespace App\Http\Controllers;

use App\Models\PassengerType;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function index():object
    {
        return PassengerType::all();
    }
}
