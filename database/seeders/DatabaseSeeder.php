<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Blog\Database\Seeders\BlogDatabaseSeeder;
use Modules\Certificate\Database\Seeders\CertificateDatabaseSeeder;
use Modules\Exam\Database\Seeders\ExamDatabaseSeeder;
use Modules\Language\Database\Seeders\LanguageDatabaseSeeder;
use Database\Seeders\InstructorSeeder;
use Database\Seeders\CourseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SettingsSeeder::class,
            NavbarSeeder::class,
            FooterSeeder::class,
            CategorySeeder::class,
            PageSeeder::class,
            AdminUserSeeder::class,
            InstructorSeeder::class,
            CourseSeeder::class,
            SectionSeeder::class,
            LessonSeeder::class,
            QuizSeeder::class,
            ExamCategorySeeder::class,
            DemoCourseCategorySeeder::class,
            DemoInstructorsSeeder::class,
            DemoCourseContentSeeder::class,
            DemoExamSeeder::class,
            BlogDatabaseSeeder::class,
            LanguageDatabaseSeeder::class,
            ArabicLanguageSeeder::class,
            CertificateDatabaseSeeder::class,
            ExamDatabaseSeeder::class,
        ]);
    }
}
