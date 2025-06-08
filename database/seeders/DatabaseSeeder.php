<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'role' => 'admin',
            'phone' => '+6282296537487',
            'address' => 'BTN SUTRA INDAH',
            'city' => 'Sengkang',
            'state' => 'Wajo',
            'postal_code' => '90911',
            'profile_picture' => Storage::url('/images/image-1.jpg'),
        ]);
    }
}
