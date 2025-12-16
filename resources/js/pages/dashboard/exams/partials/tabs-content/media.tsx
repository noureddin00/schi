import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ExamUpdateProps } from '../../update';

const Media = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { tab, exam, translate } = props;
   const { dashboard, button } = translate || {};

   const [previewThumbnail, setPreviewThumbnail] = useState(exam.thumbnail);

   const { data, setData, post, errors, reset, processing } = useForm({
      tab: tab,
      thumbnail: null as File | null,
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('exams.update', { exam: exam.id }), {
         onSuccess() {
            reset();
         },
      });
   };

   return (
      <Card className="container p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <Label>{dashboard?.thumbnail || 'الصورة المصغرة'}</Label>
               <Input
                  type="file"
                  name="thumbnail"
                  onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file) {
                        setData('thumbnail', file);
                        // Create preview
                        const reader = new FileReader();
                        reader.onloadend = () => {
                           setPreviewThumbnail(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                     }
                  }}
               />
               <InputError message={errors.thumbnail} />
               <p className="mt-1 text-xs text-gray-500">{dashboard?.thumbnail_hint || 'المقاس الموصى به: 400×300 بكسل. الحجم الأقصى: 2MB'}</p>

               {previewThumbnail && (
                  <div className="mt-4">
                     <Label className="mb-2 block">{dashboard?.preview || 'المعاينة:'}</Label>
                     <img src={previewThumbnail || '/assets/images/blank-image.jpg'} alt={dashboard?.thumbnail_preview_alt || 'معاينة الصورة المصغرة'} className="w-full max-w-sm rounded-md" />
                  </div>
               )}
            </div>

            <div className="mt-8">
               <LoadingButton loading={processing}>{button?.save_changes || 'حفظ التغييرات'}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Media;
