import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ExamUpdateProps } from '../../update';
import FaqForm from '../forms/faq-form';
import OutcomeForm from '../forms/outcome-form';
import RequirementForm from '../forms/requirement-form';

const Info = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { exam, translate } = props;
   const { dashboard } = translate || {};
   const { faqs, requirements, outcomes } = exam;

   return (
      <Card className="space-y-7 p-4 sm:p-6">
         <div className="flex flex-col justify-between gap-3 md:flex-row">
            <h6 className="w-[200px] font-medium">{dashboard?.exam_faqs || 'أسئلة شائعة للاختبار'}</h6>
            <div className="w-full space-y-6">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                     router.post(route('exam-faqs.store'), {
                        exam_id: exam.id,
                     })
                  }
               >
                  <Plus />
                  {dashboard?.add_faq || 'إضافة سؤال شائع'}
               </Button>
               {faqs?.map((faq) => (
                  <FaqForm key={faq.id} faq={faq} />
               ))}
            </div>
         </div>

         <Separator />

         <div className="flex flex-col justify-between gap-3 md:flex-row">
            <h6 className="w-[200px] font-medium">{dashboard?.requirements || 'المتطلبات'}</h6>
            <div className="w-full space-y-6">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                     router.post(route('exam-requirements.store'), {
                        exam_id: exam.id,
                     })
                  }
               >
                  <Plus />
                  {dashboard?.add_requirement || 'إضافة متطلب'}
               </Button>
               {requirements?.map((requirement) => (
                  <RequirementForm key={requirement.id} requirement={requirement} />
               ))}
            </div>
         </div>

         <Separator />

         <div className="flex flex-col justify-between gap-3 md:flex-row">
            <h6 className="w-[200px] font-medium">{dashboard?.learning_outcomes || 'نتائج التعلم'}</h6>
            <div className="w-full space-y-6">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                     router.post(route('exam-outcomes.store'), {
                        exam_id: exam.id,
                     })
                  }
               >
                  <Plus />
                  {dashboard?.add_outcome || 'إضافة نتيجة'}
               </Button>
               {outcomes?.map((outcome) => (
                  <OutcomeForm key={outcome.id} outcome={outcome} />
               ))}
            </div>
         </div>
      </Card>
   );
};

export default Info;
