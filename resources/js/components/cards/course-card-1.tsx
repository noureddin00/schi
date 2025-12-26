import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, getCourseDuration, systemCurrency } from '@/lib/utils';
import { SharedData } from '@/types/global';
import { Link, router, usePage } from '@inertiajs/react';
import { Clock, Heart, Star, Users, TrendingUp } from 'lucide-react';

interface Props {
   course: Course;
   viewType?: 'grid' | 'list';
   className?: string;
   wishlists?: CourseWishlist[];
}

const CourseCard1 = ({ course, viewType = 'grid', className, wishlists }: Props) => {
   const { props } = usePage<SharedData>();
   const { user } = props.auth;
   const { translate } = props;
   const { button, frontend, common } = translate;

   const isWishlisted = wishlists?.find((wishlist) => wishlist.course_id === course.id);
   const currency = systemCurrency(props.system.fields['selling_currency']);

   // Level translation mapping
   const levelMap: Record<string, string> = {
      'beginner': 'مبتدئ',
      'intermediate': 'متوسط',
      'advanced': 'متقدم'
   };

   const handleWishlist = () => {
      if (isWishlisted) {
         router.delete(route('course-wishlists.destroy', { id: isWishlisted.id }));
      } else {
         router.post(route('course-wishlists.store', { user_id: user?.id, course_id: course.id }));
      }
   };

   return (
      <Card className={cn('modern-course-card group overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2', viewType === 'list' && 'sm:flex sm:w-full sm:flex-row sm:justify-between', className)}>
         <CardHeader className="p-0 relative">
            <Link
               href={route('course.details', {
                  slug: course.slug,
                  id: course.id,
               })}
            >
               <div className={cn('relative h-[220px] overflow-hidden rounded-t-2xl', viewType === 'list' && 'sm:w-[300px] sm:rounded-l-2xl sm:rounded-tr-none')}>
                  <img
                     src={course.thumbnail || '/assets/images/blank-image.jpg'}
                     alt={course.title}
                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                     onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/assets/images/blank-image.jpg') {
                           target.src = '/assets/images/blank-image.jpg';
                        }
                     }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>
            </Link>

            {/* Status Badges - Top Right */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
               {course.pricing_type === 'free' && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-lg px-2.5 py-1 rounded-full">
                     {common.free}
                  </Badge>
               )}
               {course.discount && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-lg px-2.5 py-1 rounded-full">
                     {Math.round(((course.price - course.discount_price) / course.price) * 100)}% خصم
                  </Badge>
               )}
            </div>

            {/* Wishlist Button */}
            {wishlists && (
               <TooltipProvider delayDuration={0}>
                  <Tooltip>
                     <TooltipTrigger className="absolute top-3 left-3 z-10">
                        <Button 
                           size="icon" 
                           variant="ghost" 
                           className="h-9 w-9 rounded-full bg-white/95 hover:bg-white backdrop-blur-sm shadow-md hover:shadow-lg transition-all" 
                           onClick={handleWishlist}
                        >
                           <Heart className={cn('h-4 w-4 transition-all', isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700')} />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{isWishlisted ? frontend.remove_from_wishlist : frontend.add_to_wishlist}</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            )}
         </CardHeader>

         <div className={cn('flex flex-col', viewType === 'list' && 'flex-1')}>
            <CardContent className="p-5 pb-4 flex-1">
               {/* Category/Level Badge */}
               {course.level && (
                  <Badge variant="secondary" className="mb-3 text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                     {levelMap[course.level.toLowerCase()] || course.level}
                  </Badge>
               )}

               {/* Course Title */}
               <Link
                  href={route('course.details', {
                     slug: course.slug,
                     id: course.id,
                  })}
               >
                  <h3 className="mb-3 font-bold text-lg leading-snug line-clamp-2 text-gray-900 transition-colors hover:text-primary group-hover:text-primary">
                     {course.title}
                  </h3>
               </Link>

               {/* Instructor Info - Okaz Style */}
               {course.instructor && (
                  <div className="mb-3 flex items-center gap-2">
                     <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-100">
                        {course.instructor.avatar ? (
                           <img 
                              src={course.instructor.avatar} 
                              alt={course.instructor.name}
                              className="h-full w-full object-cover"
                           />
                        ) : (
                           <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-sm">
                              {course.instructor.name?.charAt(0).toUpperCase()}
                           </div>
                        )}
                     </div>
                     <span className="text-sm font-medium text-gray-700">
                        {course.instructor.name}
                     </span>
                  </div>
               )}

               {/* Stats Row */}
               <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5">
                     <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                     <span className="font-semibold text-gray-900">{course.average_rating ? Number(course.average_rating).toFixed(1) : '0.0'}</span>
                     <span className="text-gray-500">({course.reviews_count || 0})</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                     <Users className="h-3.5 w-3.5" />
                     <span className="font-medium">{course.enrollments_count || 0}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                     <Clock className="h-3.5 w-3.5" />
                     <span className="font-medium">{getCourseDuration(course, 'readable')}</span>
                  </div>
               </div>
            </CardContent>

            {/* Footer with Price */}
            <CardFooter className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50">
               <div className="flex items-center gap-2">
                  {course.pricing_type === 'free' ? (
                     <span className="text-emerald-600 font-bold text-xl">{common.free}</span>
                  ) : course.discount ? (
                     <>
                        <span className="font-bold text-xl text-primary">
                           {currency?.symbol}{course.discount_price}
                        </span>
                        <span className="text-gray-400 text-sm font-medium line-through">
                           {currency?.symbol}{course.price}
                        </span>
                     </>
                  ) : (
                     <span className="font-bold text-xl text-primary">
                        {currency?.symbol}{course.price}
                     </span>
                  )}
               </div>

               {course.is_featured && (
                  <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-0 flex items-center gap-1 text-xs font-semibold">
                     <TrendingUp className="h-3 w-3" />
                     {frontend.featured || "Featured"}
                  </Badge>
               )}
            </CardFooter>
         </div>
      </Card>
   );
};

export default CourseCard1;
