<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('passenger_id')->unsigned();
            $table->bigInteger('vehicle_id')->unsigned();

            $table->date('start_date');
            $table->time('start_time');
            $table->string('start_location');
            $table->string('end_location');

            $table->foreign('passenger_id')->on('passengers')->references('id')->cascadeOnDelete();
            $table->foreign('vehicle_id')->on('vehicles')->references('id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transfers');
    }
};
