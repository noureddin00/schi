import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SharedData } from '@/types/global';
import { Link, router, usePage } from '@inertiajs/react';
import { Check, ClipboardList, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import MarksheetPreview from './marksheet-preview';

interface MarkSheetCardProps {
   type: 'course' | 'exam';
   template: MarksheetTemplate;
}

const MarkSheetCard = ({ type, template }: MarkSheetCardProps) => {
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { common = {}, button = {}, table = {}, dashboard = {} } = translate;

   const labels = {
      active: common?.active || 'نشط',
      created: table?.created || 'تم الإنشاء:',
      primary: table?.primary || 'أساسي',
      secondary: table?.secondary || 'ثانوي',
      activate: button?.activate || 'تفعيل',
      edit: button?.edit || 'تعديل',
      deleteConfirm: dashboard?.delete_marksheet_warning || 'هل أنت متأكد من حذف قالب كشف الدرجات هذا؟',
      preview: dashboard?.preview || 'معاينة:',
      sampleStudent: dashboard?.sample_student_name || 'محمد أحمد',
      sampleCourse: dashboard?.sample_course_name || 'اسم دورة تجريبية',
      sampleDate: dashboard?.sample_date || '١ يناير ٢٠٢٥',
   };
   const [previewMarksheet, setPreviewMarksheet] = useState<MarksheetTemplate | null>(null);

   const handleMarksheetActivate = (templateId: number) => {
      router.post(
         route('marksheet.templates.activate', templateId),
         { type },
         {
            preserveScroll: true,
         },
      );
   };

   const handleMarksheetDelete = (templateId: number) => {
      if (confirm(labels.deleteConfirm)) {
         router.delete(route('marksheet.templates.destroy', templateId), {
            preserveScroll: true,
         });
      }
   };

   const handleMarksheetPreview = (template: MarksheetTemplate) => {
      setPreviewMarksheet(template);
   };

   const handleCloseMarksheetPreview = () => {
      setPreviewMarksheet(null);
   };

   return (
      <>
         <Card key={template.id} className={`relative ${template.is_active ? 'ring-primary ring-2' : ''}`}>
            {template.is_active && (
               <div className="bg-primary text-primary-foreground absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold">
                  <Check className="mr-1 inline h-3 w-3" />
                  {labels.active}
               </div>
            )}
            <CardHeader>
               <CardTitle className="flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  {template.name}
               </CardTitle>
               <CardDescription>{labels.created} {new Date(template.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {/* Mini Preview */}
               <div
                  className="cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:shadow-md"
                  style={{
                     backgroundColor: template.template_data.backgroundColor,
                     borderColor: template.template_data.borderColor,
                  }}
                  onClick={() => handleMarksheetPreview(template)}
               >
                  <div className="mb-2 text-xs font-bold" style={{ color: template.template_data.primaryColor }}>
                     {template.template_data.headerText}
                  </div>
                  <div className="text-[8px]" style={{ color: template.template_data.secondaryColor }}>
                     {template.template_data.institutionName}
                  </div>
               </div>

               {/* Color Indicators */}
               <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                     <div className="h-4 w-4 rounded border" style={{ backgroundColor: template.template_data.primaryColor }} />
                     <span className="text-xs">{labels.primary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <div className="h-4 w-4 rounded border" style={{ backgroundColor: template.template_data.secondaryColor }} />
                     <span className="text-xs">{labels.secondary}</span>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex gap-2">
                  {!template.is_active && (
                     <Button size="sm" variant="outline" className="flex-1" onClick={() => handleMarksheetActivate(template.id as number)}>
                        <Check className="mr-1 h-3 w-3" />
                        {labels.activate}
                     </Button>
                  )}
                  <Button asChild size="sm" variant="outline" className="flex-1">
                     <Link href={route('marksheet.templates.edit', template.id)}>
                        <Edit className="mr-1 h-3 w-3" />
                        {labels.edit}
                     </Link>
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleMarksheetDelete(template.id as number)}>
                     <Trash2 className="h-3 w-3" />
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Marksheet Preview Dialog */}
         {previewMarksheet && (
            <Dialog open={!!previewMarksheet} onOpenChange={(open) => !open && handleCloseMarksheetPreview()}>
               <DialogContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-4xl">
                  <ScrollArea className="max-h-[90vh]">
                     <div className="p-6">
                        <DialogHeader className="mb-6">
                           <DialogTitle>{labels.preview} {previewMarksheet?.name}</DialogTitle>
                        </DialogHeader>

                        <MarksheetPreview
                           template={previewMarksheet}
                           studentName={labels.sampleStudent}
                           courseName={labels.sampleCourse}
                           completionDate={labels.sampleDate}
                        />
                     </div>
                  </ScrollArea>
               </DialogContent>
            </Dialog>
         )}
      </>
   );
};

export default MarkSheetCard;
