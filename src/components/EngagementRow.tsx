import { Engagement, AuditStatus } from '@/types/audit';
import { StatusSelect } from './StatusSelect';
import { StatusBadge } from './StatusBadge';
import { Textarea } from '@/components/ui/textarea';
import { TableCell, TableRow } from '@/components/ui/table';
import { History } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EngagementRowProps {
  engagement: Engagement;
  onStatusChange: (id: string, status: AuditStatus) => void;
  onCommentChange: (id: string, comment: string) => void;
}

export function EngagementRow({
  engagement,
  onStatusChange,
  onCommentChange,
}: EngagementRowProps) {
  return (
    <TableRow className="animate-fade-in">
      <TableCell className="font-medium max-w-[300px]">
        {engagement.title}
      </TableCell>
      <TableCell>
        <StatusSelect
          value={engagement.currentStatus}
          onChange={(status) => onStatusChange(engagement.id, status)}
        />
      </TableCell>
      <TableCell>
        <Textarea
          placeholder="Ajouter un commentaire..."
          value={engagement.currentComment}
          onChange={(e) => onCommentChange(engagement.id, e.target.value)}
          className="min-h-[60px] resize-none bg-card"
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <StatusBadge status={engagement.previousStatus} size="sm" />
          {engagement.previousComment && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <History className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] bg-popover">
                <p className="text-sm">{engagement.previousComment}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
