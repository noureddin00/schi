<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course\CourseSection;
use App\Models\Course\SectionLesson;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = CourseSection::all();

        foreach ($sections as $section) {
            // Create 3-5 lessons per section
            $lessonCount = random_int(3, 5);

            for ($i = 1; $i <= $lessonCount; $i++) {
                $title = "Lesson {$i}: " . $this->getRandomLessonTitle();
                $duration = random_int(5, 45);

                SectionLesson::create([
                    'course_id' => $section->course_id,
                    'course_section_id' => $section->id,
                    'title' => $title,
                    'sort' => $i,
                    'status' => 1, // 1 = published, 0 = draft
                    'lesson_type' => 'video',
                    'lesson_provider' => 'youtube',
                    'lesson_src' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'embed_source' => 'youtube',
                    'thumbnail' => null,
                    'duration' => $duration,
                    'is_free' => $i === 1 ? true : false, // First lesson is free
                    'description' => 'In this lesson, we cover important concepts and practical examples.',
                    'summary' => 'Learn the essentials in ' . $duration . ' minutes.',
                    'lesson_number' => $i,
                ]);
            }
        }
    }

    private function getRandomLessonTitle(): string
    {
        $titles = [
            'Getting Started',
            'Installation & Setup',
            'Configuration',
            'Building Your First Project',
            'Working with Data',
            'API Integration',
            'Error Handling',
            'Performance Optimization',
            'Security Best Practices',
            'Deployment Strategies',
            'Version Control',
            'Testing Fundamentals',
            'Advanced Patterns',
            'Database Design',
            'Scalability Considerations',
        ];

        return $titles[array_rand($titles)];
    }
}
