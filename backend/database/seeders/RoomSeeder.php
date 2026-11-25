<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [];

        for ($i = 101; $i <= 120; $i++) {
            $rooms[] = [
                'room_number' => (string) $i,
                'room_type' => $i <= 108 ? 'مفردة' : ($i <= 116 ? 'مزدوجة' : 'جناح'),
                'status' => 'متاحة',
                'qr_code' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('rooms')->insert($rooms);
    }
}
