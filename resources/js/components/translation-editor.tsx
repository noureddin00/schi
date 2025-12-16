import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages } from 'lucide-react';

interface Language {
   code: string;
   name?: string;
   nativeName?: string;
   native_name?: string;
   flag: string;
   rtl?: boolean;
   is_default?: boolean;
}

interface TranslationField {
   name: string;
   label: string;
   type: 'text' | 'textarea' | 'richtext';
   placeholder?: string;
}

interface TranslationEditorProps {
   languages: Language[];
   fields: TranslationField[];
   translations?: Record<string, Record<string, string>>;
   onChange?: (translations: Record<string, Record<string, string>>) => void;
   className?: string;
   translate?: any;
}

export function TranslationEditor({
   languages,
   fields,
   translations = {},
   onChange,
   className = '',
   translate,
}: TranslationEditorProps) {
   const [formData, setFormData] = useState<Record<string, Record<string, string>>>(translations);
   
   const t = translate?.dashboard || {};
   const noLanguagesText = translate?.settings?.no_additional_languages || 'No additional languages configured. Add languages from Settings → Languages.';
   const translationsText = t.translations || 'Translations';
   const contentTranslationsText = t.content_translations || 'Content Translations';
   const translateDescText = t.translate_your_content || 'Translate content for each language. Leave empty to use the default content.';
   const translatingToText = t.translating_to || 'الترجمة إلى';

   const handleChange = (locale: string, field: string, value: string) => {
      const updated = {
         ...formData,
         [locale]: {
            ...(formData[locale] || {}),
            [field]: value,
         },
      };
      setFormData(updated);
      onChange?.(updated);
   };

   if (languages.length === 0) {
      return (
         <Card className={className}>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  {translationsText}
               </CardTitle>
               <CardDescription>
                  {noLanguagesText}
               </CardDescription>
            </CardHeader>
         </Card>
      );
   }

   return (
      <div className={className}>
         <div className="mb-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
               <Languages className="h-4 w-4" />
               {contentTranslationsText}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
               {translateDescText}
            </p>
         </div>
         <Tabs defaultValue={languages[0]?.code} className="w-full">
               <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${languages.length}, minmax(0, 1fr))` }}>
                  {languages.map(lang => {
                     const displayName = lang.nativeName || lang.native_name || lang.name || lang.code;
                     return (
                        <TabsTrigger
                           key={lang.code}
                           value={lang.code}
                           className="flex items-center gap-2 text-xs sm:text-sm"
                        >
                           <span className="text-lg">{lang.flag}</span>
                           <span className="hidden sm:inline">{displayName}</span>
                           <span className="sm:hidden">{lang.code.toUpperCase()}</span>
                        </TabsTrigger>
                     );
                  })}
               </TabsList>

               {languages.map(lang => {
                  const displayName = lang.nativeName || lang.native_name || lang.name || lang.code;
                  return (
                     <TabsContent key={lang.code} value={lang.code} className="space-y-3 mt-3">
                        <div className="rounded-md bg-muted/50 p-2 mb-3">
                           <p className="text-xs text-muted-foreground">
                              {translatingToText}: <span className="font-semibold text-foreground">{displayName}</span>
                           </p>
                        </div>

                        {fields.map(field => {
                           const labelText = field.label || field.name;
                           // Use custom placeholder if provided, otherwise generate one
                           const placeholderText = field.placeholder || (labelText && displayName ? `أدخل ${labelText} بـ${displayName}` : '');
                           
                           return (
                              <div key={field.name} className="space-y-1.5">
                                 <Label htmlFor={`${lang.code}-${field.name}`} className="text-sm">
                                    {labelText}
                                 </Label>
                                 {field.type === 'textarea' ? (
                                    <Textarea
                                       id={`${lang.code}-${field.name}`}
                                       value={formData[lang.code]?.[field.name] || ''}
                                       onChange={(e) => handleChange(lang.code, field.name, e.target.value)}
                                       placeholder={placeholderText}
                                       rows={3}
                                       className="w-full resize-y text-sm"
                                       dir={lang.rtl ? 'rtl' : 'ltr'}
                                    />
                                 ) : (
                                    <Input
                                       id={`${lang.code}-${field.name}`}
                                       type="text"
                                       value={formData[lang.code]?.[field.name] || ''}
                                       onChange={(e) => handleChange(lang.code, field.name, e.target.value)}
                                       placeholder={placeholderText}
                                       className="w-full text-sm"
                                       dir={lang.rtl ? 'rtl' : 'ltr'}
                                    />
                                 )}
                              </div>
                           );
                        })}
                     </TabsContent>
                  );
               })}
            </Tabs>
      </div>
   );
}
