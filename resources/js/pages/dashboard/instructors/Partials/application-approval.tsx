import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import { Editor } from 'richtor';
import 'richtor/styles';

interface Props {
   instructor: Instructor;
   actionComponent: ReactNode;
}

const ApplicationApproval = ({ instructor, actionComponent }: Props) => {
   const [open, setOpen] = useState(false);
   const statuses = ['pending', 'approved', 'rejected'].filter((status) => status !== instructor.status);

   // Get translations from usePage hook
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { dashboard = {}, input = {}, button = {}, common = {} } = translate;

   const labels = {
      dialogTitle: dashboard?.are_you_absolutely_sure || 'هل أنت متأكد تمامًا؟',
      approvalStatus: dashboard?.approval_status || 'حالة الموافقة',
      selectApprovalStatus: common?.select_the_approval_status || dashboard?.select_approval_status || 'اختر حالة الموافقة',
      feedback: dashboard?.feedback || 'الملاحظات',
      submit: button?.submit || 'إرسال',
   };

   const statusTranslations: Record<string, string> = {
      approved: dashboard?.approved || 'موافق عليه',
      rejected: dashboard?.rejected || 'مرفوض',
      pending: dashboard?.pending || 'قيد الانتظار',
   };

   const { data, put, setData, processing, errors, reset } = useForm({
      status: '',
      feedback: '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('instructors.status', { id: instructor.id }), {
         onSuccess: () => {
            reset();
            setOpen(false);
         },
      });
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{actionComponent}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{labels.dialogTitle}</DialogTitle>

               {/* add a form where admin can select status then write a feedback and submit */}
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <Label>{labels.approvalStatus} *</Label>
                     <Select required value={data.status} onValueChange={(value) => setData('status', value as any)}>
                        <SelectTrigger>
                           <SelectValue placeholder={labels.selectApprovalStatus} />
                        </SelectTrigger>
                        <SelectContent>
                           {statuses.map((status) => (
                              <SelectItem key={status} value={status} className="capitalize">
                                 {statusTranslations[status] || status}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <InputError message={errors.status} />
                  </div>

                  <div className="pb-6">
                     <Label>{labels.feedback}</Label>
                     <Editor
                        ssr={true}
                        output="html"
                        placeholder={{
                           paragraph: input.description_placeholder,
                           imageCaption: input.image_url_placeholder,
                        }}
                        contentMinHeight={256}
                        contentMaxHeight={640}
                        initialContent={data.feedback}
                        onContentChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              feedback: value as string,
                           }))
                        }
                     />
                     <InputError message={errors.feedback} />
                  </div>

                  <LoadingButton loading={processing} className="w-full">
                     {labels.submit}
                  </LoadingButton>
               </form>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};

export default ApplicationApproval;
