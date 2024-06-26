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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('price');
            $table->string('address');
            $table->string('start_date');
            $table->string('end_date');
            $table->string('workshop');
            $table->text('description');
            $table->text('eventHostDetails');
            $table->decimal('vat', 5, 2);
            $table->text('imagePath')->nullable(); // Make imagePath column nullable
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
