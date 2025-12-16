<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course\CourseSection;
use App\Models\Course\SectionQuiz;
use App\Models\Course\QuizQuestion;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = CourseSection::all();

        foreach ($sections as $section) {
            // Create 1-2 quizzes per section
            $quizCount = random_int(1, 2);

            for ($i = 1; $i <= $quizCount; $i++) {
                $quiz = SectionQuiz::create([
                    'course_id' => $section->course_id,
                    'course_section_id' => $section->id,
                    'title' => "Quiz {$i}: " . $this->getRandomQuizTitle(),
                    'duration' => 30,
                    'hours' => 0,
                    'minutes' => 30,
                    'seconds' => 0,
                    'total_mark' => 100,
                    'pass_mark' => 60,
                    'retake' => true,
                    'drip_rule' => null,
                    'summary' => null,
                    'num_questions' => 5,
                ]);

                // Add 5 questions to each quiz
                $this->createQuizQuestions($quiz, 5);
            }
        }
    }

    private function createQuizQuestions(SectionQuiz $quiz, int $count): void
    {
        $questionTypes = ['single', 'multiple', 'boolean'];

        for ($i = 1; $i <= $count; $i++) {
            $type = $questionTypes[array_rand($questionTypes)];
            
            $options = [];
            $answer = null;

            if ($type === 'boolean') {
                $options = ['True', 'False'];
                $answer = array_rand($options);
            } else {
                $options = ['Option A', 'Option B', 'Option C', 'Option D'];
                $answer = array_rand($options);
            }

            QuizQuestion::create([
                'section_quiz_id' => $quiz->id,
                'title' => "Question {$i}: " . $this->getRandomQuestion(),
                'type' => $type,
                'options' => json_encode($options),
                'answer' => json_encode([$answer]),
                'sort' => $i,
            ]);
        }
    }

    private function getRandomQuizTitle(): string
    {
        $titles = [
            'Understanding the Basics',
            'Practical Application',
            'Concept Mastery',
            'Real-world Scenarios',
            'Problem Solving',
            'Advanced Concepts',
            'Integration Skills',
            'Best Practices Review',
        ];

        return $titles[array_rand($titles)];
    }

    private function getRandomQuestion(): string
    {
        $questions = [
            'What is the main purpose of this concept?',
            'How would you implement this in a real scenario?',
            'Which of the following is the best practice?',
            'What is the expected outcome?',
            'How does this relate to previous lessons?',
            'What is the recommended approach?',
            'Which tool is most suitable?',
            'How would you debug this issue?',
            'What is the correct syntax?',
            'How do you handle errors?',
        ];

        return $questions[array_rand($questions)];
    }
}
