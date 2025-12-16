import Combobox from '@/components/combobox';
import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { useForm } from '@inertiajs/react';
import { ReactNode, useMemo } from 'react';
import { Editor } from 'richtor';
import 'richtor/styles';

interface Props extends SharedData {
   categories: ExamCategory[];
   instructors: Instructor[];
}

const CreateExam = (props: Props) => {
   const { user } = useAuth();
   const { categories, instructors, system, translate } = props;
   const { input, dashboard, button } = translate || {};

   const { data, setData, post, errors, processing } = useForm({
      title: '',
      short_description: '',
      description: '',
      status: 'draft',
      level: '',
      pricing_type: 'paid',
      price: '',
      discount: false as boolean,
      discount_price: '',
      duration_hours: 1,
      duration_minutes: 0,
      pass_mark: 50,
      max_attempts: 3,
      total_marks: 100,
      expiry_type: 'lifetime',
      expiry_duration: new Date(),
      thumbnail: null as File | null,
      instructor_id: user.role === 'admin' && system.sub_type === 'collaborative' ? '' : user.instructor_id,
      exam_category_id: '',
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('exams.store'));
   };

   const transformedCategories = useMemo(() => {
      return categories.map((category) => ({
         label: category.title,
         value: category.id.toString(),
      }));
   }, [categories]);

   const transformedInstructors = useMemo(() => {
      return instructors.map((instructor) => ({
         label: instructor.user.name,
         value: instructor.id.toString(),
      }));
   }, [instructors]);

   const levels = ['beginner', 'intermediate', 'advanced'];
   const pricingTypes = ['paid', 'free'];
   const expiryTypes = ['lifetime', 'limited_time'];

   return (
      <Card className="container p-6">
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               {/* Left Column */}
               <div className="space-y-4">
                  <div>
                     <Label>{dashboard?.exam_title || '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631'} *</Label>
                     <Input name="title" value={data.title} onChange={(e) => onHandleChange(e, setData)} placeholder={dashboard?.enter_exam_title || '\u0623\u062f\u062e\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631'} />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>{dashboard?.short_description || '\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0645\u062e\u062a\u0635\u0631'}</Label>
                     <Textarea
                        rows={5}
                        name="short_description"
                        value={data.short_description}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={dashboard?.brief_description_for_cards || '\u0648\u0635\u0641 \u0645\u0648\u062c\u0632 \u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631'}
                     />
                     <InputError message={errors.short_description} />
                  </div>

                  <div>
                     <Label>{dashboard?.description || '\u0627\u0644\u0648\u0635\u0641'}</Label>
                     <Editor
                        ssr={true}
                        output="html"
                        placeholder={{
                           paragraph: dashboard?.enter_detailed_description || '\u0623\u062f\u062e\u0644 \u0648\u0635\u0641\u0627 \u0645\u0641\u0635\u0644\u0627 \u0644\u0644\u0627\u062e\u062a\u0628\u0627\u0631...',
                           imageCaption: dashboard?.enter_detailed_description || '\u0623\u062f\u062e\u0644 \u0648\u0635\u0641\u0627 \u0645\u0641\u0635\u0644\u0627 \u0644\u0644\u0627\u062e\u062a\u0628\u0627\u0631...',
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
               </div>

               {/* Right Column */}
               <div className="space-y-4">
                  {user?.role === 'admin' && system?.sub_type === 'collaborative' && (
                     <div>
                        <Label htmlFor="instructor_id">{dashboard?.exam_instructor || '\u0645\u062f\u0631\u0633 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631'} *</Label>
                        <Combobox
                           data={transformedInstructors || []}
                           placeholder={dashboard?.select_instructor || '\u0627\u062e\u062a\u0631 \u0645\u062f\u0631\u0633\u0627'}
                           defaultValue={data.instructor_id?.toString() || ''}
                           onSelect={(selected) => setData('instructor_id', selected.value as string)}
                        />
                        <InputError message={errors.instructor_id} />
                     </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                     <div>
                        <Label htmlFor="exam_category_id">{dashboard?.category || '\u0627\u0644\u0641\u0626\u0629'} *</Label>
                        <Combobox
                           data={transformedCategories}
                           placeholder={dashboard?.select_category || '\u0627\u062e\u062a\u0631 \u0641\u0626\u0629'}
                           onSelect={(selected) => {
                              setData('exam_category_id', selected.value as string);
                           }}
                        />
                        <InputError message={errors.exam_category_id} />
                     </div>

                     <div>
                        <Label htmlFor="level">{dashboard?.difficulty_level || '\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0635\u0639\u0648\u0628\u0629'} *</Label>
                        <Select value={data.level} onValueChange={(value) => setData('level', value)}>
                           <SelectTrigger>
                              <SelectValue placeholder={dashboard?.select_level || '\u0627\u062e\u062a\u0631 \u0645\u0633\u062a\u0648\u0649'} />
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
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                     <div>
                        <Label>{dashboard?.duration_hours || '\u0627\u0644\u0645\u062f\u0629 (\u0633\u0627\u0639\u0627\u062a)'} *</Label>
                        <Input
                           type="number"
                           name="duration_hours"
                           value={data.duration_hours.toString()}
                           onChange={(e) => setData('duration_hours', parseInt(e.target.value) || 0)}
                           placeholder={dashboard?.duration_hours_placeholder || '\u0661'}
                           min="0"
                        />
                        <InputError message={errors.duration_hours} />
                     </div>

                     <div>
                        <Label>{dashboard?.duration_minutes || '\u0627\u0644\u0645\u062f\u0629 (\u062f\u0642\u0627\u0626\u0642)'} *</Label>
                        <Input
                           type="number"
                           name="duration_minutes"
                           value={data.duration_minutes.toString()}
                           onChange={(e) => setData('duration_minutes', parseInt(e.target.value) || 0)}
                           placeholder={dashboard?.duration_minutes_placeholder || '\u0660'}
                           min="0"
                           max="59"
                        />
                        <InputError message={errors.duration_minutes} />
                     </div>

                     <div>
                        <Label>{dashboard?.pass_mark || '\u062f\u0631\u062c\u0629 \u0627\u0644\u0646\u062c\u0627\u062d'} *</Label>
                        <Input
                           type="number"
                           name="pass_mark"
                           value={data.pass_mark.toString()}
                           onChange={(e) => setData('pass_mark', parseInt(e.target.value) || 0)}
                           placeholder={dashboard?.pass_mark_placeholder || '\u0665\u0660'}
                           min="0"
                           max="100"
                        />
                        <InputError message={errors.pass_mark} />
                     </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                     <div>
                        <Label>{dashboard?.max_attempts || '\u0623\u0642\u0635\u0649 \u0639\u062f\u062f \u0645\u062d\u0627\u0648\u0644\u0627\u062a'} *</Label>
                        <Input
                           type="number"
                           name="max_attempts"
                           value={data.max_attempts.toString()}
                           onChange={(e) => setData('max_attempts', parseInt(e.target.value) || 1)}
                           placeholder={dashboard?.max_attempts_placeholder || '\u0663'}
                           min="1"
                        />
                        <InputError message={errors.max_attempts} />
                     </div>

                     <div>
                        <Label>{dashboard?.total_marks || '\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0643\u0644\u064a'} *</Label>
                        <Input
                           type="number"
                           name="total_marks"
                           value={data.total_marks.toString()}
                           onChange={(e) => setData('total_marks', parseInt(e.target.value) || 1)}
                           placeholder={dashboard?.total_marks_placeholder || '\u0661\u0660\u0660'}
                           min="1"
                        />
                        <InputError message={errors.total_marks} />
                     </div>
                  </div>

                  <div>
                     <Label>{dashboard?.pricing_type_required || '\u0646\u0648\u0639 \u0627\u0644\u062a\u0633\u0639\u064a\u0631'} *</Label>
                     <RadioGroup
                        defaultValue={data.pricing_type}
                        className="flex items-center space-x-4 pt-2 pb-1"
                        onValueChange={(value: string) => setData('pricing_type', value)}
                     >
                        {pricingTypes.map((type) => (
                           <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem className="cursor-pointer" id={type} value={type} />
                              <Label htmlFor={type} className="cursor-pointer capitalize">
                                 {type === 'free' ? (dashboard?.free || '\u0645\u062c\u0627\u0646\u064a') : (dashboard?.paid || '\u0645\u062f\u0641\u0648\u0639')}
                              </Label>
                           </div>
                        ))}
                     </RadioGroup>
                     <InputError message={errors.pricing_type} />

                     <Accordion collapsible type="single" value={data.pricing_type}>
                        <AccordionItem value="paid" className="border-none">
                           <AccordionContent className="space-y-4 p-0.5">
                              <div className="pt-3">
                                 <Label htmlFor="price">{dashboard?.price || '\u0627\u0644\u0633\u0639\u0631'} *</Label>
                                 <Input
                                    type="number"
                                    name="price"
                                    value={data.price.toString()}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder={dashboard?.enter_exam_price || '\u0623\u062f\u062e\u0644 \u0633\u0639\u0631 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 (\u062f\u0648\u0644\u0627\u0631)'}
                                 />
                                 <InputError message={errors.price} />
                              </div>

                              <div className="space-y-2">
                                 <div className="flex items-center space-x-2">
                                    <Checkbox
                                       id="discount"
                                       name="discount"
                                       checked={data.discount}
                                       onCheckedChange={(checked) => {
                                          setData('discount', checked === true);
                                       }}
                                    />
                                    <Label htmlFor="discount" className="cursor-pointer">
                                       {dashboard?.exam_discount || '\u062e\u0635\u0645 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631'}
                                    </Label>
                                 </div>

                                 {data.discount && (
                                    <div>
                                       <Input
                                          type="number"
                                          name="discount_price"
                                          value={data.discount_price.toString()}
                                          onChange={(e) => setData('discount_price', e.target.value)}
                                          placeholder={dashboard?.enter_discount_price || '\u0623\u062f\u062e\u0644 \u0633\u0639\u0631 \u0627\u0644\u062e\u0635\u0645'}
                                       />
                                       <InputError message={errors.discount_price} />
                                    </div>
                                 )}
                              </div>
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </div>

                  <div>
                     <Label>{dashboard?.expiry_period_type || '\u0646\u0648\u0639 \u0641\u062a\u0631\u0629 \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621'}</Label>
                     <RadioGroup
                        defaultValue={data.expiry_type}
                        className="flex items-center space-x-4 pt-2 pb-1"
                        onValueChange={(value) => setData('expiry_type', value)}
                     >
                        {expiryTypes.map((expiry) => (
                           <div key={expiry} className="flex items-center space-x-2">
                              <RadioGroupItem className="cursor-pointer" id={expiry} value={expiry} />
                              <Label htmlFor={expiry} className="capitalize">
                                 {expiry === 'lifetime' ? (dashboard?.lifetime || '\u0645\u062f\u0649 \u0627\u0644\u062d\u064a\u0627\u0629') : (dashboard?.limited_time || '\u0648\u0642\u062a \u0645\u062d\u062f\u0648\u062f')}
                              </Label>
                           </div>
                        ))}
                     </RadioGroup>
                     <InputError message={errors.expiry_type} />

                     <Accordion collapsible type="single" value={data.expiry_type}>
                        <AccordionItem value="limited_time" className="border-none">
                           <AccordionContent className="space-y-4 p-0.5">
                              <div className="pt-3">
                                 <Label htmlFor="expiry_duration">{dashboard?.expiry_date || '\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621'}</Label>
                                 <DateTimePicker date={data.expiry_duration} setDate={(date) => setData('expiry_duration', date)} />
                                 <InputError message={errors.expiry_duration} />
                              </div>
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </div>

                  <div>
                     <Label htmlFor="thumbnail">{dashboard?.thumbnail || '\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0635\u063a\u0631\u0629'}</Label>
                     <Input
                        type="file"
                        name="thumbnail"
                        onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                              setData('thumbnail', file);
                           }
                        }}
                     />
                     <InputError message={errors.thumbnail} />
                  </div>
               </div>
            </div>

            <div className="col-span-2 mt-6 text-right">
               <LoadingButton loading={processing}>{button?.create_exam || '\u0625\u0646\u0634\u0627\u0621 \u0627\u062e\u062a\u0628\u0627\u0631'}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

CreateExam.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default CreateExam;
