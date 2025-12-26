import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { Head, Link, usePage } from '@inertiajs/react';
import { Award, Plus } from 'lucide-react';
import CertificateCard from './partials/certificate-card';

interface CertificatePageProps extends SharedData {
   templates: CertificateTemplate[];
}

const CertificateIndex = ({ templates }: CertificatePageProps) => {
   const { translate } = usePage<CertificatePageProps>().props;
   const { dashboard, button } = translate;

   const labels = {
      pageTitle: dashboard?.certificate_templates || 'قوالب الشهادات',
      pageDescription: dashboard?.certificate_templates_description || 'إدارة قوالب شهادات إتمام الدورات والاختبارات',
      createTemplate: button?.create_template || 'إنشاء قالب',
      courseTemplates: dashboard?.course_certificate_templates || 'قوالب شهادات الدورات',
      examTemplates: dashboard?.exam_certificate_templates || 'قوالب شهادات الاختبارات',
      emptyTitle: dashboard?.no_certificate_templates || 'لا توجد قوالب شهادات بعد',
      emptyDescription: dashboard?.create_first_certificate_template || 'أنشئ أول قالب شهادة للبدء',
      createFirstTemplate: dashboard?.create_first_template || 'إنشاء أول قالب',
   };

   const examTemplates = templates.filter((template) => template.type === 'exam');
   const courseTemplates = templates.filter((template) => template.type === 'course');

   return (
      <>
         <Head title={labels.pageTitle} />

         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-xl font-semibold">{labels.pageTitle}</h2>
                  <p className="text-muted-foreground text-sm">{labels.pageDescription}</p>
               </div>

               <Link href={route('certificate.templates.create')}>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" />
                     {labels.createTemplate}
                  </Button>
               </Link>
            </div>

            <div className="py-6">
               <h6 className="mb-3 text-xl font-semibold">{labels.courseTemplates}</h6>
               {courseTemplates.length === 0 ? (
                  <Card className="p-12">
                     <div className="flex flex-col items-center justify-center text-center">
                        <Award className="text-muted-foreground mb-4 h-16 w-16" />
                        <h3 className="mb-2 text-xl font-semibold">{labels.emptyTitle}</h3>
                        <p className="text-muted-foreground mb-4">{labels.emptyDescription}</p>

                        <Link href={route('certificate.templates.create')}>
                           <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              {labels.createFirstTemplate}
                           </Button>
                        </Link>
                     </div>
                  </Card>
               ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {courseTemplates.map((template) => (
                        <CertificateCard key={template.id} type="course" template={template} />
                     ))}
                  </div>
               )}
            </div>

            <div className="py-6">
               <h6 className="mb-3 text-xl font-semibold">{labels.examTemplates}</h6>
               {examTemplates.length === 0 ? (
                  <Card className="p-12">
                     <div className="flex flex-col items-center justify-center text-center">
                        <Award className="text-muted-foreground mb-4 h-16 w-16" />
                        <h3 className="mb-2 text-xl font-semibold">{labels.emptyTitle}</h3>
                        <p className="text-muted-foreground mb-4">{labels.emptyDescription}</p>

                        <Link href={route('certificate.templates.create')}>
                           <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              {labels.createFirstTemplate}
                           </Button>
                        </Link>
                     </div>
                  </Card>
               ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {examTemplates.map((template) => (
                        <CertificateCard key={template.id} type="exam" template={template} />
                     ))}
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

CertificateIndex.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default CertificateIndex;
