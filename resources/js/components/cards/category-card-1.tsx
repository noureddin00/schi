import { Card } from '@/components/ui/card';
import { useLang } from '@/hooks/use-lang';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
   category: CourseCategory;
   className?: string;
}

const CategoryCard1 = ({ category, className, style, ...props }: Props) => {
   const { common } = useLang();
   const hasThumbnail = category.thumbnail && category.thumbnail.trim() !== '';

   return (
      <Link href={route('category.courses', { category: category.slug })} className="category-card-link">
         <Card
            className={cn(
               'category-card group relative overflow-hidden rounded-3xl border-none p-0 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl',
               className,
            )}
            {...props}
         >
            <div className="category-card__container relative h-full min-h-[320px]">
               {/* Background Layer */}
               {hasThumbnail ? (
                  <>
                     {/* Image Background */}
                     <div
                        className="category-card__image absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${category.thumbnail})` }}
                     />
                     {/* Dark Gradient Overlay */}
                     <div className="category-card__overlay category-card__overlay--dark absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50" />
                     {/* Accent Gradient on Hover */}
                     <div className="category-card__overlay category-card__overlay--accent absolute inset-0 bg-gradient-to-tr from-primary/40 via-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </>
               ) : (
                  <>
                     {/* Gradient Background */}
                     <div
                        className="category-card__gradient category-card__gradient--base absolute inset-0"
                        style={{
                           background: style?.color
                              ? `linear-gradient(135deg, ${style.color}12 0%, ${style.color}08 40%, ${style.color}04 100%)`
                              : 'linear-gradient(135deg, rgba(79,57,246,0.12) 0%, rgba(79,57,246,0.08) 40%, rgba(79,57,246,0.04) 100%)',
                        }}
                     />
                     {/* Hover Gradient */}
                     <div
                        className="category-card__gradient category-card__gradient--hover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                           background: style?.color
                              ? `linear-gradient(135deg, ${style.color}20 0%, ${style.color}12 100%)`
                              : 'linear-gradient(135deg, rgba(79,57,246,0.20) 0%, rgba(79,57,246,0.12) 100%)',
                        }}
                     />
                  </>
               )}

               {/* Decorative Blur Elements */}
               <div className="category-card__blur category-card__blur--top absolute top-0 right-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-150" />
               <div className="category-card__blur category-card__blur--bottom absolute bottom-0 left-0 h-32 w-32 -translate-x-8 translate-y-8 rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-2xl transition-transform duration-700 group-hover:scale-150" />

               {/* Content Container */}
               <div className="category-card__content relative z-10 flex h-full flex-col justify-between p-8">
                  <div className="category-card__header space-y-5">
                     {/* Icon Container - Only show if no thumbnail */}
                     {!hasThumbnail && (
                        <div
                           className="category-card__icon-wrapper inline-flex h-20 w-20 items-center justify-center rounded-3xl border-2 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                           style={style?.borderColor ? { borderColor: style.borderColor } : {}}
                        >
                           <DynamicIcon
                              size={40}
                              name={category.icon as any}
                              className="category-card__icon transition-transform duration-500 group-hover:scale-110"
                              style={style?.color ? { color: style.color } : {}}
                           />
                        </div>
                     )}

                     {/* Title */}
                     <h3
                        className={cn(
                           'category-card__title text-xl font-bold leading-tight transition-colors duration-300 sm:text-2xl',
                           hasThumbnail ? 'text-white drop-shadow-lg' : 'text-foreground',
                        )}
                     >
                        {category.title}
                     </h3>
                  </div>

                  {/* Footer Card */}
                  <div
                     className={cn(
                        'category-card__footer flex items-center justify-between rounded-2xl p-4 backdrop-blur-md transition-all duration-300',
                        hasThumbnail 
                           ? 'border border-white/20 bg-white/15 shadow-lg' 
                           : 'border-2 bg-white/80 shadow-md',
                     )}
                     style={!hasThumbnail && style?.borderColor ? { borderColor: style.borderColor } : {}}
                  >
                     <div className="category-card__info flex items-center gap-3">
                        <div
                           className={cn(
                              'category-card__book-icon flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300',
                              hasThumbnail ? 'bg-white/20' : 'bg-primary/10',
                           )}
                           style={!hasThumbnail && style?.color ? { backgroundColor: `${style.color}15` } : {}}
                        >
                           <BookOpen
                              size={20}
                              className={hasThumbnail ? 'text-white' : 'transition-colors'}
                              style={!hasThumbnail && style?.color ? { color: style.color } : {}}
                           />
                        </div>
                        <div className="category-card__course-count">
                           <p
                              className={cn(
                                 'category-card__count text-lg font-bold',
                                 hasThumbnail ? 'text-white' : 'text-foreground',
                              )}
                           >
                              {category.courses_count}
                           </p>
                           <p
                              className={cn(
                                 'category-card__label text-xs font-medium',
                                 hasThumbnail ? 'text-white/80' : 'text-muted-foreground',
                              )}
                           >
                              {common.courses}
                           </p>
                        </div>
                     </div>
                     <div
                        className={cn(
                           'category-card__arrow flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110',
                           hasThumbnail ? 'bg-white/25 backdrop-blur-sm' : 'bg-primary/90',
                        )}
                        style={!hasThumbnail && style?.color ? { backgroundColor: style.color } : {}}
                     >
                        <ArrowRight
                           size={20}
                           className={cn(
                              'transition-transform duration-500 group-hover:translate-x-0.5',
                              hasThumbnail ? 'text-white' : 'text-white',
                           )}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </Card>
      </Link>
   );
};

export default CategoryCard1;
