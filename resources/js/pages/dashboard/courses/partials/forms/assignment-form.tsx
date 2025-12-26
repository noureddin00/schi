import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { onHandleChange } from '@/lib/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Editor } from 'richtor';
import 'richtor/styles';
import { CourseUpdateProps } from '../../update';

interface Props {
   title: string;
   assignment?: CourseAssignment;
   handler: React.ReactNode;
}

const AssignmentForm = ({ title, assignment, handler }: Props) => {
   const [open, setOpen] = useState(false);
   const { props } = usePage<CourseUpdateProps>();
   const { translate } = props;
   const { dashboard, input, button } = translate;

   // Arabic fallback labels
   const labels = {
      title: input?.title || 'العنوان',
      totalMark: dashboard?.total_mark || 'الدرجة الكلية',
      passMark: dashboard?.pass_mark || 'درجة النجاح',
      retakeAttempts: input?.retake_attempts || 'محاولات إعادة الاختبار',
      deadline: dashboard?.deadline || 'الموعد النهائي',
      summary: dashboard?.summary || 'الملخص',
      enterAssignmentTitle: dashboard?.enter_assignment_title || 'أدخل عنوان المهمة',
      summaryPlaceholder: input?.description_placeholder || 'أدخل الوصف',
      lateSubmission: dashboard?.late_submission || 'التسليم المتأخر',
      lateDeadline: dashboard?.late_deadline || 'الموعد النهائي للتسليم المتأخر',
      lateTotalMark: dashboard?.late_total_mark || 'الدرجة الكلية للتسليم المتأخر',
      submit: button?.submit || 'إرسال',
      cancel: button?.cancel || 'إلغاء',
   };

   const { data, setData, post, put, reset, errors, processing } = useForm({
      title: assignment?.title || '',
      course_id: props.course.id,
      total_mark: assignment?.total_mark || '',
      pass_mark: assignment?.pass_mark || '',
      retake: assignment?.retake || 1,
      summary: assignment?.summary || '',
      deadline: assignment?.deadline ? new Date(assignment.deadline) : new Date(),
      late_submission: assignment?.late_submission || false,
      late_total_mark: assignment?.late_total_mark || 0,
      late_deadline: assignment?.late_deadline ? new Date(assignment.late_deadline) : '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (assignment) {
         put(route('assignment.update', assignment.id), {
            onSuccess: () => {
               reset();
               setOpen(false);
            },
         });
      } else {
         post(route('assignment.store'), {
            onSuccess: () => {
               reset();
               setOpen(false);
            },
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <form onSubmit={handleSubmit} className="space-y-4 p-0.5">
                  <div>
                     <Label>{labels.title}</Label>
                     <Input
                        required
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder={labels.enterAssignmentTitle}
                        onChange={(e) => onHandleChange(e, setData)}
                     />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>{labels.deadline}</Label>
                     <DateTimePicker date={data.deadline} setDate={(date) => setData('deadline', date)} />
                     <InputError message={errors.deadline} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                     <div>
                        <Label>{labels.totalMark}</Label>
                        <Input required type="number" name="total_mark" value={data.total_mark} onChange={(e) => onHandleChange(e, setData)} />
                        <InputError message={errors.total_mark} />
                     </div>
                     <div>
                        <Label>{labels.passMark}</Label>
                        <Input required type="number" name="pass_mark" value={data.pass_mark} onChange={(e) => onHandleChange(e, setData)} />
                        <InputError message={errors.pass_mark} />
                     </div>
                     <div>
                        <Label>{labels.retakeAttempts}</Label>
                        <Input
                           min="1"
                           required
                           type="number"
                           name="retake"
                           value={data.retake}
                           placeholder="00"
                           onChange={(e) => onHandleChange(e, setData)}
                        />
                        <InputError message={errors.retake} />
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="summary">{labels.summary}</Label>
                     <Editor
                        ssr={true}
                        output="html"
                        placeholder={{
                           paragraph: labels.summaryPlaceholder,
                           imageCaption: 'Type caption for image (optional)',
                        }}
                        contentMinHeight={256}
                        contentMaxHeight={640}
                        initialContent={data.summary}
                        onContentChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              summary: value as string,
                           }))
                        }
                     />
                     <InputError message={errors.summary} />
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="late_submission"
                        checked={data.late_submission}
                        onCheckedChange={(checked) =>
                           setData((prev) => ({
                              ...prev,
                              late_submission: checked as boolean,
                           }))
                        }
                     />
                     <Label htmlFor="late_submission" className="cursor-pointer">
                        {labels.lateSubmission}
                     </Label>
                  </div>

                  {data.late_submission && (
                     <>
                        <div>
                           <Label>{labels.lateTotalMark}</Label>
                           <Input
                              type="number"
                              name="late_total_mark"
                              value={data.late_total_mark}
                              placeholder={labels.lateTotalMark}
                              onChange={(e) => onHandleChange(e, setData)}
                           />
                           <InputError message={errors.late_total_mark} />
                        </div>

                        <div>
                           <Label>{labels.lateDeadline}</Label>
                           <DateTimePicker
                              date={data.late_deadline ? new Date(data.late_deadline) : new Date()}
                              setDate={(date) => setData('late_deadline', date)}
                           />
                           <InputError message={errors.late_deadline} />
                        </div>
                     </>
                  )}

                  <DialogFooter className="flex justify-end space-x-2 pt-4">
                     <DialogClose asChild>
                        <Button type="button" variant="outline">
                           {labels.cancel}
                        </Button>
                     </DialogClose>

                     <LoadingButton loading={processing}>{labels.submit}</LoadingButton>
                  </DialogFooter>
               </form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default AssignmentForm;
