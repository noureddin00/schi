import { usePage } from '@inertiajs/react';

/**
 * Translation helper function
 * @param key - Translation key in dot notation (e.g., 'common.welcome' or 'button.save')
 * @returns Translated string or the key if translation not found
 */
export function __(key: string): string {
   try {
      const { translate } = usePage().props as any;
      
      // Split the key by dots (e.g., 'common.welcome' -> ['common', 'welcome'])
      const keys = key.split('.');
      
      let value = translate;
      for (const k of keys) {
         if (value && typeof value === 'object' && k in value) {
            value = value[k];
         } else {
            // Translation not found, return the key
            return key;
         }
      }
      
      return typeof value === 'string' ? value : key;
   } catch (error) {
      // If usePage() fails, return the key
      return key;
   }
}
