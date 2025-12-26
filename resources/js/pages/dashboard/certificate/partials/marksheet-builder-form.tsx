import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useState } from 'react';
import MarksheetPreview from './marksheet-preview';

const MarksheetBuilderForm = ({ template }: { template?: MarksheetTemplate | null }) => {
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { dashboard = {}, button = {} } = translate;

   const labels = {
      basicInfo: dashboard?.basic_information || 'المعلومات الأساسية',
      basicInfoDesc: dashboard?.set_template_name || 'حدد اسم القالب',
      templateType: dashboard?.template_type || 'نوع القالب',
      selectTemplateType: dashboard?.select_template_type || 'اختر نوع القالب',
      course: dashboard?.course || 'دورة',
      name: dashboard?.template_name || 'اسم القالب',
      namePlaceholder: dashboard?.template_name_placeholder || 'مثال: قالب أزرق حديث',
      logoBranding: dashboard?.logo_branding || 'الشعار والعلامة',
      logoDesc: dashboard?.upload_institution_logo || 'حمّل شعار المؤسسة',
      logoImage: dashboard?.logo_image || 'صورة الشعار',
      logoRecommendation: dashboard?.logo_recommendation || 'مستحسن: PNG أو SVG، حجم أقصى 1 ميغابايت',
      colors: dashboard?.colors || 'الألوان',
      colorsDesc: dashboard?.marksheet_colors || 'خصّص نظام ألوان كشف الدرجات',
      primaryColor: dashboard?.primary_color || 'اللون الأساسي',
      secondaryColor: dashboard?.secondary_color || 'اللون الثانوي',
      backgroundColor: dashboard?.background_color || 'لون الخلفية',
      borderColor: dashboard?.border_color || 'لون الإطار',
      typography: dashboard?.typography || 'الخط',
      typographyDesc: dashboard?.choose_font_style || 'اختر نمط الخط لكشف الدرجات',
      fontFamily: dashboard?.font_family || 'نوع الخط',
      serif: dashboard?.serif || 'سيريف (كلاسيكي)',
      sansSerif: dashboard?.sans_serif || 'سان سيريف (حديث)',
      monospace: dashboard?.monospace || 'أحادي المسافة (تقني)',
      content: dashboard?.marksheet_content || 'محتوى كشف الدرجات',
      contentDesc: dashboard?.marksheet_content_description || 'خصّص نص كشف الدرجات',
      headerText: dashboard?.header_text || 'نص الترويسة',
      headerPlaceholder: dashboard?.header_placeholder || 'كشف درجات الدورة',
      institutionName: dashboard?.institution_name || 'اسم المؤسسة',
      institutionPlaceholder: dashboard?.institution_placeholder || 'اسم المؤسسة التعليمية',
      footerText: dashboard?.footer_text || 'نص التذييل',
      footerPlaceholder: dashboard?.footer_placeholder || 'هذا كشف درجات رسمي',
      saving: dashboard?.saving || 'جارٍ الحفظ...',
      updateTemplate: dashboard?.update_template || button?.update_template || 'تحديث القالب',
      createTemplate: dashboard?.create_template || button?.create_template || 'إنشاء القالب',
      livePreview: dashboard?.live_preview || 'معاينة مباشرة',
      livePreviewDesc: dashboard?.marksheet_live_preview || 'شاهد شكل كشف الدرجات',
      sampleStudent: dashboard?.sample_student_name || 'محمد أحمد',
      sampleCourse: dashboard?.sample_course_name || 'اسم دورة تجريبية',
      sampleDate: dashboard?.sample_date || '١ يناير ٢٠٢٥',
   };

   const defaultTemplateData = template?.template_data || {
      primaryColor: '#1e40af',
      secondaryColor: '#475569',
      backgroundColor: '#ffffff',
      borderColor: '#2563eb',
      headerText: labels.headerPlaceholder,
      institutionName: labels.institutionPlaceholder,
      footerText: labels.footerPlaceholder,
      fontFamily: 'sans-serif',
   };

   const [logoPreview, setLogoPreview] = useState(template?.logo_path);

   const { data, setData, post, processing, errors } = useForm({
      type: template?.type || 'course',
      name: template?.name || labels.namePlaceholder,
      logo: null as File | null,
      template_data: defaultTemplateData,
   });

   const onLogoChange = (name: string, value: unknown) => {
      setData(name as any, value as any);
      setLogoPreview(URL.createObjectURL(value as File));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (template) {
         // Update existing template
         post(route('marksheet.templates.update', template.id));
      } else {
         // Create new template
         post(route('marksheet.templates.store'));
      }
   };

   return (
      <div className="grid gap-6 lg:grid-cols-2">
         {/* Form Section */}
         <div className="space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>{labels.basicInfo}</CardTitle>
                  <CardDescription>{labels.basicInfoDesc}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="type">{labels.templateType}</Label>
                     <Select value={data.type} onValueChange={(value) => setData('type', value as any)}>
                        <SelectTrigger>
                           <SelectValue placeholder={labels.selectTemplateType} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="course">{labels.course}</SelectItem>
                           {/* <SelectItem value="exam">{dashboard?.exam || 'اختبار'}</SelectItem> */}
                        </SelectContent>
                     </Select>
                     {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="name">{labels.name}</Label>
                     <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder={labels.namePlaceholder} />
                     {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.logoBranding}</CardTitle>
                  <CardDescription>{labels.logoDesc}</CardDescription>
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
                     <p className="text-muted-foreground text-xs">{labels.logoRecommendation}</p>
                     <InputError message={errors.logo} />
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.colors}</CardTitle>
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
                              placeholder="#1e40af"
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
                              placeholder="#475569"
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
                              placeholder="#ffffff"
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
                              placeholder="#2563eb"
                           />
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.typography}</CardTitle>
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
                           <SelectItem value="serif">{labels.serif}</SelectItem>
                           <SelectItem value="sans-serif">{labels.sansSerif}</SelectItem>
                           <SelectItem value="monospace">{labels.monospace}</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{labels.content}</CardTitle>
                  <CardDescription>{labels.contentDesc}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="headerText">{labels.headerText}</Label>
                     <Input
                        id="headerText"
                        value={data.template_data.headerText}
                        onChange={(e) => setData('template_data', { ...data.template_data, headerText: e.target.value })}
                        placeholder={labels.headerPlaceholder}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="institutionName">{labels.institutionName}</Label>
                     <Input
                        id="institutionName"
                        value={data.template_data.institutionName}
                        onChange={(e) => setData('template_data', { ...data.template_data, institutionName: e.target.value })}
                        placeholder={labels.institutionPlaceholder}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="footerText">{labels.footerText}</Label>
                     <Textarea
                        id="footerText"
                        value={data.template_data.footerText}
                        onChange={(e) => setData('template_data', { ...data.template_data, footerText: e.target.value })}
                        placeholder={labels.footerPlaceholder}
                        rows={3}
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
                  <MarksheetPreview
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

export default MarksheetBuilderForm;
