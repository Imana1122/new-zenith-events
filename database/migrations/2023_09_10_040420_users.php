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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phoneNumber')->unique();
            $table->string('password');
            $table->timestamps();
        });

        // Insert a default row with a specific primary key value
        DB::table('users')->insert([
            'id' => 1, // Set a specific primary key value (e.g., 1)
            'name' => 'Dszenith',
            'phoneNumber' => '985-2054672',
            'password' => 'Dszenith@123',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
