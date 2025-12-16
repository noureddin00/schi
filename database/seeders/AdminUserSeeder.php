<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'dev@schi.com'],
            [
                'name' => 'dev man',
                'email_verified_at' => now(),
                'password' => Hash::make('P@ssw0rd/123'),
                'role' => 'admin',
            ]
        );

        $this->command->info('Admin user created successfully!');
        $this->command->line('Email: dev@schi.com');
        $this->command->line('Password: P@ssw0rd/123');
    }
}
