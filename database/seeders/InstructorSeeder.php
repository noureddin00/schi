<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Instructor;
use Illuminate\Support\Facades\Hash;

class InstructorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = 5;

        for ($i = 1; $i <= $count; $i++) {
            $user = User::updateOrCreate([
                'email' => "instructor{$i}@example.com",
            ], [
                'name' => "Instructor {$i}",
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'role' => 'instructor',
            ]);

            Instructor::updateOrCreate([
                'user_id' => $user->id,
            ], [
                'skills' => json_encode(['Teaching', 'Subject Matter']),
                'biography' => "Biography for Instructor {$i}",
                'resume' => '',
                'designation' => 'Instructor',
                'status' => 'active',
                'payout_methods' => json_encode([]),
            ]);
        }
    }
}
