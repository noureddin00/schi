import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { CheckCircle, CheckSquare, FileText, Headphones, Link2, ListOrdered, Type } from 'lucide-react';

interface Props {
   type: ExamQuestionType;
   className?: string;
}

const QuestionTypeBadge = ({ type, className }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { dashboard } = translate;

   const questionTypeConfig: Record<
      ExamQuestionType,
      {
         label: string;
         icon: React.ComponentType<{ className?: string }>;
         color: string;
      }
   > = {
      multiple_choice: {
         label: dashboard.multiple_choice,
         icon: CheckCircle,
         color: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      },
      multiple_select: {
         label: dashboard.multiple_select,
         icon: CheckSquare,
         color: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      },
      matching: {
         label: dashboard.matching,
         icon: Link2,
         color: 'bg-green-100 text-green-800 hover:bg-green-100',
      },
      fill_blank: {
         label: dashboard.fill_blank,
         icon: Type,
         color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      },
      ordering: {
         label: dashboard.ordering,
         icon: ListOrdered,
         color: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
      },
      short_answer: {
         label: dashboard.short_answer,
         icon: FileText,
         color: 'bg-red-100 text-red-800 hover:bg-red-100',
      },
      listening: {
         label: dashboard.listening,
         icon: Headphones,
         color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
      },
   };


   const config = questionTypeConfig[type];
   const Icon = config.icon;

   return (
      <Badge variant="secondary" className={cn('gap-1.5', config.color, className)}>
         <Icon className="h-3 w-3" />
         <span className="text-xs font-medium">{config.label}</span>
      </Badge>
   );
};

export default QuestionTypeBadge;
