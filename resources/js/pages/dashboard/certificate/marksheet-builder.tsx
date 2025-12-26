import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import MarksheetBuilderForm from './partials/marksheet-builder-form';

const MarksheetBuilder = ({ template }: MarksheetBuilderPageProps) => {
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { dashboard = {}, button = {} } = translate;

   const labels = {
      headTitle: template
         ? dashboard?.edit_marksheet_template || 'تعديل قالب كشف الدرجات'
         : dashboard?.create_marksheet_template || 'إنشاء قالب كشف الدرجات',
      pageTitle: template
         ? dashboard?.edit_marksheet_template || 'تعديل قالب كشف الدرجات'
         : dashboard?.create_marksheet_template || 'إنشاء قالب كشف الدرجات',
      pageDescription: dashboard?.customize_marksheet_design || 'خصص تصميم ومحتوى كشف الدرجات',
      back: button?.back || 'عودة',
   };

   return (
      <>
         <Head title={labels.headTitle} />

         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold">{labels.pageTitle}</h2>
                  <p className="text-muted-foreground">{labels.pageDescription}</p>
               </div>

               <Link href={route('marksheet.templates.index')}>
                  <Button>
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     {labels.back}
                  </Button>
               </Link>
            </div>

            <MarksheetBuilderForm template={template} />
         </div>
      </>
   );
};

MarksheetBuilder.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default MarksheetBuilder;
