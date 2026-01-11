import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { Chapter, Engagement } from '@/types/audit';
import { toast } from 'sonner';

interface CSVImportProps {
  onImport: (chapters: Chapter[]) => void;
}

export function CSVImport({ onImport }: CSVImportProps) {
  const parseCSV = useCallback((content: string): Chapter[] => {
    const lines = content.split('\n').filter((line) => line.trim());
    
    if (lines.length < 2) {
      throw new Error('Le fichier CSV doit contenir au moins un en-tête et une ligne de données');
    }

    const chaptersMap = new Map<string, Chapter>();
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';').map((v) => v.trim().replace(/^"|"$/g, ''));
      
      if (values.length < 2) continue;

      const [chapterTitle, engagementTitle, previousStatus, previousComment] = values;

      if (!chaptersMap.has(chapterTitle)) {
        chaptersMap.set(chapterTitle, {
          id: `chapter-${chaptersMap.size + 1}`,
          title: chapterTitle,
          engagements: [],
        });
      }

      const chapter = chaptersMap.get(chapterTitle)!;
      const engagement: Engagement = {
        id: `eng-${i}`,
        chapterId: chapter.id,
        title: engagementTitle,
        currentStatus: 'pending',
        currentComment: '',
        previousStatus: previousStatus === 'ok' || previousStatus === 'ko' || previousStatus === 'ecart_majeur' 
          ? previousStatus 
          : null,
        previousComment: previousComment || null,
      };

      chapter.engagements.push(engagement);
    }

    return Array.from(chaptersMap.values());
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const chapters = parseCSV(content);
          onImport(chapters);
          toast.success(`${chapters.length} chapitres importés avec succès`);
        } catch (error) {
          toast.error('Erreur lors de l\'import du fichier CSV');
          console.error(error);
        }
      };
      reader.readAsText(file);
      
      // Reset input
      event.target.value = '';
    },
    [onImport, parseCSV]
  );

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        id="csv-upload"
      />
      <label htmlFor="csv-upload">
        <Button asChild variant="default" className="cursor-pointer">
          <span>
            <Upload className="mr-2 h-4 w-4" />
            Importer CSV
          </span>
        </Button>
      </label>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileSpreadsheet className="h-4 w-4" />
        <span>Format: Chapitre;Engagement;Statut_N-1;Commentaire_N-1</span>
      </div>
    </div>
  );
}
