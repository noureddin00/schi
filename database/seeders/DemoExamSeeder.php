<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Exam\Models\Exam;
use Modules\Exam\Models\ExamCategory;
use Modules\Exam\Models\ExamQuestion;
use Modules\Exam\Models\ExamQuestionOption;
use Illuminate\Support\Str;

class DemoExamSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'General Knowledge',
            'Programming',
            'Mathematics',
            'Science',
        ];

        foreach ($categories as $catTitle) {
            $category = ExamCategory::firstOrCreate([
                'title' => $catTitle,
            ], ['icon' => 'clipboard']);

            // create 2 exams per category
            for ($e = 1; $e <= 2; $e++) {
                $title = "{$catTitle} Exam {$e}";
                $exam = Exam::firstOrCreate([
                    'title' => $title,
                ], [
                    'slug' => Str::slug($title),
                    'description' => "Demo exam for {$catTitle}",
                    'duration_hours' => 0,
                    'duration_minutes' => 30,
                    'status' => 'published',
                    'level' => 'beginner',
                    'pass_mark' => 60,
                    'total_marks' => 100,
                    'exam_category_id' => $category->id,
                    'instructor_id' => 1, // Default instructor
                ]);

                // create 3 questions
                for ($q = 1; $q <= 3; $q++) {
                    $question = ExamQuestion::create([
                        'exam_id' => $exam->id,
                        'title' => "Question {$q} for {$title}",
                        'question_type' => 'multiple_choice',
                        'description' => "Demo question description",
                        'marks' => 10,
                        'sort' => $q,
                    ]);

                    // create options
                    $options = [
                        'Option A',
                        'Option B',
                        'Option C',
                        'Option D',
                    ];
                    
                    // Save options as JSON
                    $question->update([
                        'options' => json_encode($options)
                    ]);
                }
            }
        }
    }
}
