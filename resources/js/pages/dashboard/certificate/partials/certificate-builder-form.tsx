import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { SharedData } from '@/types/global';
import CertificatePreview from './certificate-preview';

const CertificateBuilderForm = ({ template }: { template?: CertificateTemplate | null }) => {
   const { translate } = usePage<SharedData>().props;
   const { dashboard, input, button } = translate;

   const labels = {
      basicTitle: dashboard?.basic_information || 'المعلومات الأساسية',
      basicDesc: dashboard?.template_basic_desc || 'حدد اسم القالب ونوعه وحالة التفعيل',
      templateType: dashboard?.template_type || 'نوع القالب',
      selectTemplateType: dashboard?.select_template_type || 'اختر نوع القالب',
      courseOption: dashboard?.course || 'دورة',
      examOption: dashboard?.exam || 'اختبار',
      templateName: dashboard?.template_name || 'اسم القالب',
      templateNamePlaceholder: dashboard?.template_name_placeholder || 'مثال: قالب شهادة حديث',
      logoBrandingTitle: dashboard?.logo_branding || 'الشعار والهوية',
      logoBrandingDesc: dashboard?.logo_branding_desc || 'حمّل شعار المؤسسة أو الدورة',
      logoImage: dashboard?.logo_image || 'صورة الشعار',
      logoHint: dashboard?.logo_hint || 'يفضل PNG أو SVG بحد أقصى 1 ميغابايت',
      colorsTitle: dashboard?.colors || 'الألوان',
      colorsDesc: dashboard?.colors_desc || 'خصص لوحة ألوان الشهادة',
      primaryColor: dashboard?.primary_color || 'اللون الأساسي',
      secondaryColor: dashboard?.secondary_color || 'اللون الثانوي',
      backgroundColor: dashboard?.background_color || 'لون الخلفية',
      borderColor: dashboard?.border_color || 'لون الإطار',
      typographyTitle: dashboard?.typography || 'الخطوط',
      typographyDesc: dashboard?.typography_desc || 'اختر نمط الخط للشهادة',
      fontFamily: dashboard?.font_family || 'عائلة الخط',
      certificateTextTitle: dashboard?.certificate_text || 'نص الشهادة',
      certificateTextDesc: dashboard?.certificate_text_desc || 'خصص النصوص الظاهرة في الشهادة',
      titleText: dashboard?.title_text || 'عنوان الشهادة',
      descriptionText: dashboard?.description_text || 'النص الوصفي',
      completionText: dashboard?.completion_text || 'نص إتمام الدورة',
      footerText: dashboard?.footer_text || 'نص التذييل',
      titlePlaceholder: dashboard?.title_text_placeholder || 'شهادة إتمام',
      descriptionPlaceholder: dashboard?.description_text_placeholder || 'يُمنح هذا الشهادة إلى',
      completionPlaceholder: dashboard?.completion_text_placeholder || 'لإتمامه بنجاح هذه الدورة',
      footerPlaceholder: dashboard?.footer_text_placeholder || 'شهادة معتمدة',
      save: button?.save || 'حفظ',
      saving: button?.saving || 'جاري الحفظ...',
      updateTemplate: dashboard?.update_template || 'تحديث القالب',
      createTemplate: dashboard?.create_template || 'إنشاء القالب',
      livePreview: dashboard?.live_preview || 'معاينة مباشرة',
      livePreviewDesc: dashboard?.live_preview_desc || 'اطلع على شكل الشهادة',
      sampleStudent: dashboard?.sample_student || 'اسم الطالب',
      sampleCourse: dashboard?.sample_course || 'اسم المقرر',
      sampleDate: dashboard?.sample_date || '1 يناير 2025',
   };

   const [logoPreview, setLogoPreview] = useState(template?.logo_path);

   const { data, setData, post, processing, errors } = useForm({
      type: template?.type || 'course',
      name: template?.name || 'My Certificate Template',
      logo: null as File | null,
      template_data: template?.template_data || {
         primaryColor: '#3730a3',
         secondaryColor: '#4b5563',
         backgroundColor: '#dbeafe',
         borderColor: '#f59e0b',
         titleText: 'Certificate of Completion',
         descriptionText: 'This certificate is proudly presented to',
         completionText: 'for successfully completing the course',
         footerText: 'Authorized Certificate',
         fontFamily: 'serif',
      },
   });

   const onLogoChange = (name: string, value: unknown) => {
      setData(name as any, value as any);
      setLogoPreview(URL.createObjectURL(value as File));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (template) {
         // Update existing template
         post(route('certificate.templates.update', template.id));
      } else {
         // Create new template
         post(route('certificate.templates.store'));
      }
   };

   return (
      <div className="grid gap-6 lg:grid-cols-2">
         {/* Form Section */}
         <div className="space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>{labels.basicTitle}</CardTitle>
                  <CardDescription>{labels.basicDesc}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="type">{labels.templateType}</Label>
                     <Select value={data.type} onValueChange={(value) => setData('type', value as any)}>
                        <SelectTrigger>
                           <SelectValue placeholder={labels.selectTemplateType} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="course">{labels.courseOption}</SelectItem>
                           <SelectItem value="exam">{labels.examOption}</SelectItem>
                        </SelectContent>
                     </Select>
                     {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="name">{labels.templateName}</Label>
                     <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder={labels.templateNamePlaceholder}
                     />
                     {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.logoBrandingTitle}</CardTitle>
                  <CardDescription>{labels.logoBrandingDesc}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="logo">{labels.logoImage}</Label>
                     <div className="space-y-2">
                        {logoPreview && (
                           <div className="h-20 w-20 overflow-hidden rounded border">
                              <img src={logoPreview} alt="Logo preview" className="h-full w-full object-contain" />
                           </div>
                        )}
                        <div className="flex-1">
                           <Input id="logo" type="file" accept="image/*" onChange={(e) => onLogoChange('logo', e.target.files?.[0])} />
                        </div>
                     </div>
                     <p className="text-muted-foreground text-xs">{labels.logoHint}</p>
                     <InputError message={errors.logo} />
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.colorsTitle}</CardTitle>
                  <CardDescription>{labels.colorsDesc}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="primaryColor">{labels.primaryColor}</Label>
                        <div className="flex gap-2">
                           <Input
                              id="primaryColor"
                              type="color"
                              value={data.template_data.primaryColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, primaryColor: e.target.value })}
                              className="h-10 w-16"
                           />
                           <Input
                              value={data.template_data.primaryColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, primaryColor: e.target.value })}
                              placeholder="#3730a3"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="secondaryColor">{labels.secondaryColor}</Label>
                        <div className="flex gap-2">
                           <Input
                              id="secondaryColor"
                              type="color"
                              value={data.template_data.secondaryColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, secondaryColor: e.target.value })}
                              className="h-10 w-16"
                           />
                           <Input
                              value={data.template_data.secondaryColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, secondaryColor: e.target.value })}
                              placeholder="#4b5563"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="backgroundColor">{labels.backgroundColor}</Label>
                        <div className="flex gap-2">
                           <Input
                              id="backgroundColor"
                              type="color"
                              value={data.template_data.backgroundColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, backgroundColor: e.target.value })}
                              className="h-10 w-16"
                           />
                           <Input
                              value={data.template_data.backgroundColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, backgroundColor: e.target.value })}
                              placeholder="#dbeafe"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="borderColor">{labels.borderColor}</Label>
                        <div className="flex gap-2">
                           <Input
                              id="borderColor"
                              type="color"
                              value={data.template_data.borderColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, borderColor: e.target.value })}
                              className="h-10 w-16"
                           />
                           <Input
                              value={data.template_data.borderColor}
                              onChange={(e) => setData('template_data', { ...data.template_data, borderColor: e.target.value })}
                              placeholder="#f59e0b"
                           />
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.typographyTitle}</CardTitle>
                  <CardDescription>{labels.typographyDesc}</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-2">
                     <Label htmlFor="fontFamily">{labels.fontFamily}</Label>
                     <Select
                        value={data.template_data.fontFamily}
                        onValueChange={(value) => setData('template_data', { ...data.template_data, fontFamily: value })}
                     >
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="serif">Serif (Classic)</SelectItem>
                           <SelectItem value="sans-serif">Sans Serif (Modern)</SelectItem>
                           <SelectItem value="monospace">Monospace (Technical)</SelectItem>
                           <SelectItem value="cursive">Cursive (Elegant)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.certificateTextTitle}</CardTitle>
                  <CardDescription>{labels.certificateTextDesc}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="titleText">{labels.titleText}</Label>
                     <Input
                        id="titleText"
                        value={data.template_data.titleText}
                        onChange={(e) => setData('template_data', { ...data.template_data, titleText: e.target.value })}
                        placeholder={labels.titlePlaceholder}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="descriptionText">{labels.descriptionText}</Label>
                     <Textarea
                        id="descriptionText"
                        value={data.template_data.descriptionText}
                        onChange={(e) => setData('template_data', { ...data.template_data, descriptionText: e.target.value })}
                        placeholder={labels.descriptionPlaceholder}
                        rows={3}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="completionText">{labels.completionText}</Label>
                     <Input
                        id="completionText"
                        value={data.template_data.completionText}
                        onChange={(e) => setData('template_data', { ...data.template_data, completionText: e.target.value })}
                        placeholder={labels.completionPlaceholder}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="footerText">{labels.footerText}</Label>
                     <Input
                        id="footerText"
                        value={data.template_data.footerText}
                        onChange={(e) => setData('template_data', { ...data.template_data, footerText: e.target.value })}
                        placeholder={labels.footerPlaceholder}
                     />
                  </div>
               </CardContent>
            </Card>

            <Button onClick={handleSubmit} disabled={processing} className="w-full">
               <Save className="mr-2 h-4 w-4" />
               {processing ? labels.saving : template ? labels.updateTemplate : labels.createTemplate}
            </Button>
         </div>

         {/* Preview Section */}
         <div className="lg:sticky lg:top-6">
            <Card>
               <CardHeader>
                  <CardTitle>{labels.livePreview}</CardTitle>
                  <CardDescription>{labels.livePreviewDesc}</CardDescription>
               </CardHeader>
               <CardContent>
                  <CertificatePreview
                     template={data}
                     studentName={labels.sampleStudent}
                     courseName={labels.sampleCourse}
                     completionDate={labels.sampleDate}
                     logoUrl={logoPreview}
                  />
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default CertificateBuilderForm;
