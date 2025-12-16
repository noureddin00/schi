import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { ExamUpdateProps } from '../../update';

const ExamSettings = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { tab, exam, translate } = props;
   const { dashboard, button } = translate || {};

   const { data, setData, post, errors, processing } = useForm({
      tab: tab,
      duration_hours: exam.duration_hours || 1,
      duration_minutes: exam.duration_minutes || 0,
      pass_mark: exam.pass_mark || 50,
      max_attempts: exam.max_attempts || 3,
      total_marks: exam.total_marks || 100,
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('exams.update', { exam: exam.id }));
   };

   return (
      <Card className="container p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
               <div>
                  <Label>{dashboard?.duration_hours || 'المدة (ساعات) *'}</Label>
                  <Input
                     type="number"
                     name="duration_hours"
                     value={data.duration_hours.toString()}
                     onChange={(e) => setData('duration_hours', parseInt(e.target.value) || 0)}
                     placeholder={dashboard?.duration_hours_placeholder || '١'}
                     min="0"
                  />
                  <InputError message={errors.duration_hours} />
               </div>

               <div>
                  <Label>{dashboard?.duration_minutes || 'المدة (دقائق) *'}</Label>
                  <Input
                     type="number"
                     name="duration_minutes"
                     value={data.duration_minutes.toString()}
                     onChange={(e) => setData('duration_minutes', parseInt(e.target.value) || 0)}
                     placeholder={dashboard?.duration_minutes_placeholder || '٠'}
                     min="0"
                     max="59"
                  />
                  <InputError message={errors.duration_minutes} />
               </div>

               <div>
                  <Label>{dashboard?.pass_mark || 'درجة النجاح *'}</Label>
                  <Input
                     type="number"
                     name="pass_mark"
                     value={data.pass_mark.toString()}
                     onChange={(e) => setData('pass_mark', parseInt(e.target.value) || 0)}
                     placeholder={dashboard?.pass_mark_placeholder || '٥٠'}
                     min="0"
                     max="100"
                  />
                  <InputError message={errors.pass_mark} />
                  <p className="mt-1 text-xs text-gray-500">{dashboard?.pass_mark_hint || 'يجب أن يحقق الطالب هذه النسبة للنجاح'}</p>
               </div>

               <div>
                  <Label>{dashboard?.max_attempts || 'أقصى عدد محاولات *'}</Label>
                  <Input
                     type="number"
                     name="max_attempts"
                     value={data.max_attempts.toString()}
                     onChange={(e) => setData('max_attempts', parseInt(e.target.value) || 1)}
                     placeholder={dashboard?.max_attempts_placeholder || '٣'}
                     min="1"
                  />
                  <InputError message={errors.max_attempts} />
                  <p className="mt-1 text-xs text-gray-500">{dashboard?.max_attempts_hint || 'الحد الأقصى لعدد المحاولات المسموح بها لكل طالب'}</p>
               </div>

               <div>
                  <Label>{dashboard?.total_marks || 'المجموع الكلي *'}</Label>
                  <Input
                     type="number"
                     name="total_marks"
                     value={data.total_marks.toString()}
                     onChange={(e) => setData('total_marks', parseInt(e.target.value) || 1)}
                     placeholder={dashboard?.total_marks_placeholder || '١٠٠'}
                     min="1"
                  />
                  <InputError message={errors.total_marks} />
                  <p className="mt-1 text-xs text-gray-500">{dashboard?.total_marks_hint || 'إجمالي الدرجات للاختبار بالكامل'}</p>
               </div>
            </div>

            <div className="mt-8">
               <LoadingButton loading={processing}>{button?.save_changes || 'حفظ التغييرات'}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default ExamSettings;
