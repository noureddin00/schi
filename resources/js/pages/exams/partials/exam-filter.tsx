import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { getQueryParams } from '@/lib/route';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ExamsIndexProps } from '..';

interface ExamFilterProps {
   setOpen?: (open: boolean) => void;
}

const ExamFilter = ({ setOpen }: ExamFilterProps) => {
   const page = usePage<ExamsIndexProps>();
   const urlParams = getQueryParams(page.url);
   const { levels, prices, categories, category, categoryChild, translate } = page.props;
   const { frontend, common } = translate;
   const [openSections, setOpenSections] = useState({ categories: true, price: true, level: true });

   // Level translation mapping
   const levelMap: Record<string, string> = {
      'beginner': 'مبتدئ',
      'intermediate': 'متوسط',
      'advanced': 'متقدم',
      'expert': 'خبير'
   };

   // Price translation mapping
   const priceMap: Record<string, string> = {
      'free': 'مجاني',
      'paid': 'مدفوع'
   };

   const getQueryRoute = (newParams: Record<string, string>, category: string, category_child?: string) => {
      const updatedParams = { ...urlParams };

      if ('search' in updatedParams) {
         delete updatedParams.search;
      }

      return route('category.exams', {
         category,
         category_child,
         ...updatedParams,
         ...newParams,
      });
   };

   const toggleSection = (section: keyof typeof openSections) => {
      setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
   };

   return (
      <div className="exam-filter-container space-y-1">
         {/* Filter Search Input */}
         <div className="mb-4">
            <Input
               type="text"
               placeholder={frontend.search_exams || "Search..."}
               className="h-10"
               onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 2 || value.length === 0) {
                     router.get(route('category.exams', { category: 'all', search: value }));
                  }
               }}
            />
         </div>

         {/* Categories Section */}
         <Collapsible open={openSections.categories} onOpenChange={() => toggleSection('categories')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-accent">
               <h3 className="font-semibold">{common.categories}</h3>
               <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.categories ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
               <Link className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent" href={getQueryRoute({}, 'all')}>
                  <Checkbox checked={!category || category.slug === 'all'} />
                  <label className="cursor-pointer text-sm">{frontend.all}</label>
               </Link>

               {categories.map((cat, ind) => {
                  const key = `category${ind}`;
                  if (cat.slug === 'default') return null;

                  return (
                     <div key={key} className="capitalize">
                        <Link
                           className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                           href={getQueryRoute({}, cat.slug)}
                           onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                        >
                           <Checkbox checked={category?.slug === cat.slug && !categoryChild} />
                           <label className="cursor-pointer text-sm">{cat.title}</label>
                        </Link>

                        {cat.category_children?.map((child, ind) => {
                           const childKey = `category_child${ind}`;
                           return (
                              <Link
                                 key={childKey}
                                 className="flex items-center gap-2 rounded-md py-2 pl-8 pr-3 hover:bg-accent"
                                 href={getQueryRoute({}, cat.slug, child.slug)}
                                 onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                              >
                                 <Checkbox checked={categoryChild?.slug === child.slug} />
                                 <label className="cursor-pointer text-sm">{child.title}</label>
                              </Link>
                           );
                        })}
                     </div>
                  );
               })}
            </CollapsibleContent>
         </Collapsible>

         {/* Price Section */}
         <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-accent">
               <h3 className="font-semibold">{common.price}</h3>
               <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.price ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
               <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                  href={getQueryRoute({ pricing_type: 'all' }, category?.slug || 'all', categoryChild?.slug)}
                  onFinish={() => !urlParams.search && setOpen && setOpen(false)}
               >
                  <Checkbox checked={!urlParams['pricing_type'] || urlParams['pricing_type'] === 'all'} />
                  <label className="cursor-pointer text-sm">{frontend.all}</label>
               </Link>

               {prices.map((price) => (
                  <Link
                     key={price}
                     className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                     href={getQueryRoute({ pricing_type: price }, category?.slug || 'all', categoryChild?.slug)}
                     onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                  >
                     <Checkbox checked={urlParams['pricing_type'] === price} />
                     <label className="cursor-pointer text-sm">{priceMap[price] || price}</label>
                  </Link>
               ))}
            </CollapsibleContent>
         </Collapsible>

         {/* Level Section */}
         <Collapsible open={openSections.level} onOpenChange={() => toggleSection('level')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-accent">
               <h3 className="font-semibold">{common.level}</h3>
               <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.level ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
               <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                  href={getQueryRoute({ level: 'all' }, category?.slug || 'all', categoryChild?.slug)}
                  onFinish={() => !urlParams.search && setOpen && setOpen(false)}
               >
                  <Checkbox checked={!urlParams['level'] || urlParams['level'] === 'all'} />
                  <label className="cursor-pointer text-sm">{frontend.all}</label>
               </Link>
               {levels.map((level) => (
                  <Link
                     key={level}
                     className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
                     href={getQueryRoute({ level }, category?.slug || 'all', categoryChild?.slug)}
                     onFinish={() => !urlParams.search && setOpen && setOpen(false)}
                  >
                     <Checkbox checked={urlParams['level'] === level} />
                     <label className="cursor-pointer text-sm">{levelMap[level] || level}</label>
                  </Link>
               ))}
            </CollapsibleContent>
         </Collapsible>
      </div>
   );
};

export default ExamFilter;
