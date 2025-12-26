import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CheckCircle2, Clock, Eye, XCircle } from 'lucide-react';

const TableColumn = (onVerifyClick: (payment: PaymentHistory) => void, translate?: LanguageTranslations): ColumnDef<PaymentHistory>[] => {
   const { table = {}, button = {}, common = {} } = translate || {};

   const labels = {
      id: table?.id || 'المعرف',
      customer: table?.customer || 'العميل',
      item: table?.item || 'البند',
      amount: table?.amount || 'المبلغ',
      paymentDate: table?.payment_date || 'تاريخ الدفع',
      status: table?.status || 'الحالة',
      submittedAt: table?.submitted_at || 'تاريخ التقديم',
      actions: table?.action || 'إجراء',
      verify: button?.verify || 'تحقق',
      view: button?.view || 'عرض',
      verified: common?.verified || 'تم التحقق',
      rejected: common?.rejected || 'مرفوض',
      pending: common?.pending || 'قيد الانتظار',
      notAvailable: table?.not_available || 'غير متوفر',
   };

   const statusLabels: Record<string, string> = {
      verified: labels.verified,
      rejected: labels.rejected,
      pending: labels.pending,
   };

   return [
      {
         accessorKey: 'id',
         header: () => <div className="pl-4">{labels.id}</div>,
         cell: ({ row }) => <div className="pl-4 font-medium">#{row.original.id}</div>,
      },
      {
         accessorKey: 'user.name',
         header: labels.customer,
         cell: ({ row }) => (
            <div>
               <div className="font-medium">{row.original.user.name}</div>
               <div className="text-muted-foreground text-xs">{row.original.user.email}</div>
            </div>
         ),
      },
      {
         accessorKey: 'purchase.title',
         header: labels.item,
         cell: ({ row }) => <div className="max-w-[200px] truncate">{row.original.purchase?.title || labels.notAvailable}</div>,
      },
      {
         accessorKey: 'amount',
         header: labels.amount,
         cell: ({ row }) => <div className="font-medium">${Number(row.original.amount).toFixed(2)}</div>,
      },
      {
         accessorKey: 'meta.payment_date',
         header: labels.paymentDate,
         cell: ({ row }) => (
            <div className="text-sm">
               {row.original.meta?.payment_date ? format(new Date(row.original.meta.payment_date as string), 'MMM dd, yyyy') : labels.notAvailable}
            </div>
         ),
      },
      {
         accessorKey: 'meta.status',
         header: labels.status,
         cell: ({ row }) => {
            const status = row.original.meta?.status || 'pending';

            return (
               <Badge variant={status === 'verified' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary'} className="gap-1">
                  {status === 'verified' ? (
                     <CheckCircle2 className="h-3 w-3" />
                  ) : status === 'rejected' ? (
                     <XCircle className="h-3 w-3" />
                  ) : (
                     <Clock className="h-3 w-3" />
                  )}
                  <span>{statusLabels[status] || status}</span>
               </Badge>
            );
         },
      },
      {
         accessorKey: 'created_at',
         header: labels.submittedAt,
         cell: ({ row }) => <div className="text-sm">{format(new Date(row.original.created_at), 'MMM dd, yyyy HH:mm')}</div>,
      },
      {
         id: 'actions',
         header: () => <div className="pr-4 text-end">{labels.actions}</div>,
         cell: ({ row }) => {
            const status = row.original.meta?.status || 'pending';
            return (
               <div className="flex justify-end gap-2 pr-4">
                  <Button size="sm" variant="outline" onClick={() => onVerifyClick(row.original)} className="gap-1">
                     <Eye className="h-3 w-3" />
                     {status === 'pending' ? labels.verify : labels.view}
                  </Button>
               </div>
            );
         },
      },
   ];
};

export default TableColumn;
