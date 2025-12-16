<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course\CourseCategory;

class DemoCourseCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Development',
            'Business',
            'Design',
            'Marketing',
            'IT & Software',
            'Personal Development',
            'Photography',
            'Music',
        ];

        foreach ($categories as $index => $title) {
            CourseCategory::firstOrCreate([
                'slug' => \Illuminate\Support\Str::slug($title),
            ], [
                'title' => $title,
                'sort' => $index + 1,
                'status' => 1,
            ]);
        }
    }
}
