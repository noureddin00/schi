<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use App\Models\Setting;
use Database\Data\PageData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class PageSeeder extends Seeder
{
   /**
    * Run the database seeds.
    */
   public function run(): void
   {
      // Get page data from organized data class
      $pagesData = PageData::getAllPages();

      // First create or update pages and their sections
      foreach ($pagesData as $pageData) {
         $pageFields = Arr::except($pageData, ['sections']);

         $page = Page::firstOrCreate(
            ['slug' => $pageFields['slug']],
            $pageFields
         );

         // Then create or update all sections for this page
         foreach ($pageData['sections'] as $section) {
            // Add the page ID to each section
            $section['page_id'] = $page->id;

            // Create or update the section
            PageSection::firstOrCreate(
               ['page_id' => $page->id, 'slug' => $section['slug']],
               $section
            );
         }
      }

      // Set default home page using updateOrCreate
      $page = Page::where('slug', 'home-1')->first();

      if ($page) {
         Setting::updateOrCreate(
            ['type' => 'home_page'],
            [
               'sub_type' => null,
               'title' => 'Select Home Page',
               'fields' => [
                  'page_id' => $page->id,
                  'page_name' => $page->name,
                  'page_slug' => $page->slug,
               ],
            ]
         );
      }
   }
}
