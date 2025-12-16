<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Exam\Models\ExamCategory;

class ExamCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Certification Exams',
            'Practice Tests',
            'Final Assessments',
            'Midterm Exams',
            'Skill Validations',
            'Proficiency Tests',
        ];

        foreach ($categories as $category) {
            try {
                ExamCategory::firstOrCreate([
                    'slug' => Str::slug($category),
                ], [
                    'title' => $category,
                    'slug' => Str::slug($category),
                ]);
            } catch (\Exception $e) {
                // Skip if ExamCategory table or model doesn't exist
                continue;
            }
        }
    }
}
