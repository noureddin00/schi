import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface LanguageSwitcherProps {
  currentLocale?: string;
  supportedLocales?: Array<{ code: string; name: string; direction?: string }>;
}

export default function LanguageSwitcher({
  currentLocale = 'en',
  supportedLocales = [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ar', name: 'العربية', direction: 'rtl' },
  ],
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState(currentLocale);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsOpen(false);

    // Store preference in localStorage
    localStorage.setItem('preferred_language', newLocale);

    // Update document language attribute for immediate accessibility
    document.documentElement.lang = newLocale;

    // Navigate to the same path while setting the locale query parameter so server
    // side middleware can set cookies/session and render the correct direction.
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('locale', newLocale);
      // Remove any existing page-specific hashes for clean navigation
      window.location.href = url.toString();
    } catch (e) {
      // Fallback
      window.location.href = `/?locale=${newLocale}`;
    }
  };

  const currentLanguageName =
    supportedLocales.find((l) => l.code === locale)?.name || 'Language';

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Language selector"
      >
        <span className="text-sm font-medium">{currentLanguageName}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {supportedLocales.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                locale === lang.code
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`text-lg`}>
                  {lang.code === 'ar' ? '🇸🇦' : '🇺🇸'}
                </span>
                <span>{lang.name}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
