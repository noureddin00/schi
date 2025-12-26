import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface Props {
   user: User;
   actionComponent: ReactNode;
}

const EditForm = ({ user, actionComponent }: Props) => {
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { dashboard = {}, input = {}, button = {}, common = {} } = translate;
   const [open, setOpen] = useState(false);

   const labels = {
      title: dashboard?.update_user || 'تحديث المستخدم',
      name: input?.name || 'الاسم',
      status: input?.status || 'الحالة',
      selectStatus: dashboard?.select_approval_status || 'اختر حالة الموافقة',
      active: common?.active || 'نشط',
      inactive: common?.inactive || 'غير نشط',
      submit: button?.submit || 'إرسال',
   };

   const { data, put, setData, processing, errors, reset } = useForm({
      name: user.name,
      status: user.status,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('users.update', user.id), {
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
               <DialogTitle>{labels.title}</DialogTitle>

               {/* add a form where admin can select status then write a feedback and submit */}
               <form onSubmit={handleSubmit} className="space-y-4 text-start">
                  <div>
                     <Label>{labels.name}</Label>
                     <Input required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                     <InputError message={errors.name} />
                  </div>

                  <div>
                     <Label>{labels.status}</Label>
                     <Select
                        required
                        value={data.status === 1 ? 'active' : 'inactive'}
                        onValueChange={(value) => setData('status', value === 'active' ? 1 : 0)}
                     >
                        <SelectTrigger>
                           <SelectValue placeholder={labels.selectStatus} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="active">{labels.active}</SelectItem>
                           <SelectItem value="inactive">{labels.inactive}</SelectItem>
                        </SelectContent>
                     </Select>
                     <InputError message={errors.status} />
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

export default EditForm;
