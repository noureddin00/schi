<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course\Course;
use App\Models\Course\CourseSection;
use App\Models\Course\SectionLesson;
use App\Models\Course\CourseCategory;
use App\Models\Instructor;
use Illuminate\Support\Str;

class DemoCourseContentSeeder extends Seeder
{
    public function run(): void
    {
        $categories = CourseCategory::all();
        $instructors = Instructor::all();

        if ($categories->isEmpty() || $instructors->isEmpty()) {
            return;
        }

        // Create more courses if needed up to 30
        $existing = Course::count();
        $target = 30;
        $toCreate = max(0, $target - $existing);

        for ($i = 1; $i <= $toCreate; $i++) {
            $title = "Demo Course " . ($existing + $i);
            $course = Course::create([
                'title' => $title,
                'slug' => Str::slug($title . '-' . ($existing + $i)),
                'course_type' => 'recorded',
                'status' => 'published',
                'level' => 'beginner',
                'short_description' => 'A demo course mirroring Mentor LMS demo content.',
                'description' => 'This course was created by the DemoCourseContentSeeder for local testing.',
                'language' => 'en',
                'instructor_id' => $instructors->random()->id,
                'course_category_id' => $categories->random()->id,
            ]);

            // Add sections and lessons
            for ($s = 1; $s <= 3; $s++) {
                $section = CourseSection::create([
                    'sort' => $s,
                    'title' => "Section {$s}",
                    'course_id' => $course->id,
                ]);

                for ($l = 1; $l <= 3; $l++) {
                    SectionLesson::create([
                        'title' => "Lesson {$l} - Section {$s}",
                        'sort' => $l,
                        'status' => 1, // 1 = published, 0 = draft
                        'lesson_type' => 'video',
                        'lesson_provider' => 'upload',
                        'lesson_src' => '',
                        'embed_source' => null,
                        'thumbnail' => null,
                        'duration' => '00:05:00',
                        'is_free' => ($s === 1 && $l === 1) ? 1 : 0,
                        'description' => 'Demo lesson content.',
                        'summary' => 'Short summary',
                        'course_id' => $course->id,
                        'course_section_id' => $section->id,
                    ]);
                }
            }
        }
    }
}
