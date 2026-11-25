<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@aljabrihotel.com'],
            [
                'name' => 'مدير النظام',
                'password' => Hash::make('Admin@123456'),
                'role' => 'admin',
            ]
        );
    }
}