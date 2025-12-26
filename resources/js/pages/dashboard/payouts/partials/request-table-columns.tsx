import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

const PayoutsTableColumn = (translate: LanguageTranslations): ColumnDef<Payout>[] => {
   const { table = {}, button = {} } = translate || {};

   const labels = {
      name: table?.name || 'الاسم',
      payoutAmount: table?.payout_amount || 'مبلغ السحب',
      status: table?.status || 'الحالة',
      action: table?.action || 'إجراء',
      pay: table?.pay || button?.pay || 'دفع',
      notAvailable: table?.not_available || 'غير متوفر',
   };

   return [
      {
         accessorKey: 'profile',
         header: () => <div className="pl-4">{labels.name}</div>,
         cell: ({ row }) => {
            const initials = row.original.user.name ? row.original.user.name.charAt(0) : 'م';
            return (
               <div className="flex items-center gap-2 pl-4 capitalize">
                  <Avatar>
                     <AvatarImage src={row.original.user.photo || ''} alt={row.original.user.name} className="object-cover" />
                     <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>

                  <div>
                     <p>{row.original.user.name || labels.notAvailable}</p>
                     <p>{row.original.user.email || labels.notAvailable}</p>
                  </div>
               </div>
            );
         },
      },
      {
         accessorKey: 'amount',
         header: () => <div className="text-center">{labels.payoutAmount}</div>,
         cell: ({ row }) => (
            <div className="text-center capitalize">
               <p>{row.original.amount}$</p>
            </div>
         ),
      },
      {
         accessorKey: 'status',
         header: () => <div className="text-center">{labels.status}</div>,
         cell: ({ row }) => <div className="text-center capitalize">{row.getValue('status')}</div>,
      },
      {
         id: 'action',
         header: () => <div className="pr-4 text-end">{labels.action}</div>,
         cell: ({ row }) => (
            <div className="pr-4 text-end">
               <Button asChild type="button">
                  <a href={route('payouts.gateway.index', { slug: 'web', request_id: row.original.id })}>{labels.pay}</a>
               </Button>
            </div>
         ),
      },
   ];
};

export default PayoutsTableColumn;
