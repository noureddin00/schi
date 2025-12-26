import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import CertificateBuilderForm from './partials/certificate-builder-form';

const CertificateBuilder = ({ template }: CertificateBuilderPageProps) => {
   const { translate } = usePage<CertificateBuilderPageProps>().props;
   const { dashboard, button } = translate;

   const labels = {
      pageTitle: template
         ? dashboard?.edit_certificate_template || 'تعديل قالب الشهادة'
         : dashboard?.create_certificate_template || 'إنشاء قالب شهادة',
      pageDescription: dashboard?.certificate_builder_description || 'تخصيص تصميم الشهادة ومحتواها',
      back: button?.back || 'رجوع',
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-2xl font-bold">{labels.pageTitle}</h2>
               <p className="text-muted-foreground">{labels.pageDescription}</p>
            </div>

            <Link href={route('certificate.templates.index')}>
               <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {labels.back}
               </Button>
            </Link>
         </div>

         <CertificateBuilderForm template={template} />
      </div>
   );
};

CertificateBuilder.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default CertificateBuilder;
