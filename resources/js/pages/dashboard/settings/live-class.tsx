import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { Settings as SettingsIcon, Video } from 'lucide-react';
import { ReactNode } from 'react';

interface Props extends SharedData {
   liveClass: Settings<ZoomConfigFields>;
}

const LiveClass = ({ liveClass }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { settings, input, button, common } = translate;
   const { data, setData, post, errors, processing } = useForm({
      ...liveClass.fields,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.live-class.update', liveClass.id), {
         preserveScroll: true,
      });
   };

   return (
      <div className="space-y-6 md:px-3">
         {/* Header */}
         <Card>
            <CardContent className="px-6 py-4">
               <div className="flex items-center justify-between">
                  <h1 className="flex items-center gap-2 text-2xl font-bold">
                     <SettingsIcon className="h-6 w-6" />
                     {settings.live_class_settings}
                  </h1>
               </div>
            </CardContent>
         </Card>

         {/* Settings Form */}
         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        {settings.configure_zoom}
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Account Email */}
                        <div className="space-y-2">
                           <Label htmlFor="zoom_account_email">
                              {input.account_email} <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="zoom_account_email"
                              type="email"
                              value={data.zoom_account_email}
                              onChange={(e) => setData('zoom_account_email', e.target.value)}
                              placeholder={input.zoom_account_email_placeholder || 'أدخل بريد حساب زووم'}
                              required
                           />
                           {errors.zoom_account_email && <p className="text-sm text-red-500">{errors.zoom_account_email}</p>}
                        </div>

                        {/* Account ID */}
                        <div className="space-y-2">
                           <Label htmlFor="zoom_account_id">
                              {input.account_id} <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="zoom_account_id"
                              type="text"
                              value={data.zoom_account_id}
                              onChange={(e) => setData('zoom_account_id', e.target.value)}
                              placeholder={input.zoom_account_id_placeholder || 'أدخل معرف حساب زووم'}
                              required
                           />
                           {errors.zoom_account_id && <p className="text-sm text-red-500">{errors.zoom_account_id}</p>}
                        </div>

                        {/* Client ID */}
                        <div className="space-y-2">
                           <Label htmlFor="zoom_client_id">
                              {input.client_id} <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="zoom_client_id"
                              type="text"
                              value={data.zoom_client_id}
                              onChange={(e) => setData('zoom_client_id', e.target.value)}
                              placeholder={input.zoom_client_id_placeholder || 'أدخل معرف عميل زووم'}
                              required
                           />
                           {errors.zoom_client_id && <p className="text-sm text-red-500">{errors.zoom_client_id}</p>}
                        </div>

                        {/* Client Secret */}
                        <div className="space-y-2">
                           <Label htmlFor="zoom_client_secret">
                              {input.client_secret || 'المفتاح السري للعميل'} <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="zoom_client_secret"
                              type="password"
                              value={data.zoom_client_secret}
                              onChange={(e) => setData('zoom_client_secret', e.target.value)}
                              placeholder={input.zoom_client_secret_placeholder || 'أدخل المفتاح السري لعميل زووم'}
                              required
                           />
                           {errors.zoom_client_secret && <p className="text-sm text-red-500">{errors.zoom_client_secret}</p>}
                        </div>

                        <Separator />

                        {/* Web SDK Option */}
                        <div className="space-y-4">
                           <Label>
                              {input.do_you_want_use_web_sdk || 'هل تريد استخدام SDK للويب للدرس المباشر؟'} <span className="text-red-500">*</span>
                           </Label>
                           <RadioGroup
                              value={data.zoom_web_sdk ? 'activate' : 'deactivate'}
                              onValueChange={(value) => setData('zoom_web_sdk', value === 'activate' ? true : false)}
                              className="flex gap-6"
                           >
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem className="cursor-pointer" value="activate" id="activate" />
                                 <Label htmlFor="activate">{common.yes || 'نعم'}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <RadioGroupItem className="cursor-pointer" value="deactivate" id="deactivate" />
                                 <Label htmlFor="deactivate">{common.no || 'لا'}</Label>
                              </div>
                           </RadioGroup>
                           {errors.zoom_web_sdk && <p className="text-sm text-red-500">{errors.zoom_web_sdk}</p>}
                        </div>

                        {/* Web SDK Credentials */}
                        {data.zoom_web_sdk && (
                           <div className="space-y-4 rounded-lg border bg-blue-50 p-4">
                              <h4 className="font-medium text-blue-900">{settings.meeting_sdk_credentials || 'بيانات اعتماد SDK للاجتماعات'}</h4>

                              <div className="space-y-2">
                                 <Label>
                                    {input.meeting_sdk_client_id || 'معرف عميل SDK للاجتماعات'} <span className="text-red-500">*</span>
                                 </Label>
                                 <Input
                                    required
                                    type="text"
                                    value={data.zoom_sdk_client_id}
                                    onChange={(e) => setData('zoom_sdk_client_id', e.target.value)}
                                    placeholder={input.meeting_sdk_client_id_placeholder || 'أدخل معرف عميل SDK للاجتماعات'}
                                 />
                                 {errors.zoom_sdk_client_id && <p className="text-sm text-red-500">{errors.zoom_sdk_client_id}</p>}
                              </div>

                              <div className="space-y-2">
                                 <Label>
                                    {input.meeting_sdk_client_secret || 'المفتاح السري لعميل SDK للاجتماعات'} <span className="text-red-500">*</span>
                                 </Label>
                                 <Input
                                    required
                                    type="password"
                                    value={data.zoom_sdk_client_secret}
                                    onChange={(e) => setData('zoom_sdk_client_secret', e.target.value)}
                                    placeholder={input.meeting_sdk_client_secret_placeholder || 'أدخل المفتاح السري لعميل SDK للاجتماعات'}
                                 />
                                 {errors.zoom_sdk_client_secret && <p className="text-sm text-red-500">{errors.zoom_sdk_client_secret}</p>}
                              </div>
                           </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                           {processing ? button.saving || 'جاري الحفظ...' : settings.save_changes || button.save_changes || 'حفظ التغييرات'}
                        </Button>
                     </form>
                  </CardContent>
               </Card>
            </div>

            {/* Help Section */}
            <div className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg">{settings.setup_instructions || 'تعليمات الإعداد'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <h4 className="mb-2 font-medium">{settings.step_1_create_zoom_app || 'الخطوة 1: إنشاء تطبيق زووم'}</h4>
                        <p className="text-muted-foreground text-sm">{settings.step_1_description || 'انتقل إلى سوق زووم وأنشئ تطبيق OAuth من الخادم إلى الخادم.'}</p>
                     </div>

                     <div>
                        <h4 className="mb-2 font-medium">{settings.step_2_get_credentials || 'الخطوة 2: احصل على بيانات الاعتماد'}</h4>
                        <p className="text-muted-foreground text-sm">{settings.step_2_description || 'انسخ معرف الحساب ومعرف العميل والمفتاح السري للعميل من إعدادات تطبيقك.'}</p>
                     </div>

                     <div>
                        <h4 className="mb-2 font-medium">{settings.step_3_web_sdk || 'الخطوة 3: SDK للويب (اختياري)'}</h4>
                        <p className="text-muted-foreground text-sm">
                           {settings.step_3_description || 'إذا كنت تريد تضمين اجتماعات زووم مباشرةً في موقعك، قم بتمكين SDK للويب وتوفير بيانات اعتماد SDK للاجتماعات.'}
                        </p>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg">{settings.required_scopes || 'النطاقات المطلوبة'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <ul className="space-y-1 text-sm">
                        <li>• meeting:write</li>
                        <li>• meeting:read</li>
                        <li>• user:read</li>
                     </ul>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
};

LiveClass.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default LiveClass;
