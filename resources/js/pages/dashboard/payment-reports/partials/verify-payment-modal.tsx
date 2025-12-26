import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types/global';
import { router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckCircle2, Download, FileText, Info, XCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Renderer } from 'richtor';
import 'richtor/styles';

interface Props {
   payment: PaymentHistory;
   isOpen: boolean;
   onClose: () => void;
}

const VerifyPaymentModal = ({ payment, isOpen, onClose }: Props) => {
   const { props } = usePage<SharedData>();
   const translate = props.translate || {};
   const { dashboard = {}, table = {}, button = {}, common = {}, input = {} } = translate;
   const paymentMeta = payment.meta ?? {};
   const status = (paymentMeta.status as string) || 'pending';
   const paymentInfo = paymentMeta.payment_info as string | undefined;
   const [adminNotes, setAdminNotes] = useState('');

   const labels = {
      title: dashboard?.offline_payment_details || 'تفاصيل الدفع دون اتصال',
      description: dashboard?.offline_payment_review || 'راجع ووافق على الدفع دون اتصال',
      paymentStatus: dashboard?.payment_status || 'حالة الدفع:',
      paymentInfo: dashboard?.payment_information || 'معلومات الدفع',
      transactionId: table?.transaction_id || 'معرف المعاملة',
      amount: table?.amount || 'المبلغ',
      paymentDate: table?.payment_date || 'تاريخ الدفع',
      submittedAt: table?.submitted_at || 'تاريخ الإرسال',
      submittedDetails: dashboard?.submitted_payment_details || 'تفاصيل الدفع المرسلة',
      attachment: dashboard?.attachment || 'المرفقات',
      transactionProof: dashboard?.transaction_proof || 'إثبات المعاملة',
      download: button?.download || 'تحميل',
      autoEnroll: dashboard?.payment_auto_enroll || 'سيتم تسجيل المستخدم تلقائياً في الدورة/الاختبار بعد التحقق.',
      adminNotes: input?.admin_notes || 'ملاحظات المشرف (اختياري)',
      adminNotesPlaceholder: input?.admin_notes_placeholder || 'أضف أي ملاحظات حول هذا التحقق...',
      cancel: button?.cancel || 'إلغاء',
      reject: button?.reject || 'رفض',
      verifyEnroll: dashboard?.verify_and_enroll || 'التحقق والتسجيل',
      close: button?.close || 'إغلاق',
      notAvailable: table?.not_available || 'غير متوفر',
      statusVerified: common?.verified || 'تم التحقق',
      statusRejected: common?.rejected || 'مرفوض',
      statusPending: common?.pending || 'قيد الانتظار',
   };

   const statusLabels: Record<string, string> = {
      verified: labels.statusVerified,
      rejected: labels.statusRejected,
      pending: labels.statusPending,
   };

   const handleVerify = (e: FormEvent) => {
      e.preventDefault();
      router.post(
         route('payment-reports.offline.verify', payment.id),
         {
            admin_notes: adminNotes,
         },
         {
            onSuccess: () => {
               onClose();
            },
         },
      );
   };

   const handleReject = (e: FormEvent) => {
      e.preventDefault();
      router.post(
         route('payment-reports.offline.reject', payment.id),
         {
            admin_notes: adminNotes,
         },
         {
            onSuccess: () => {
               onClose();
            },
         },
      );
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {labels.title}
               </DialogTitle>
               <DialogDescription>{labels.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
               {/* Status Badge */}
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{labels.paymentStatus}</span>
                  <Badge variant={status === 'verified' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary'} className="gap-1">
                     {status === 'verified' ? (
                        <CheckCircle2 className="h-3 w-3" />
                     ) : status === 'rejected' ? (
                        <XCircle className="h-3 w-3" />
                     ) : (
                        <Info className="h-3 w-3" />
                     )}
                     {statusLabels[status] || status}
                  </Badge>
               </div>

               {/* Payment Information */}
               <div className="bg-muted/50 space-y-3 rounded-lg border p-4">
                  <h3 className="text-sm font-semibold">{labels.paymentInfo}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                     <div>
                        <span className="text-muted-foreground">{labels.transactionId}:</span>
                        <p className="font-mono font-medium">{payment.transaction_id}</p>
                     </div>
                     <div>
                        <span className="text-muted-foreground">{labels.amount}:</span>
                        <p className="text-lg font-medium">${Number(payment.amount).toFixed(2)}</p>
                     </div>
                     <div>
                        <span className="text-muted-foreground">{labels.paymentDate}:</span>
                        <p className="font-medium">
                           {paymentMeta.payment_date ? format(new Date(paymentMeta.payment_date as string), 'MMM dd, yyyy') : labels.notAvailable}
                        </p>
                     </div>
                     <div>
                        <span className="text-muted-foreground">{labels.submittedAt}:</span>
                        <p className="font-medium">{payment.created_at ? format(new Date(payment.created_at as string), 'MMM dd, yyyy HH:mm') : labels.notAvailable}</p>
                     </div>
                  </div>
               </div>

               {/* Payment Info (Rich Text) */}
               {!!paymentInfo && (
                  <div className="bg-muted/50 space-y-3 rounded-lg border p-4">
                     <h3 className="text-sm font-semibold">{labels.submittedDetails}</h3>
                     <Renderer value={paymentInfo} />
                  </div>
               )}

               {/* Attachment */}
               {payment.media && payment.media.length > 0 && (
                  <div className="bg-muted/50 space-y-3 rounded-lg border p-4">
                     <h3 className="text-sm font-semibold">{labels.attachment}</h3>
                     <div className="flex items-center gap-3">
                        <FileText className="text-muted-foreground h-8 w-8" />
                        <div className="flex-1">
                           <p className="text-sm font-medium">{payment.media[0].file_name}</p>
                           <p className="text-muted-foreground text-xs">{labels.transactionProof}</p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                           <a href={payment.media[0].original_url} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-1 h-4 w-4" />
                              {labels.download}
                           </a>
                        </Button>
                     </div>
                  </div>
               )}

               {/* Verification Form (Only for Pending) */}
               {(status === 'pending' || status === 'rejected') && (
                  <>
                     <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>{labels.autoEnroll}</AlertDescription>
                     </Alert>

                     <form onSubmit={handleVerify} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="admin_notes">{labels.adminNotes}</Label>
                           <Textarea
                              id="admin_notes"
                              name="admin_notes"
                              rows={3}
                              placeholder={labels.adminNotesPlaceholder}
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                           />
                        </div>

                        <DialogFooter className="gap-2">
                           <Button type="button" variant="outline" onClick={onClose}>
                              {labels.cancel}
                           </Button>
                           <Button type="button" variant="destructive" onClick={handleReject}>
                              <XCircle className="mr-1 h-4 w-4" />
                              {labels.reject}
                           </Button>
                           <Button type="submit">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              {labels.verifyEnroll}
                           </Button>
                        </DialogFooter>
                     </form>
                  </>
               )}

               {/* Already Verified/Rejected */}
               {status !== 'pending' && (
                  <DialogFooter>
                     <Button variant="outline" onClick={onClose}>
                        {labels.close}
                     </Button>
                  </DialogFooter>
               )}
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default VerifyPaymentModal;
