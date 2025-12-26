import DeleteModal from '@/components/inertia/delete-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import EditForm from './edit-form';

const TableColumn = (translate: LanguageTranslations): ColumnDef<User>[] => {
   const { table, common } = translate;

   const labels = {
      name: table?.name || 'الاسم',
      status: table?.status || 'الحالة',
      role: table?.role || 'الدور',
      action: table?.action || 'إجراء',
      active: common?.active || 'نشط',
      inactive: common?.inactive || 'غير نشط',
      deleteWarning: table?.delete_instructor_warning || 'هل أنت متأكد من حذف هذا المستخدم؟',
   };

   return [
      {
         accessorKey: 'name',
         header: ({ column }) => {
            return (
               <div className="flex items-center">
                  <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                     {labels.name}
                     <ArrowUpDown />
                  </Button>
               </div>
            );
         },
         cell: ({ row }) => {
            const initials = row.original.name ? row.original.name.slice(0, 2) : 'م';

            return (
               <div className="flex items-center gap-2">
                  <Avatar className="h-11 w-11">
                     <AvatarImage src={row.original.photo || ''} className="object-cover" />
                     <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>

                  <div>
                     <p className="mb-0.5 text-base font-medium">{row.original.name}</p>
                     <p className="text-muted-foreground text-xs">{row.original.email}</p>
                  </div>
               </div>
            );
         },
      },
      {
         accessorKey: 'status',
         header: labels.status,
         cell: ({ row }) => (
            <div className="capitalize">
               <span>{row.original.status === 1 ? labels.active : labels.inactive}</span>
            </div>
         ),
      },
      {
         accessorKey: 'role',
         header: labels.role,
         cell: ({ row }) => (
            <div className="capitalize">
               <span>{row.original.role}</span>
            </div>
         ),
      },
      {
         id: 'actions',
         header: () => <div className="text-end">{labels.action}</div>,
         cell: ({ row }) => {
            return (
               <div className="flex justify-end gap-2 py-1">
                  <EditForm
                     user={row.original}
                     actionComponent={
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                           <Pencil />
                        </Button>
                     }
                  />

                  <DeleteModal
                     routePath={route('users.destroy', row.original.id)}
                     message={labels.deleteWarning}
                     actionComponent={
                        <Button size="icon" variant="ghost" className="bg-destructive/8 hover:bg-destructive/6 h-8 w-8 p-0">
                           <Trash2 className="text-destructive text-sm" />
                        </Button>
                     }
                  />
               </div>
            );
         },
      },
   ];
};

export default TableColumn;
