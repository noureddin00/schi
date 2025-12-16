# 📋 Incomplete Tasks & Future Work

## 🌍 Multilingual System (JSON-Based Translation)

### ✅ Completed:
- Created `HasTranslations` trait for JSON-based translations
- Added `translations` column to: `page_sections`, `courses`, `course_categories`
- Created `PageSectionResource` for transforming translated content
- Created `TranslationEditor` React component for admin UI
- Updated `PageSection` model with trait and casts
- Fixed `PageSection` fillable array (added sub_title, background_image, video_url, etc.)
- Re-enabled Resource transformation in HandleInertiaRequests middleware
- **Homepage sections now display properly** ✅

### ⚠️ Current Issue (December 11, 2025):
**Sections display correctly BUT translations not yet working because:**
- No translation data in database yet (translations column is empty/null)
- Need to add translation UI to section editor modal
- Need to test with actual translation data

### ⏳ Pending - PageSection Translation:
1. **Add TranslationEditor to Section Editor Modal:**
   - Location: `resources/js/components/section-editor/index.tsx`
   - Add `<TranslationEditor>` component for title, sub_title, description
   - Test saving translations to database
   - Verify translations display when switching languages

2. **Modify PageSectionResource to Use Translations:**
   - Currently returns raw fields: `title`, `sub_title`, `description`
   - Should use: `$this->getTranslated('title')` when translations exist
   - Add fallback logic: translations → original field

3. **Test Complete Flow:**
   - Add Arabic translation for a section
   - Switch language to Arabic
   - Verify translated content displays
   - Verify original content shows when no translation exists

### ⏳ Pending - Extend to Other Models:
1. **✅ Course Model** - DONE (December 11, 2025)
   - Added `HasTranslations` trait
   - Added `translations` to fillable and casts
   - Fields: title, slug, short_description, description, meta_title, meta_description, meta_keywords, og_title, og_description

2. **✅ CourseCategory Model** - DONE (December 11, 2025)
   - Added `HasTranslations` trait
   - Added `translations` to fillable and casts
   - Fields: title, description

3. **✅ Blog Model** - ALREADY HAD IT (checked December 11, 2025)
   - Already has `HasTranslations` trait ✅
   - Already has `translations` in fillable and casts ✅

4. **✅ BlogCategory Model** - DONE (December 11, 2025)
   - Added `HasTranslations` trait
   - Added `translations` to fillable and casts
   - Migration added and run ✅
   - Fields: name, description

5. **⏳ Exam Module** - PENDING
   - Need to add translations to Exam model
   - Need to add translations to ExamCategory model

6. **⏳ Instructor Model** - PENDING (if needed)

### ⏳ Pending - Create Resources for Translation:
1. **Re-enable Resource Transformation** (Currently disabled in `HandleInertiaRequests.php` line ~88)
   - Fix the issue where Resource transformation causes empty data
   - Alternative: Use model accessors instead of Resources
   - Test with actual translation data in database

2. **Add Translation Editor to Admin Forms:**
   - Section Editor Modal (`resources/js/components/section-editor/index.tsx`)
   - Course Create/Edit Form
   - Category Form
   - Blog Form

3. **Update More Models with HasTranslations:**
   - `Course` model (title, slug, short_description, description, meta fields)
   - `CourseCategory` model (name, description)
   - `Blog` model (title, content, excerpt)
   - `BlogCategory` model (name, description)
   - `Exam` model (title, description)

4. **Complete String Translations (Type 1):**
   - Find missing translation keys in frontend pages
   - Add missing translations to `lang/en/*.php` and `lang/ar/*.php`
   - Check all pages: dashboard, courses, exams, blogs, etc.

5. **Data Migration:**
   - Create seeder to copy existing data to translations column for default language
   - Example: Copy `page_sections.title` to `translations->en->title`

### 📁 Files Modified:
- `app/Traits/HasTranslations.php` ✅
- `app/Models/PageSection.php` ✅
- `app/Http/Resources/PageSectionResource.php` ✅
- `app/Http/Middleware/HandleInertiaRequests.php` ⚠️ (transformation disabled)
- `app/Providers/AppServiceProvider.php` ✅
- `resources/js/components/translation-editor.tsx` ✅
- `database/migrations/2025_12_10_000001_add_translations_to_page_sections.php` ✅
- `database/migrations/2025_12_10_000002_add_translations_to_courses.php` ✅
- `database/migrations/2025_12_10_000003_add_translations_to_course_categories.php` ✅

---

## 🎨 Homepage Design Improvements

### ✅ Completed:
1. Fixed category thumbnails not displaying on frontend
2. Redesigned category cards with glassmorphism (320px height)
3. Added BEM-style CSS classes for customization (28 classes)
4. Created `success-statistics.tsx` component
5. Redesigned hero section to match Okaz website style:
   - Full-width background (100vw, no margins)
   - Search functionality (routes to `/courses/all?search=query`)
   - Professional overlay (rgba(0,0,0,0.55/0.45/0.65))
   - Compact design: heading 48px max, search bar 50px
   - All elements centered
   - Modern animations (0.4s-1.2s)
   - Height: 660px
   - Mobile optimized: 500px height, 45px search, 24px heading

### 📁 Files Modified:
- `app/Services/PageSectionService.php` - Added thumbnail field
- `resources/js/pages/intro/partials/home-1/category-card-1.tsx` - Glassmorphism
- `resources/js/pages/intro/partials/home-1/success-statistics.tsx` - NEW component
- `resources/js/pages/intro/partials/home-1/hero.tsx` - 5 iterations of improvements
- `resources/css/custom-ltr.css` - Hero styling, full-width CSS, animations
- `resources/js/components/section.tsx` - Full-width support
- `resources/js/pages/intro/home-1.tsx` - Component registration
- `database/seeders/IntroSections.php` - Database seeder

### 🎯 Build History:
- Build 1: 44.16s (new hero)
- Build 2: 40.27s (enhanced overlay)
- Build 3: 38.30s (full-width fix)
- Build 4: 38.47s (size reduction)
- Build 5: 35.48s (final professional design) ✅

---

## 📝 Notes:

### Translation System Architecture:
**Chosen Approach:** JSON-based (simple, no extra tables)
- Store translations in single `translations` JSON column
- Format: `{"en": {"title": "...", "description": "..."}, "ar": {...}}`
- Use `HasTranslations` trait with `getTranslated()` method
- Fallback chain: current locale → fallback locale → original field

### Alternative Considered (Not Used):
- Separate translation tables (e.g., `page_section_translations`)
- Spatie Laravel Translatable package
- Reason for not using: User wanted simple JSON-based approach

---

## 🔄 Next Steps When Resuming:

1. **Test Translation System:**
   - Manually add sample translation data to database
   - Check if `getTranslated()` works correctly
   - Re-enable Resource transformation if data works

2. **Or Switch Approach:**
   - Use model accessors (`getTitleAttribute()`) instead of Resources
   - Add translation logic directly in frontend using `useLang()` hook

3. **Complete String Translations:**
   - Run: `grep -r "__('" resources/js/` to find untranslated strings
   - Add missing keys to lang files

---

**Last Updated:** December 11, 2025  
**Status:** Paused - Moving to next module  
**Priority:** Medium (functional but translations not fully implemented)
