<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
               // Create a user
        $user = User::create([
            'name' => 'Imana',
            'phoneNumber' => '9815335034',
            'password' => Hash::make('Imana@123'), // Replace with the hashed password
            'created_at' => now(),
            'updated_at' => now(),
        ]);


    }
}
