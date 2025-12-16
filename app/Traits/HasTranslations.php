<?php

namespace App\Traits;

use Illuminate\Support\Facades\App;

trait HasTranslations
{
    /**
     * Get translated attribute with fallback
     * 
     * @param string $key The attribute name (e.g., 'title', 'description')
     * @param string|null $locale The locale (defaults to current locale)
     * @return mixed
     */
    public function getTranslated(string $key, ?string $locale = null)
    {
        $locale = $locale ?? App::getLocale();
        $fallbackLocale = config('app.fallback_locale', 'en');
        
        // Get translations array
        $translations = $this->translations ?? [];
        
        // Try current locale
        if (isset($translations[$locale][$key]) && !empty($translations[$locale][$key])) {
            return $translations[$locale][$key];
        }
        
        // Try fallback locale
        if ($locale !== $fallbackLocale && isset($translations[$fallbackLocale][$key])) {
            return $translations[$fallbackLocale][$key];
        }
        
        // Return original attribute
        return $this->$key ?? '';
    }

    /**
     * Set translation for a specific locale
     * 
     * @param string $locale
     * @param array $attributes
     * @return void
     */
    public function setTranslation(string $locale, array $attributes): void
    {
        $translations = $this->translations ?? [];
        $translations[$locale] = array_merge($translations[$locale] ?? [], $attributes);
        $this->translations = $translations;
    }

    /**
     * Get all translations
     * 
     * @return array
     */
    public function getAllTranslations(): array
    {
        return $this->translations ?? [];
    }

    /**
     * Check if translation exists for locale
     * 
     * @param string $locale
     * @return bool
     */
    public function hasTranslation(string $locale): bool
    {
        $translations = $this->translations ?? [];
        return isset($translations[$locale]) && !empty($translations[$locale]);
    }
}
