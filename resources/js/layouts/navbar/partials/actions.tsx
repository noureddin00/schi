import Appearance from '@/components/appearance';
import CourseCart from '@/components/course-cart';
import Language from '@/components/language';
import Notification from '@/components/notification';
import ProfileToggle from '@/components/profile-toggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import useScreen from '@/hooks/use-screen';
import { SharedData } from '@/types/global';
import { Link, usePage } from '@inertiajs/react';
import { List, X } from 'lucide-react';
import { useState } from 'react';

const Actions = ({ language }: { language: boolean }) => {
   const { props } = usePage<SharedData>();
   const { navbar, translate, system } = props;
   const { isLoggedIn } = useAuth();
   const { screen } = useScreen();
   const [open, setOpen] = useState(false);
   const sortedItems = navbar.navbar_items.sort((a, b) => a.sort - b.sort);

   const actionElements = () =>
      sortedItems.map((item) => {
         if (item.slug === 'theme') {
            return (
               <div key={item.id} className="header-action header-action-theme">
                  <Appearance />
               </div>
            );
         } else if (system.fields.language_selector && language && item.slug === 'language') {
            return (
               <div key={item.id} className="header-action header-action-language">
                  <Language />
               </div>
            );
         } else if (isLoggedIn && item.slug === 'notification') {
            return (
               <div key={item.id} className="header-action header-action-notification">
                  <Notification />
               </div>
            );
         } else if (isLoggedIn && item.slug === 'cart') {
            return (
               <div key={item.id} className="header-action header-action-cart">
                  <CourseCart />
               </div>
            );
         } else {
            return null;
         }
      });

   return (
      <div className="header-actions flex items-center gap-2">
         {screen > 768 ? (
            <div className="header-actions-desktop flex items-center gap-2">{actionElements()}</div>
         ) : (
            <DropdownMenu open={open} onOpenChange={setOpen}>
               <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="secondary" className="md:hidden">
                     {open ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-12 min-w-10">
                  <DropdownMenuRadioGroup value="bottom">
                     <div className="flex flex-col items-center gap-2">{actionElements()}</div>
                  </DropdownMenuRadioGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         )}

         {isLoggedIn ? (
            sortedItems.map((item) => {
               if (item.slug === 'profile') {
                  return (
                     <div key={item.id} className="header-action header-action-profile">
                        <ProfileToggle />
                     </div>
                  );
               } else {
                  return null;
               }
            })
         ) : (
            <div className="header-auth-buttons hidden space-x-2 sm:block">
               <Button asChild variant="outline" className="header-signup-btn">
                  <Link href={route('register')}>{translate.button.sign_up}</Link>
               </Button>
               <Button asChild className="header-login-btn">
                  <Link href={route('login')}>{translate.button.log_in}</Link>
               </Button>
            </div>
         )}
      </div>
   );
};

export default Actions;
