import { getPageSection } from '@/lib/page';
import { IntroPageProps } from '@/types/page';
import { usePage } from '@inertiajs/react';
import { Award, BookOpen, Building2, Users } from 'lucide-react';
import Section from '../section';

const SuccessStatistics = () => {
   const { props } = usePage<IntroPageProps>();
   const successStatisticsSection = getPageSection(props.page, 'success_statistics');

   const statistics = [
      {
         icon: Award,
         count: successStatisticsSection?.properties?.years || '35',
         label: successStatisticsSection?.properties?.years_label || 'عامًا',
         subtitle: successStatisticsSection?.properties?.years_subtitle || 'من العطاء والتميز',
         color: 'from-blue-500 to-blue-600',
         bgColor: 'bg-blue-50',
      },
      {
         icon: Users,
         count: successStatisticsSection?.properties?.students || '30,000',
         label: successStatisticsSection?.properties?.students_label || 'متدرب',
         subtitle: successStatisticsSection?.properties?.students_subtitle || 'وأكثر',
         color: 'from-green-500 to-green-600',
         bgColor: 'bg-green-50',
      },
      {
         icon: Building2,
         count: successStatisticsSection?.properties?.partners || '500',
         label: successStatisticsSection?.properties?.partners_label || 'من شركاء النجاح',
         subtitle: successStatisticsSection?.properties?.partners_subtitle || 'وأكثر',
         color: 'from-purple-500 to-purple-600',
         bgColor: 'bg-purple-50',
      },
      {
         icon: BookOpen,
         count: successStatisticsSection?.properties?.programs || '200',
         label: successStatisticsSection?.properties?.programs_label || 'برنامج تدريبي',
         subtitle: successStatisticsSection?.properties?.programs_subtitle || 'معتمد',
         color: 'from-orange-500 to-orange-600',
         bgColor: 'bg-orange-50',
      },
   ];

   return (
      <Section
         customize={props.customize}
         pageSection={successStatisticsSection}
         containerClass="success-statistics-section relative overflow-hidden py-20"
      >
         {/* Decorative Background */}
         <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-100 opacity-30 blur-3xl"></div>
         </div>

         {/* Statistics Grid */}
         <div className="success-statistics-grid relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat, index) => {
               const Icon = stat.icon;
               return (
                  <div
                     key={index}
                     className="success-statistics-card group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  >
                     {/* Icon Container */}
                     <div className={`success-statistics-icon mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl ${stat.bgColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <Icon className={`h-10 w-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} strokeWidth={2.5} />
                     </div>

                     {/* Count */}
                     <div className="success-statistics-count mb-3">
                        <h3 className={`bg-gradient-to-br ${stat.color} bg-clip-text text-5xl font-bold text-transparent`}>{stat.count}</h3>
                     </div>

                     {/* Label */}
                     <div className="success-statistics-label mb-2">
                        <p className="text-lg font-bold text-gray-900">{stat.label}</p>
                     </div>

                     {/* Subtitle */}
                     <div className="success-statistics-subtitle">
                        <p className="text-sm font-medium text-gray-600">{stat.subtitle}</p>
                     </div>

                     {/* Decorative Gradient Bar */}
                     <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>
                  </div>
               );
            })}
         </div>

         {/* Optional Title Section */}
         {successStatisticsSection?.title && (
            <div className="success-statistics-footer mt-16 text-center">
               <h2 className="mb-4 text-3xl font-bold md:text-4xl">{successStatisticsSection?.title}</h2>
               {successStatisticsSection?.description && <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{successStatisticsSection?.description}</p>}
            </div>
         )}
      </Section>
   );
};

export default SuccessStatistics;
