import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format, isFuture, isPast, parseISO } from 'date-fns';
import { Copy, Pencil } from 'lucide-react';
import CouponForm from './coupon-form';

interface CouponTableColumnsProps {
   courses: Course[];
}

const CouponTableColumns = ({ courses }: CouponTableColumnsProps): ColumnDef<CourseCoupon>[] => {
   const pageProps = usePage<{ translate?: Record<string, Record<string, string>> }>();
   const { translate } = pageProps.props;
   const { dashboard } = translate || {};

   const getCouponStatus = (coupon: CourseCoupon) => {
      if (!coupon.is_active) return { label: dashboard?.inactive || 'غير مفعل', variant: 'secondary' as const };
      if (coupon.valid_to && isPast(parseISO(coupon.valid_to))) return { label: dashboard?.expired || 'منتهي الصلاحية', variant: 'destructive' as const };
      if (coupon.valid_from && isFuture(parseISO(coupon.valid_from))) return { label: dashboard?.scheduled || 'مجدول', variant: 'secondary' as const };
      if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) return { label: dashboard?.used_up || 'مستخدمة بالكامل', variant: 'destructive' as const };
      return { label: dashboard?.active || 'نشط', variant: 'default' as const };
   };

   const copyCouponCode = (code: string) => {
      navigator.clipboard.writeText(code);
      alert(dashboard?.coupon_copied || 'تم نسخ رمز القسيمة إلى الحافظة!');
   };

   return [
      {
         accessorKey: 'code',
         header: () => <p className="pl-4">{dashboard?.coupon_code || 'رمز القسيمة'}</p>,
         cell: ({ row }) => (
            <div className="flex items-center gap-2 pl-4">
               <code className="rounded bg-gray-100 px-2 py-1 font-bold">{row.original.code}</code>
               <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCouponCode(row.original.code)}>
                  <Copy className="h-3 w-3" />
               </Button>
            </div>
         ),
      },
      {
         accessorKey: 'discount',
         header: dashboard?.discount || 'الخصم',
         cell: ({ row }) => (
            <Badge variant="outline">
               {row.original.discount_type === 'percentage' ? `${row.original.discount}% ${dashboard?.off || 'خصم'}` : `$${row.original.discount} ${dashboard?.off || 'خصم'}`}
            </Badge>
         ),
      },
      {
         accessorKey: 'course',
         header: dashboard?.course || 'الدورة',
         cell: ({ row }) =>
            row.original.course ? (
               <span className="font-medium">{row.original.course.title}</span>
            ) : (
               <span className="text-primary font-medium">{dashboard?.global_coupon || 'قسيمة عامة'}</span>
            ),
      },
      {
         accessorKey: 'usage',
         header: dashboard?.usage || 'الاستخدام',
         cell: ({ row }) => {
            const limited = row.original.usage_type === 'limited';

            return limited ? (
               <span>
                  {row.original.used_count} / {row.original.usage_limit}
               </span>
            ) : (
               <span>{dashboard?.unlimited || 'غير محدود'}</span>
            );
         },
      },
      {
         accessorKey: 'valid_from',
         header: dashboard?.valid_from || 'صحيح من',
         cell: ({ row }) => (row.original.valid_from ? format(parseISO(row.original.valid_from), 'MMM dd, yyyy HH:mm') : '-'),
      },
      {
         accessorKey: 'valid_to',
         header: dashboard?.valid_to || 'صحيح إلى',
         cell: ({ row }) => (row.original.valid_to ? format(parseISO(row.original.valid_to), 'MMM dd, yyyy HH:mm') : '-'),
      },
      {
         accessorKey: 'status',
         header: dashboard?.status || 'الحالة',
         cell: ({ row }) => {
            const status = getCouponStatus(row.original);
            return <Badge variant={status.variant}>{status.label}</Badge>;
         },
      },
      {
         id: 'actions',
         header: () => <p className="pr-4 text-end">{dashboard?.actions || 'الإجراءات'}</p>,
         cell: ({ row }) => {
            const coupon = row.original;

            return (
               <div className="flex items-center justify-end py-2 pr-4">
                  <CouponForm
                     title={dashboard?.edit_coupon || 'تعديل القسيمة'}
                     coupon={coupon}
                     courses={courses}
                     handler={
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                           <Pencil />
                        </Button>
                     }
                  />
               </div>
            );
         },
      },
   ];
};

export default CouponTableColumns;
