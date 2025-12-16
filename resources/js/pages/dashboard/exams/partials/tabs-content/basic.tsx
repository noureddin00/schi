import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { onHandleChange } from '@/lib/inertia';
import { useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { Editor } from 'richtor';
import 'richtor/styles';
import { ExamUpdateProps } from '../../update';

const Basic = () => {
   const { props } = usePage<ExamUpdateProps>();
   const { auth, system, tab, categories, exam, instructors, translate } = props;
   const { dashboard } = translate || {};

   const { data, setData, post, errors, processing } = useForm({
      tab: tab,
      title: exam.title || '',
      short_description: exam.short_description || '',
      description: exam.description || '',
      status: exam.status || 'draft',
      level: exam.level || '',
      instructor_id: exam.instructor_id || '',
      exam_category_id: exam.exam_category_id || '',
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('exams.update', { exam: exam.id }));
   };

   const transformedCategories = useMemo(() => {
      return categories.map((category) => ({
         label: category.title,
         value: category.id.toString(),
      }));
   }, [categories]);

   const transformedInstructors = instructors?.map((instructor) => ({
      label: instructor.user.name,
      value: instructor.id.toString(),
   }));

   const levels = ['beginner', 'intermediate', 'advanced'];
   const statuses = ['draft', 'published', 'archived'];

   const selectedCategory = categories.find((cat) => cat.id === data.exam_category_id);

   return (
      <Card className="container p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <Label>{dashboard?.exam_title || 'عنوان الاختبار'} *</Label>
               <Input name="title" value={data.title} onChange={(e) => onHandleChange(e, setData)} placeholder={dashboard?.enter_exam_title || 'أدخل عنوان الاختبار'} />
               <InputError message={errors.title} />
            </div>

            <div>
               <Label>{dashboard?.short_description || 'الوصف القصير'}</Label>
               <Textarea
                  rows={5}
                  name="short_description"
                  value={data.short_description}
                  onChange={(e) => onHandleChange(e, setData)}
                  placeholder={dashboard?.brief_description || 'وصف موجز لبطاقات الاختبار'}
               />
               <InputError message={errors.short_description} />
            </div>

            <div>
               <Label>{dashboard?.description || 'الوصف'}</Label>
               <Editor
                  ssr={true}
                  output="html"
                  placeholder={{
                     paragraph: dashboard?.enter_detailed_description || 'أدخل وصفًا مفصلاً للاختبار...',
                     imageCaption: dashboard?.enter_detailed_description || 'أدخل وصفًا مفصلاً...',
                  }}
                  contentMinHeight={256}
                  contentMaxHeight={640}
                  initialContent={data.description}
                  onContentChange={(value) =>
                     setData((prev) => ({
                        ...prev,
                        description: value as string,
                     }))
                  }
               />
               <InputError message={errors.description} />
            </div>

            {auth.user.role === 'admin' && system.sub_type === 'collaborative' && (
               <div>
                  <Label>{dashboard?.exam_instructor || 'مدرب الاختبار'} *</Label>
                  <Combobox
                     defaultValue={data.instructor_id.toString()}
                     data={transformedInstructors || []}
                     placeholder={dashboard?.select_instructor || 'اختر المدرب'}
                     onSelect={(selected) => setData('instructor_id', selected.value as string)}
                  />
                  <InputError message={errors.instructor_id} />
               </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
               <div>
                  <Label>{dashboard?.category || 'الفئة'} *</Label>
                  <Combobox
                     data={transformedCategories}
                     placeholder={dashboard?.select_category || 'اختر الفئة'}
                     defaultValue={selectedCategory?.title || ''}
                     onSelect={(selected) => {
                        setData('exam_category_id', selected.value as string);
                     }}
                  />
                  <InputError message={errors.exam_category_id} />
               </div>

               <div>
                  <Label>{dashboard?.difficulty_level || 'مستوى الصعوبة'} *</Label>
                  <Select value={data.level} onValueChange={(value) => setData('level', value)}>
                     <SelectTrigger>
                        <SelectValue placeholder={dashboard?.select_level || 'اختر المستوى'} />
                     </SelectTrigger>
                     <SelectContent>
                        {levels.map((level) => (
                           <SelectItem key={level} value={level} className="capitalize">
                              {level}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <InputError message={errors.level} />
               </div>

               <div>
                  <Label>{dashboard?.status || 'الحالة'} *</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value as any)}>
                     <SelectTrigger>
                        <SelectValue placeholder={dashboard?.select_status || 'اختر الحالة'} />
                     </SelectTrigger>
                     <SelectContent>
                        {statuses.map((status) => (
                           <SelectItem key={status} value={status} className="capitalize">
                              {status}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <InputError message={errors.status} />
               </div>
            </div>

            <div className="mt-8">
               <LoadingButton loading={processing}>Save Changes</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Basic;
