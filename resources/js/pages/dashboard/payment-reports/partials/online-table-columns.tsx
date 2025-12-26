import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const TableColumn = (translate?: LanguageTranslations): ColumnDef<PaymentHistory>[] => {
   const { table = {} } = translate || {};

   const labels = {
      id: table?.id || 'المعرف',
      customer: table?.customer || 'العميل',
      item: table?.item || 'البند',
      amount: table?.amount || 'المبلغ',
      paymentMethod: table?.payment_method || 'طريقة الدفع',
      transactionId: table?.transaction_id || 'معرّف المعاملة',
      date: table?.date || 'التاريخ',
      notAvailable: table?.not_available || 'غير متوفر',
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
         accessorKey: 'payment_type',
         header: labels.paymentMethod,
         cell: ({ row }) => (
            <Badge variant="outline" className="capitalize">
               {row.original.payment_type}
            </Badge>
         ),
      },
      {
         accessorKey: 'transaction_id',
         header: labels.transactionId,
         cell: ({ row }) => <div className="font-mono text-xs">{row.original.transaction_id}</div>,
      },
      {
         accessorKey: 'created_at',
         header: () => <div className="pr-4 text-end">{labels.date}</div>,
         cell: ({ row }) => <div className="pr-4 text-end text-sm">{format(new Date(row.original.created_at), 'MMM dd, yyyy HH:mm')}</div>,
      },
   ];
};

export default TableColumn;
