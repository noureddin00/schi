import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { getQueryParams } from '@/lib/route';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CoursesIndexProps } from '..';

interface CourseFilterProps {
   setOpen?: (open: boolean) => void;
}

const CourseFilter = ({ setOpen }: CourseFilterProps) => {
   const page = usePage<CoursesIndexProps>();
   const urlParams = getQueryParams(page.url);
   const { levels, prices, categories, category, categoryChild, translate } = page.props;
   const { frontend, common } = translate;

   // Price translation mapping
   const priceMap: Record<string, string> = {
      'free': 'مجاني',
      'paid': 'مدفوع'
   };

   // Level translation mapping
   const levelMap: Record<string, string> = {
      'beginner': 'مبتدئ',
      'intermediate': 'متوسط',
      'advanced': 'متقدم'
   };

   const [openSections, setOpenSections] = useState({
      categories: true,
      price: true,
      level: true,
   });

   const toggleSection = (section: keyof typeof openSections) => {
      setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
   };

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

   return (
      <div className="course-filter-container space-y-1">
         {/* Filter Search Input */}
         <div className="mb-4">
            <Input
               type="text"
               placeholder={frontend.search_courses || "ابحث في الفلاتر..."}
               className="h-10"
               onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 2 || value.length === 0) {
                     router.get(route('category.courses', { category: 'all', search: value }));
                  }
               }}
            />
         </div>
         {/* Categories Section */}
         <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-3 hover:bg-accent transition-colors">
               <h3 className="font-semibold text-sm">{common.categories}</h3>
               <ChevronDown className={`h-4 w-4 transition-transform ${openSections.categories ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 px-3 pb-2">
               <Link
                  className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                  href={getQueryRoute({}, 'all')}
               >
                  <Checkbox 
                     id="category-all" 
                     checked={!category && !categoryChild}
                     className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor="category-all" className="cursor-pointer text-sm flex-1">
                     {frontend.all}
                  </label>
               </Link>

               {categories.map((cat, ind) => {
                  const key = `category${ind}`;
                  if (cat.slug === 'default') return null;

                  const isSelected = category?.slug === cat.slug && !categoryChild;

                  return (
                     <div key={key} className="space-y-2">
                        <Link
                           className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                           href={getQueryRoute({}, cat.slug)}
                           onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                        >
                           <Checkbox 
                              id={key} 
                              checked={isSelected}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                           />
                           <label htmlFor={key} className="cursor-pointer text-sm capitalize flex-1">
                              {cat.title}
                           </label>
                        </Link>

                        {cat.category_children && cat.category_children.length > 0 && (
                           <div className="ml-6 space-y-2">
                              {cat.category_children.map((child, childInd) => {
                                 const childKey = `category_child${ind}_${childInd}`;
                                 const isChildSelected = categoryChild?.slug === child.slug;

                                 return (
                                    <Link
                                       key={childKey}
                                       className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                                       href={getQueryRoute({}, cat.slug, child.slug)}
                                       onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                                    >
                                       <Checkbox 
                                          id={childKey} 
                                          checked={isChildSelected}
                                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                       />
                                       <label htmlFor={childKey} className="cursor-pointer text-sm capitalize flex-1">
                                          {child.title}
                                       </label>
                                    </Link>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                  );
               })}
            </CollapsibleContent>
         </Collapsible>

         <Separator />

         {/* Price Section */}
         <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-3 hover:bg-accent transition-colors">
               <h3 className="font-semibold text-sm">{common.price}</h3>
               <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 px-3 pb-2">
               <Link
                  className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                  href={getQueryRoute({ price: 'all' }, category?.slug || 'all', categoryChild?.slug)}
                  onFinish={() => !urlParams.search && setOpen && setOpen(false)}
               >
                  <Checkbox 
                     id="price-all" 
                     checked={!urlParams['price'] || urlParams['price'] === 'all'}
                     className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor="price-all" className="cursor-pointer text-sm flex-1">
                     {frontend.all}
                  </label>
               </Link>

               {prices.map((price) => (
                  <Link
                     key={price}
                     className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                     href={getQueryRoute({ price }, category?.slug || 'all', categoryChild?.slug)}
                     onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                  >
                     <Checkbox 
                        id={`price-${price}`} 
                        checked={urlParams['price'] === price}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                     />
                     <label htmlFor={`price-${price}`} className="cursor-pointer text-sm flex-1">
                        {priceMap[price] || price}
                     </label>
                  </Link>
               ))}
            </CollapsibleContent>
         </Collapsible>

         <Separator />

         {/* Level Section */}
         <Collapsible open={openSections.level} onOpenChange={() => toggleSection('level')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-3 hover:bg-accent transition-colors">
               <h3 className="font-semibold text-sm">{common.level}</h3>
               <ChevronDown className={`h-4 w-4 transition-transform ${openSections.level ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 px-3 pb-2">
               <Link
                  className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                  href={getQueryRoute({ level: 'all' }, category?.slug || 'all', categoryChild?.slug)}
                  onFinish={() => !urlParams.search && setOpen && setOpen(false)}
               >
                  <Checkbox 
                     id="level-all" 
                     checked={!urlParams['level'] || urlParams['level'] === 'all'}
                     className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor="level-all" className="cursor-pointer text-sm flex-1">
                     {frontend.all}
                  </label>
               </Link>

               {levels.map((level) => (
                  <Link
                     key={level}
                     className="flex items-center space-x-2 rounded py-1.5 hover:bg-accent/50 transition-colors"
                     href={getQueryRoute({ level }, category?.slug || 'all', categoryChild?.slug)}
                     onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                  >
                     <Checkbox 
                        id={`level-${level}`} 
                        checked={urlParams['level'] === level}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                     />
                     <label htmlFor={`level-${level}`} className="cursor-pointer text-sm flex-1">
                        {levelMap[level] || level}
                     </label>
                  </Link>
               ))}
            </CollapsibleContent>
         </Collapsible>
      </div>
   );
};

export default CourseFilter;
