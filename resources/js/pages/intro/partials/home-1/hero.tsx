import ButtonGradientPrimary from '@/components/button-gradient-primary';
import RatingStars from '@/components/rating-stars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { getPageSection, getPropertyArray } from '@/lib/page';
import { cn } from '@/lib/utils';
import { IntroPageProps } from '@/types/page';
import { Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Section from '../section';

const Hero = () => {
   const { props } = usePage<IntroPageProps>();
   const heroSection = getPageSection(props.page, 'hero');
   const [searchQuery, setSearchQuery] = useState('');

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         router.visit(`/courses/all?search=${encodeURIComponent(searchQuery)}`);
      }
   };

   return (
      <Section
         customize={props.customize}
         pageSection={heroSection}
         containerClass={cn('hero-section relative overflow-hidden !px-0 !max-w-none')}
         contentClass={cn('hero-content-wrapper relative !p-0 !max-w-none !w-full')}
         containerStyle={{
            backgroundImage: heroSection?.thumbnail ? `url(${heroSection.thumbnail})` : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
         }}
      >
         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

         {/* Content Container - Centered with max-width */}
         <div className="hero-text-content relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16 text-center md:px-10 lg:px-12">
            {/* Badge/Tag */}
            {heroSection?.title && (
               <div className="hero-badge mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-md shadow-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>
                  <span className="text-xs font-medium text-white drop-shadow-md">{heroSection?.title}</span>
               </div>
            )}

            {/* Main Heading */}
            <div className="hero-heading mb-6 max-w-3xl">
               <h1 className="mb-3 text-2xl font-bold leading-tight text-white drop-shadow-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  {heroSection?.sub_title}
               </h1>
               <p className="mb-5 text-sm font-normal leading-relaxed text-white/90 drop-shadow-lg md:text-base lg:text-lg">
                  {heroSection?.description}
               </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hero-search mb-6 w-full max-w-2xl">
               <div className="relative">
                  <Input
                     type="text"
                     placeholder="ابحث عن الدورات والبرامج التدريبية..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="h-[50px] rounded-full border-0 bg-white pr-5 pl-14 text-sm font-medium text-gray-800 shadow-md ring-1 ring-white/20 transition-all duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:shadow-lg"
                  />
                  <button
                     type="submit"
                     className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                  >
                     <Search className="h-4 w-4" />
                  </button>
               </div>
            </form>

            {/* Stats/Social Proof */}
            <div className="hero-stats flex flex-wrap items-center justify-center gap-3">
               {/* Avatars */}
               <div className="flex items-center">
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white">
                     {getPropertyArray(heroSection).slice(0, 5).map((item, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-white">
                           <AvatarImage src={item.image || ''} alt={item.name} className="object-cover" />
                           <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xs font-bold">
                              {item.name?.charAt(0) || 'U'}
                           </AvatarFallback>
                        </Avatar>
                     ))}
                  </div>
               </div>

               {/* Rating */}
               {heroSection?.properties?.ratings && (
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
                     <RatingStars rating={5} starClass="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                     <div className="text-right">
                        <p className="text-xs font-bold text-gray-900">{heroSection?.properties?.ratings}</p>
                        {heroSection?.properties?.subscribers && (
                           <p className="text-[10px] font-medium text-gray-600">{heroSection?.properties?.subscribers}</p>
                        )}
                     </div>
                  </div>
               )}

               {/* CTA Button (Optional) */}
               {heroSection?.properties?.button_text && (
                  <ButtonGradientPrimary asChild shadow={true} className="h-9 rounded-full px-5 text-xs font-semibold shadow-md">
                     <Link href={heroSection?.properties?.button_link || '/courses/all'}>{heroSection?.properties?.button_text}</Link>
                  </ButtonGradientPrimary>
               )}
            </div>
         </div>

         {/* Decorative Elements */}
         <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
         <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>
      </Section>
   );
};

export default Hero;
