import { cn } from '@/lib/utils';
import { SharedData } from '@/types/global';
import { usePage } from '@inertiajs/react';

const AppLogo = ({ className, theme }: { theme?: 'light' | 'dark'; className?: string }) => {
   const { system } = usePage<SharedData>().props;

   // Slightly larger defaults so the logo stays visible on auth/dashboard headers
   const baseClass = 'block w-auto drop-shadow-sm';

   if (theme && theme === 'dark') {
      return <img src={system.fields.logo_dark || ''} alt={system.fields.name || ''} className={cn(`${baseClass} h-10 md:h-12`, className)} />;
   }

   if (theme && theme === 'light') {
      return <img src={system.fields.logo_light || ''} alt={system.fields.name || ''} className={cn(`${baseClass} h-10 md:h-12`, className)} />;
   }

   return (
      <>
         <img src={system.fields.logo_dark || ''} alt={system.fields.name || ''} className={cn(`${baseClass} h-16 md:h-20 px-2 py-1 dark:hidden`, className)} />
         <img src={system.fields.logo_light || ''} alt={system.fields.name || ''} className={cn(`${baseClass} h-16 md:h-20 px-2 py-1 hidden dark:block`, className)} />
      </>
   );
};

export default AppLogo;
