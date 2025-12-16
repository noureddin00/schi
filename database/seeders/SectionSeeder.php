<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course\Course;
use App\Models\Course\CourseSection;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            // Create 2-3 sections per course
            $sectionCount = random_int(2, 3);
            
            for ($i = 1; $i <= $sectionCount; $i++) {
                CourseSection::create([
                    'course_id' => $course->id,
                    'title' => "Section {$i}: " . $this->getRandomSectionTitle(),
                    'sort' => $i,
                ]);
            }
        }
    }

    private function getRandomSectionTitle(): string
    {
        $titles = [
            'Introduction and Basics',
            'Core Concepts & Fundamentals',
            'Advanced Techniques',
            'Real-world Applications',
            'Best Practices & Optimization',
            'Project Development',
            'Testing & Deployment',
            'Troubleshooting & Debugging',
            'Performance Tuning',
            'Integration & APIs',
        ];

        return $titles[array_rand($titles)];
    }
}
