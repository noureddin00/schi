import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import currencies from '@/data/currencies';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { SystemProps } from '..';

interface MediaFields {
   new_logo_dark: null | File;
   new_logo_light: null | File;
   new_favicon: null | File;
   new_banner: null | File;
}

const Website = () => {
   const { props } = usePage<SharedData & SystemProps>();
   const { translate } = props;
   const { input, settings } = translate;

   const mediaFields: MediaFields = {
      new_logo_dark: null,
      new_logo_light: null,
      new_favicon: null,
      new_banner: null,
   };

   const { data, setData, post, errors, processing } = useForm({
      ...(props.system.fields as SystemFields),
      ...(mediaFields as MediaFields),
   });

   // Preview URLs for client-side preview before saving
   const [logoDarkPreview, setLogoDarkPreview] = useState<string | null>(null);
   const [logoLightPreview, setLogoLightPreview] = useState<string | null>(null);
   const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
   const [bannerPreview, setBannerPreview] = useState<string | null>(null);

   useEffect(() => {
      const toAbsolute = (url?: string) => {
         if (!url) return null;
         if (url.startsWith('http')) return url;
         try {
            return window.location.origin + url;
         } catch (e) {
            return url;
         }
      };

      setLogoDarkPreview(toAbsolute(props.system.fields.logo_dark));
      setLogoLightPreview(toAbsolute(props.system.fields.logo_light));
      setFaviconPreview(toAbsolute(props.system.fields.favicon));
      setBannerPreview(toAbsolute(props.system.fields.banner));
   }, [props.system]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.system.update', { id: props.system.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Website Information */}
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{settings.website_information}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{input.website_name}</Label>
                     <Input
                        name="name"
                        value={data.name || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.website_name_placeholder}
                     />
                     <InputError message={errors.name} />
                  </div>

                  <div>
                     <Label>{input.website_title}</Label>
                     <Input
                        name="title"
                        value={data.title || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.website_title_placeholder}
                     />
                     <InputError message={errors.title} />
                  </div>

                  <div className="md:col-span-2">
                     <Label>{input.keywords}</Label>
                     <Input
                        name="keywords"
                        value={data.keywords || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.keywords_placeholder}
                     />
                     <InputError message={errors.keywords} />
                  </div>

                  <div className="md:col-span-2">
                     <Label>{input.description}</Label>
                     <Textarea
                        rows={4}
                        name="description"
                        value={data.description || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.description_placeholder}
                     />
                     <InputError message={errors.description} />
                  </div>

                  <div>
                     <Label>{input.author}</Label>
                     <Input
                        name="author"
                        value={data.author || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.author_name_placeholder}
                     />
                     <InputError message={errors.author} />
                  </div>

                  <div>
                     <Label>{input.slogan}</Label>
                     <Input name="slogan" value={data.slogan || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={input.slogan} />
                     <InputError message={errors.slogan} />
                  </div>
               </div>
            </div>

            {/* Contact Information */}
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{settings.contact_information || 'معلومات الاتصال'}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>
                        {input.system_email || 'البريد الإلكتروني للنظام'} *
                     </Label>
                     <Input
                        type="email"
                        name="email"
                        value={data.email || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.system_email_placeholder}
                     />
                     <InputError message={errors.email} />
                  </div>

                  <div>
                     <Label>{input.phone || 'رقم الهاتف'}</Label>
                     <Input
                        name="phone"
                        value={data.phone || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={input.phone_number_placeholder}
                     />
                     <InputError message={errors.phone} />
                  </div>
               </div>
            </div>

            {/* Media Settings */}
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{settings.media || 'الوسائط'}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{input.logo_dark || 'الشعار (نسخة داكنة)'}</Label>
                     <Input
                        type="file"
                        name="new_logo_dark"
                        accept="image/*"
                        onChange={(e) => onHandleChange(e, setData, (v: string) => setLogoDarkPreview(v))}
                        placeholder={settings.choose_file || 'اختر ملف'}
                     />
                     <InputError message={errors.new_logo_dark} />
                     {logoDarkPreview && (
                        <div className="mt-2">
                           <img src={logoDarkPreview} alt={settings.logo_dark_preview || 'معاينة الشعار الداكن'} className="h-12 object-contain" />
                        </div>
                     )}
                  </div>

                  <div>
                     <Label>{input.logo_light || 'الشعار (نسخة فاتحة)'}</Label>
                     <Input
                        type="file"
                        name="new_logo_light"
                        accept="image/*"
                        onChange={(e) => onHandleChange(e, setData, (v: string) => setLogoLightPreview(v))}
                        placeholder={settings.choose_file || 'اختر ملف'}
                     />
                     <InputError message={errors.new_logo_light} />
                     {logoLightPreview && (
                        <div className="mt-2">
                           <img src={logoLightPreview} alt={settings.logo_light_preview || 'معاينة الشعار الفاتح'} className="h-12 object-contain" />
                        </div>
                     )}
                  </div>

                  <div>
                     <Label>{settings.favicon}</Label>
                     <Input
                        type="file"
                        name="new_favicon"
                        accept="image/*"
                        onChange={(e) => onHandleChange(e, setData, (v: string) => setFaviconPreview(v))}
                        placeholder="Select Favicon"
                     />
                     <InputError message={errors.new_favicon} />
                     {faviconPreview && (
                        <div className="mt-2">
                           <img src={faviconPreview} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                        </div>
                     )}
                  </div>

                  <div>
                     <Label>{settings.banner}</Label>
                     <Input type="file" name="new_banner" accept="image/*" onChange={(e) => onHandleChange(e, setData, (v: string) => setBannerPreview(v))} placeholder="Select Banner" />
                     <InputError message={errors.new_banner} />
                     {bannerPreview && (
                        <div className="mt-2">
                           <img src={bannerPreview} alt="Banner Preview" className="h-24 object-cover" />
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div>
               <h2 className="mb-4 text-xl font-semibold">{settings.additional_settings || 'الإعدادات الإضافية'}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                     <Label>{settings.website_direction || 'اتجاه الموقع'}</Label>
                     <Select value={data.direction} onValueChange={(value) => setData('direction', value)}>
                        <SelectTrigger>
                           <SelectValue placeholder={input.select_option} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="none">None</SelectItem>
                           <SelectItem value="ltr">LTR</SelectItem>
                           <SelectItem value="rtl">RTL</SelectItem>
                        </SelectContent>
                     </Select>
                     <InputError message={errors.direction} />
                  </div>

                  <div>
                     <Label>{settings.default_theme || 'السمة الافتراضية'}</Label>
                     <Select value={data.theme} onValueChange={(value) => setData('theme', value as Appearance)}>
                        <SelectTrigger>
                           <SelectValue placeholder={input.select_option} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="system">System</SelectItem>
                           <SelectItem value="light">Light</SelectItem>
                           <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                     </Select>
                     <InputError message={errors.theme} />
                  </div>

                  <div>
                     <Label>{settings.language_selector || 'محدد اللغة'}</Label>
                     <Select value={data.language_selector ? '1' : '0'} onValueChange={(value) => setData('language_selector', value === '1')}>
                        <SelectTrigger>
                           <SelectValue placeholder={input.select_option} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="1">Show</SelectItem>
                           <SelectItem value="0">Hide</SelectItem>
                        </SelectContent>
                     </Select>
                     <InputError message={errors.language_selector} />
                  </div>

                  <div>
                     <Label>{`${settings.course_selling_currency || 'عملة بيع الدورات'} (${data.selling_currency})`}</Label>
                     <Combobox
                        data={currencies}
                        defaultValue={data.selling_currency || ''}
                        placeholder="Select a selling currency"
                        onSelect={(selected) => setData('selling_currency', selected.value)}
                     />
                     <InputError message={errors.selling_currency} />
                  </div>

                  <div>
                     <Label>{settings.course_selling_tax_percent || 'نسبة ضريبة بيع الدورات (%)'}</Label>
                     <Input
                        name="selling_tax"
                        value={data.selling_tax || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Course Selling Tax Percentage"
                     />
                     <InputError message={errors.selling_tax} />
                  </div>

                  {/* Other Settings */}
                  {props.system.sub_type === 'collaborative' && (
                     <div>
                        <Label>{settings.instructor_revenue_percent || 'نسبة أرباح المدرّس (%)'}</Label>
                        <Input
                           name="instructor_revenue"
                           value={data.instructor_revenue || ''}
                           onChange={(e) => onHandleChange(e, setData)}
                           placeholder="Enter Instructor Revenue Percentage"
                        />
                        <InputError message={errors.instructor_revenue} />
                     </div>
                  )}
               </div>
            </div>

            <div className="flex justify-end">
               <LoadingButton loading={processing}>{settings.save_changes || 'حفظ التغييرات'}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Website;
