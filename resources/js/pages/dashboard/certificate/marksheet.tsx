import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { Head, Link, usePage } from '@inertiajs/react';
import { ClipboardList, Plus } from 'lucide-react';
import MarkSheetCard from './partials/marksheet-card';

interface MarksheetPageProps extends SharedData {
   templates: MarksheetTemplate[];
}

const MarksheetIndex = ({ templates }: MarksheetPageProps) => {
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { dashboard = {}, button = {} } = translate;

   const labels = {
      headTitle: dashboard?.certificate_marksheet_templates || 'قوالب الشهادات وكشوف الدرجات',
      pageTitle: dashboard?.marksheet_templates || 'قوالب كشوف الدرجات',
      pageDescription: dashboard?.marksheet_templates_description || 'صمّم كشوف الدرجات لعرض درجات الدورات',
      createTemplate: button?.create_template || 'إنشاء قالب',
      courseTemplates: dashboard?.course_marksheet_templates || 'قوالب كشوف درجات الدورات',
      emptyTitle: dashboard?.no_marksheet_templates || 'لا توجد قوالب لكشوف الدرجات بعد',
      emptyDescription: dashboard?.create_first_marksheet_template || 'أنشئ أول قالب لكشف الدرجات للبدء',
      createFirstTemplate: dashboard?.create_first_template || 'أنشئ أول قالب',
   };
   const examTemplates = templates.filter((template) => template.type === 'exam');
   const courseTemplates = templates.filter((template) => template.type === 'course');

   return (
      <>
         <Head title={labels.headTitle} />

         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-xl font-semibold">{labels.pageTitle}</h2>
                  <p className="text-muted-foreground text-sm">{labels.pageDescription}</p>
               </div>
               <Link href={route('marksheet.templates.create')}>
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
                        <ClipboardList className="text-muted-foreground mb-4 h-16 w-16" />
                        <h3 className="mb-2 text-xl font-semibold">{labels.emptyTitle}</h3>
                        <p className="text-muted-foreground mb-4">{labels.emptyDescription}</p>
                        <Link href={route('marksheet.templates.create')}>
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
                        <MarkSheetCard key={template.id} type="course" template={template} />
                     ))}
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

MarksheetIndex.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default MarksheetIndex;
