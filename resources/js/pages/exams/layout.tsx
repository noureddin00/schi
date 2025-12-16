import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useScreen from '@/hooks/use-screen';
import LandingLayout from '@/layouts/landing-layout';
import { getQueryParams } from '@/lib/route';
import { router, usePage } from '@inertiajs/react';
import { Grid, List, ListFilter, Search } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { ExamsIndexProps } from './index';
import ExamFilter from './partials/exam-filter';

const Layout = ({ children }: { children: ReactNode }) => {
   const { url, props } = usePage<ExamsIndexProps>();
   const { category, translate, exams } = props;
   const { frontend } = translate;
   const [open, setOpen] = useState(false);
   const [searchValue, setSearchValue] = useState('');
   const urlParams = getQueryParams(url);
   const viewType = urlParams['view'] ?? 'grid';
   const { screen } = useScreen();

   const getQueryRoute = (newParams: Record<string, string>, category?: string) => {
      const updatedParams = { ...urlParams };

      if ('search' in updatedParams) {
         delete updatedParams.search;
      }

      return route('category.exams', {
         category: category || 'all',
         ...updatedParams,
         ...newParams,
      });
   };

   const gridListHandler = (view: string) => {
      router.get(getQueryRoute({ view }, category?.slug));
   };

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
         router.get(route('category.exams', { category: 'all', search: searchValue }));
      }
   };

   return (
      <LandingLayout customizable={false}>
         {/* Hero Search Section */}
         <div className="exam-search-hero py-12 md:py-16">
            <div className="container relative z-10">
               <div className="mx-auto max-w-3xl text-center">
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                     {frontend.discover_exams || 'اكتشف الاختبارات المهنية'}
                  </h1>
                  <p className="mb-8 text-lg text-muted-foreground">
                     {frontend.exam_subtitle || 'اختبر مهاراتك مع اختباراتنا الشاملة من مدربين خبراء'}
                  </p>
                  <form onSubmit={handleSearch} className="relative">
                     <Input
                        type="text"
                        placeholder={frontend.search_exams || 'ابحث عن الاختبارات...'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="exam-search-input h-14 pr-12 text-base shadow-lg bg-background/95 backdrop-blur-sm"
                     />
                     <Button
                        type="submit"
                        size="icon"
                        className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full"
                     >
                        <Search className="h-5 w-5" />
                     </Button>
                  </form>
               </div>
            </div>
         </div>

         <div className="container flex items-start gap-6 py-6">
            {screen > 768 && (
               <Card className="exam-filter-sidebar sticky top-24 w-64 p-4">
                  <ExamFilter />
               </Card>
            )}

            {/* Main Content */}
            <div className="exam-content-main flex-1">
               <div className="exam-header mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg p-4">
                  <div className="exam-header-left flex items-center gap-3">
                     {screen < 768 && (
                        <Sheet open={open} onOpenChange={setOpen}>
                           <SheetTrigger asChild>
                              <Button size="icon" variant="outline">
                                 <ListFilter className="h-5 w-5" />
                              </Button>
                           </SheetTrigger>

                           <SheetContent side="left" className="border-border w-[280px]">
                              <ScrollArea className="h-full">
                                 <ExamFilter setOpen={setOpen} />
                              </ScrollArea>
                           </SheetContent>
                        </Sheet>
                     )}

                     <div>
                        <h2 className="text-xl font-bold capitalize md:text-2xl">{category ? category.title : frontend.all} {frontend.exams || 'الاختبارات'}</h2>
                        {category && category.description && <p className="text-muted-foreground mt-1 text-sm">{category.description}</p>}
                        {exams && <p className="exam-results-count mt-1 text-sm text-muted-foreground">{exams.total} {frontend.exams || 'اختبار'} {frontend.available || 'متاح'}</p>}
                     </div>
                  </div>
                  <div className="exam-view-toggles flex gap-2">
                     <TooltipProvider delayDuration={0}>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button size="icon" variant={viewType === 'grid' ? 'default' : 'outline'} onClick={() => gridListHandler('grid')}>
                                 <Grid className="h-4 w-4" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>{frontend.grid_view}</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>

                     <TooltipProvider delayDuration={0}>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button size="icon" variant={viewType === 'list' ? 'default' : 'outline'} onClick={() => gridListHandler('list')}>
                                 <List className="h-4 w-4" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>{frontend.list_view}</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </div>
               </div>

               {/* Exam Grid */}
               <div className="exam-grid">
                  {children}
               </div>
            </div>
         </div>
      </LandingLayout>
   );
};

export default Layout;
