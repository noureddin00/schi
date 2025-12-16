import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import useScreen from '@/hooks/use-screen';
import LandingLayout from '@/layouts/landing-layout';
import { getQueryParams } from '@/lib/route';
import { router, usePage } from '@inertiajs/react';
import { Grid, List, ListFilter, Search } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { CoursesIndexProps } from './index';
import CourseFilter from './partials/course-filter';

const Layout = ({ children }: { children: ReactNode }) => {
   const { url, props } = usePage<CoursesIndexProps>();
   const { category, categoryChild, translate, courses } = props;
   const { frontend } = translate;
   const [open, setOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const urlParams = getQueryParams(url);
   const viewType = urlParams['view'] ?? 'grid';
   const { screen } = useScreen();

   const getQueryRoute = (newParams: Record<string, string>, category: string, category_child?: string) => {
      const updatedParams = { ...urlParams };

      if ('search' in updatedParams) {
         delete updatedParams.search;
      }

      return route('category.courses', {
         category,
         category_child,
         ...updatedParams,
         ...newParams,
      });
   };

   const gridListHandler = (view: string) => {
      router.get(getQueryRoute({ view }, category?.slug || 'all', categoryChild?.slug));
   };

   const handleSort = (sortValue: string) => {
      router.get(getQueryRoute({ sort: sortValue }, category?.slug || 'all', categoryChild?.slug));
   };

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         router.get(route('category.courses', { category: 'all', search: searchQuery }));
      }
   };

   return (
      <LandingLayout customizable={false}>
         {/* Hero Search Section */}
         <div className="course-search-hero py-12 md:py-16">
            <div className="container relative z-10">
               <div className="mx-auto max-w-3xl text-center">
                  <h1 className="course-hero-title mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                     <span className="course-primary-word inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        {(frontend.courses || 'الدورات')}
                     </span>
                     {' '}
                     <span className="course-secondary-word inline-block text-foreground">
                        {category || categoryChild ? category?.title || categoryChild?.title : frontend.all || 'الكل'}
                     </span>
                  </h1>
                  {((category && category.description) || (categoryChild && categoryChild.description)) && (
                     <p className="text-muted-foreground mb-8 text-base md:text-lg max-w-2xl mx-auto">{category?.description || categoryChild?.description}</p>
                  )}
                  
                  {/* Large Search Bar */}
                  <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                     <Input
                        type="text"
                        placeholder={frontend.search_courses || "ابحث عن الدورات..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="course-search-input h-16 pr-4 pl-16 text-base shadow-2xl bg-background border-2 border-primary/20 focus:border-primary rounded-2xl rtl:pr-16 rtl:pl-4"
                     />
                     <Button 
                        type="submit" 
                        size="icon" 
                        className="absolute top-1/2 -translate-y-1/2 right-3 h-10 w-10 rounded-xl rtl:right-auto rtl:left-3"
                     >
                        <Search className="h-5 w-5" />
                     </Button>
                  </form>
               </div>
            </div>
         </div>

         <div className="course-listing-page container flex items-start gap-6 py-6">
            {screen > 768 && (
               <Card className="course-filter-sidebar sticky top-24 w-72 p-0 shadow-lg">
                  <div className="border-b p-4 filters-header">
                     <h3 className="font-semibold text-lg">{frontend.filters || "الفلاتر"}</h3>
                  </div>
                  <div className="p-4">
                     <CourseFilter />
                  </div>
               </Card>
            )}

            {/* Main Content */}
            <div className="course-content-main flex-1">
               {/* Results Bar with Count and Sort */}
               <div className="course-header mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-sm">
                  <div className="course-header-left flex items-center gap-3">
                     {screen < 768 && (
                        <Sheet open={open} onOpenChange={setOpen}>
                           <SheetTrigger asChild>
                              <Button size="icon" variant="outline" className="shrink-0">
                                 <ListFilter className="h-5 w-5" />
                              </Button>
                           </SheetTrigger>

                           <SheetContent side="left" className="border-border w-[280px]">
                              <div className="mb-4 filters-header">
                                 <h3 className="font-semibold text-lg">{frontend.filters || "الفلاتر"}</h3>
                              </div>
                              <ScrollArea className="h-[calc(100vh-100px)]">
                                 <CourseFilter setOpen={setOpen} />
                              </ScrollArea>
                           </SheetContent>
                        </Sheet>
                     )}

                     <div className="course-results-count">
                        <p className="text-sm font-medium">
                           {(() => {
                              const total = courses?.total || 0;
                              const label = total === 1 || total >= 11 ? 'دورة' : total > 1 && total < 11 ? 'دورات' : 'دورة';
                              return (
                                 <>
                                    <span className="text-primary text-lg font-bold">{total}</span> {label}
                                 </>
                              );
                           })()}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     {/* Sort Dropdown */}
                     <Select value={urlParams['sort'] || 'newest'} onValueChange={handleSort}>
                        <SelectTrigger className="w-[180px]">
                           <SelectValue placeholder={frontend.sort_by || "ترتيب حسب"} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="newest">{frontend.newest || "الأحدث"}</SelectItem>
                           <SelectItem value="popular">{frontend.most_popular || "الأكثر شيوعا"}</SelectItem>
                           <SelectItem value="price_low">{frontend.price_low_high || "السعر: من الأقل إلى الأعلى"}</SelectItem>
                           <SelectItem value="price_high">{frontend.price_high_low || "السعر: من الأعلى إلى الأقل"}</SelectItem>
                           <SelectItem value="rating">{frontend.highest_rated || "الأعلى تقييما"}</SelectItem>
                        </SelectContent>
                     </Select>

                     {/* View Toggles */}
                     <div className="course-view-toggles flex gap-2">
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
               </div>

               {/* Course Grid */}
               {children}
            </div>
         </div>
      </LandingLayout>
   );
};

export default Layout;
