<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('application_details', function (Blueprint $table) {
            $table->id();
            $table->string('logo');
            $table->string('background_image');
            $table->timestamps();
        });


        // Insert a default row with a specific primary key value
        DB::table('application_details')->insert([
            'id' => 1, // Set a specific primary key value (e.g., 1)
            'logo' => 'logo.svg',
            'background_image' => 'background_image.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_details');
    }
};
