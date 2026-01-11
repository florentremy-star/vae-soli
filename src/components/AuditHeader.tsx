import { CSVImport } from './CSVImport';
import { Chapter } from '@/types/audit';
import { Button } from '@/components/ui/button';
import { Download, ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AuditHeaderProps {
  chapters: Chapter[];
  onImport: (chapters: Chapter[]) => void;
}

export function AuditHeader({ chapters, onImport }: AuditHeaderProps) {
  const handleExport = () => {
    if (chapters.length === 0) {
      toast.error('Aucune donnée à exporter');
      return;
    }

    const header = 'Chapitre;Engagement;Statut;Commentaire;Statut_N-1;Commentaire_N-1\n';
    const rows = chapters.flatMap((chapter) =>
      chapter.engagements.map((eng) =>
        [
          chapter.title,
          eng.title,
          eng.currentStatus,
          eng.currentComment.replace(/;/g, ','),
          eng.previousStatus || '',
          eng.previousComment?.replace(/;/g, ',') || '',
        ].join(';')
      )
    );

    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Audit exporté avec succès');
  };

  return (
    <header className="border-b bg-card">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardCheck className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Audit Manager</h1>
              <p className="text-muted-foreground">
                Gestion des plans de contrôle et audits
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CSVImport onImport={onImport} />
            {chapters.length > 0 && (
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
