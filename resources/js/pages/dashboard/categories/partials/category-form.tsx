import IconPicker from '@/components/icon-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLang } from '@/hooks/use-lang';
import { onHandleChange } from '@/lib/inertia';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   category?: CourseCategory;
   lastPosition: number;
}

const CategoryForm = ({ title, category, lastPosition, handler }: Props) => {
   const [open, setOpen] = useState(false);
   const [openIcon, setOpenIcon] = useState(false);
   const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(category?.thumbnail || null);
   const { dashboard, input, button } = useLang();

   const { data, setData, post, errors, processing, reset } = useForm({
      title: category ? category.title : '',
      icon: category ? category.icon : '',
      sort: category ? category.sort : lastPosition + 1,
      status: category ? category.status : 1,
      description: category ? category.description : '',
      thumbnail: null,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (category) {
         post(route('categories.update', category.id), {
            onSuccess: () => setOpen(false),
            forceFormData: true,
         });
      } else {
         post(route('categories.store'), {
            onSuccess: () => {
               reset();
               setOpen(false);
            },
            forceFormData: true,
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <form onSubmit={handleSubmit} className="space-y-4 p-0.5">
                  <div>
                     <Label>{input.title}</Label>
                     <Input
                        required
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder={input.title_placeholder}
                        onChange={(e) => onHandleChange(e, setData)}
                     />
                     <InputError message={errors.title} />
                  </div>
                  <div>
                     <Label>{input.category_icon}</Label>
                     <Input
                        required
                        readOnly
                        type="text"
                        name="icon"
                        value={data.icon}
                        placeholder={input.icon_placeholder}
                        onClick={() => setOpenIcon(true)}
                     />
                     <InputError message={errors.icon} />

                     <Dialog open={openIcon} onOpenChange={setOpenIcon}>
                        <DialogContent className="p-0">
                           <ScrollArea className="max-h-[90vh] p-6">
                              <DialogHeader className="mb-6">
                                 <DialogTitle>{dashboard.icon_picker}</DialogTitle>
                              </DialogHeader>

                              <IconPicker
                                 onSelect={(icon) => {
                                    setData('icon', icon);
                                    setOpenIcon(false);
                                 }}
                              />
                           </ScrollArea>
                        </DialogContent>
                     </Dialog>
                  </div>
                  <div>
                     <Label>{input.category_status}</Label>
                     <Select value={data.status.toString()} onValueChange={(value) => setData('status', Number(value))}>
                        <SelectTrigger>
                           <SelectValue placeholder={input.status_placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="1">Active</SelectItem>
                           <SelectItem value="0">Inactive</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div>
                     <Label>{input.description}</Label>
                     <Textarea
                        name="description"
                        value={data.description}
                        placeholder={input.description_placeholder}
                        onChange={(e) => onHandleChange(e, setData)}
                     />
                     <InputError message={errors.description} />
                  </div>
                  <div>
                     <Label>{input.thumbnail}</Label>
                     
                     {/* Image Preview */}
                     {thumbnailPreview && (
                        <div className="relative mb-3 inline-block">
                           <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="h-32 w-32 rounded-lg border border-border object-cover shadow-sm"
                           />
                           <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => {
                                 setThumbnailPreview(null);
                                 setData('thumbnail', null);
                              }}
                           >
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     )}
                     
                     <Input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                              setData('thumbnail', file as any);
                              // Create preview URL
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                 setThumbnailPreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                           }
                        }}
                     />
                     <InputError message={errors.thumbnail} />
                  </div>

                  <DialogFooter className="flex justify-end space-x-2 pt-4">
                     <DialogClose asChild>
                        <Button type="button" variant="outline">
                           {button.close}
                        </Button>
                     </DialogClose>

                     <LoadingButton loading={processing}>{button.save_changes}</LoadingButton>
                  </DialogFooter>
               </form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default CategoryForm;
