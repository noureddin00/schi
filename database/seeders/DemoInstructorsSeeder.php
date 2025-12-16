<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Instructor;
use Illuminate\Support\Facades\Hash;

class DemoInstructorsSeeder extends Seeder
{
    public function run(): void
    {
        $demo = [
            ['name' => 'John Doe', 'email' => 'john.doe@example.com', 'designation' => 'Senior Developer'],
            ['name' => 'Jane Smith', 'email' => 'jane.smith@example.com', 'designation' => 'UI/UX Designer'],
            ['name' => 'Carlos Rivera', 'email' => 'carlos.rivera@example.com', 'designation' => 'Business Coach'],
            ['name' => 'Aisha Khan', 'email' => 'aisha.khan@example.com', 'designation' => 'Marketing Expert'],
            ['name' => 'Liu Wei', 'email' => 'liu.wei@example.com', 'designation' => 'Data Scientist'],
            ['name' => 'Emma Wilson', 'email' => 'emma.wilson@example.com', 'designation' => 'Photographer'],
            ['name' => 'Oliver Brown', 'email' => 'oliver.brown@example.com', 'designation' => 'Music Producer'],
            ['name' => 'Sara Patel', 'email' => 'sara.patel@example.com', 'designation' => 'IT Specialist'],
        ];

        foreach ($demo as $d) {
            $user = User::updateOrCreate([
                'email' => $d['email']
            ], [
                'name' => $d['name'],
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'role' => 'instructor',
            ]);

            Instructor::updateOrCreate([
                'user_id' => $user->id,
            ], [
                'skills' => json_encode(['Teaching', 'Course Creation']),
                'biography' => "{$d['name']} is an experienced {$d['designation']}",
                'resume' => '',
                'designation' => $d['designation'],
                'status' => 'active',
                'payout_methods' => json_encode([]),
            ]);
        }
    }
}
