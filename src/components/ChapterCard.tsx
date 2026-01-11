import { Chapter, AuditStatus } from '@/types/audit';
import { EngagementRow } from './EngagementRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';

interface ChapterCardProps {
  chapter: Chapter;
  onStatusChange: (id: string, status: AuditStatus) => void;
  onCommentChange: (id: string, comment: string) => void;
}

export function ChapterCard({
  chapter,
  onStatusChange,
  onCommentChange,
}: ChapterCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const stats = {
    ok: chapter.engagements.filter((e) => e.currentStatus === 'ok').length,
    ko: chapter.engagements.filter((e) => e.currentStatus === 'ko').length,
    ecart: chapter.engagements.filter((e) => e.currentStatus === 'ecart_majeur').length,
    pending: chapter.engagements.filter((e) => e.currentStatus === 'pending').length,
  };

  return (
    <Card className="animate-fade-in overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{chapter.title}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  ({chapter.engagements.length} engagements)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  {stats.ok > 0 && <StatusBadge status="ok" size="sm" />}
                  {stats.ko > 0 && <StatusBadge status="ko" size="sm" />}
                  {stats.ecart > 0 && <StatusBadge status="ecart_majeur" size="sm" />}
                  {stats.pending > 0 && (
                    <span className="text-muted-foreground">
                      {stats.pending} en attente
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Engagement</TableHead>
                  <TableHead className="w-[200px]">Constat</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead className="w-[180px]">Année précédente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chapter.engagements.map((engagement) => (
                  <EngagementRow
                    key={engagement.id}
                    engagement={engagement}
                    onStatusChange={onStatusChange}
                    onCommentChange={onCommentChange}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
