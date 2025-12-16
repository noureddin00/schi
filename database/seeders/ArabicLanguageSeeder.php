<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Language\Models\Language;
use Modules\Language\Models\LanguageProperty;

class ArabicLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create or update Arabic language
        $arabic = Language::firstOrCreate(
            ['code' => 'ar'],
            [
                'name' => 'العربية',
                'nativeName' => 'العربية',
                'is_active' => true,
                'is_default' => false,
            ]
        );

        // Arabic translations grouped by type
        $groups = [
            'auth' => [
                'login' => 'دخول',
                'register' => 'تسجيل',
                'logout' => 'تسجيل خروج',
                'email_address' => 'عنوان البريد الإلكتروني',
                'password' => 'كلمة المرور',
                'confirm_password' => 'تأكيد كلمة المرور',
                'remember_me' => 'تذكرني',
                'forgot_password' => 'هل نسيت كلمة مرورك؟',
            ],
            'common' => [
                'title' => 'العنوان',
                'description' => 'الوصف',
                'name' => 'الاسم',
                'email' => 'البريد الإلكتروني',
                'password' => 'كلمة المرور',
                'type' => 'النوع',
                'category' => 'الفئة',
                'status' => 'الحالة',
                'active' => 'نشط',
                'inactive' => 'غير نشط',
                'published' => 'منشور',
                'draft' => 'مسودة',
                'search' => 'بحث',
                'filter' => 'تصفية',
                'create' => 'إنشاء',
                'update' => 'تحديث',
                'edit' => 'تحرير',
                'save' => 'حفظ',
                'delete' => 'حذف',
                'courses' => 'الدورات',
                'students' => 'الطلاب',
                'instructor' => 'المدرس',
            ],
            'dashboard' => [
                'dashboard' => 'لوحة التحكم',
                'courses' => 'الدورات',
                'students' => 'الطلاب',
                'instructors' => 'المدرسون',
                'categories' => 'الفئات',
                'settings' => 'الإعدادات',
                'profile' => 'الملف الشخصي',
                'my_courses' => 'دوراتي',
                'wishlist' => 'قائمة الرغبات',
                'reviews' => 'التقييمات',
                'certificates' => 'الشهادات',
                'assignments' => 'المهام',
                'quizzes' => 'الاختبارات',
                'exams' => 'الإختبارات',
            ],
        ];

        foreach ($groups as $groupName => $translations) {
            // Create a combined properties object
            $properties = [];
            foreach ($translations as $key => $value) {
                $properties[] = [
                    'slug' => $key,
                    'name' => ucfirst(str_replace('_', ' ', $key)),
                ];
            }

            LanguageProperty::firstOrCreate(
                ['slug' => $groupName, 'language_id' => $arabic->id],
                [
                    'group' => $groupName,
                    'name' => ucfirst($groupName),
                    'slug' => $groupName,
                    'properties' => json_encode($translations),
                ]
            );
        }
    }
}
