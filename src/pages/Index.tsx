import { useState, useCallback } from 'react';
import { Chapter, AuditStatus } from '@/types/audit';
import { AuditHeader } from '@/components/AuditHeader';
import { AuditStats } from '@/components/AuditStats';
import { ChapterCard } from '@/components/ChapterCard';
import { EmptyState } from '@/components/EmptyState';

// Sample data for demo
const sampleData: Chapter[] = [
  {
    id: 'ch-1',
    title: 'Sécurité des données',
    engagements: [
      {
        id: 'eng-1',
        chapterId: 'ch-1',
        title: 'Chiffrement des données sensibles',
        currentStatus: 'pending',
        currentComment: '',
        previousStatus: 'ok',
        previousComment: 'Conforme aux exigences RGPD',
      },
      {
        id: 'eng-2',
        chapterId: 'ch-1',
        title: 'Politique de mots de passe',
        currentStatus: 'pending',
        currentComment: '',
        previousStatus: 'ko',
        previousComment: 'Complexité insuffisante',
      },
    ],
  },
  {
    id: 'ch-2',
    title: 'Conformité réglementaire',
    engagements: [
      {
        id: 'eng-3',
        chapterId: 'ch-2',
        title: 'Documentation RGPD à jour',
        currentStatus: 'pending',
        currentComment: '',
        previousStatus: 'ok',
        previousComment: 'Tous les registres sont à jour',
      },
      {
        id: 'eng-4',
        chapterId: 'ch-2',
        title: 'Consentements utilisateurs',
        currentStatus: 'pending',
        currentComment: '',
        previousStatus: 'ecart_majeur',
        previousComment: 'Absence de preuve de consentement pour certains utilisateurs',
      },
    ],
  },
];

export default function Index() {
  const [chapters, setChapters] = useState<Chapter[]>(sampleData);

  const handleImport = useCallback((importedChapters: Chapter[]) => {
    setChapters(importedChapters);
  }, []);

  const handleStatusChange = useCallback((engagementId: string, status: AuditStatus) => {
    setChapters((prev) =>
      prev.map((chapter) => ({
        ...chapter,
        engagements: chapter.engagements.map((eng) =>
          eng.id === engagementId ? { ...eng, currentStatus: status } : eng
        ),
      }))
    );
  }, []);

  const handleCommentChange = useCallback((engagementId: string, comment: string) => {
    setChapters((prev) =>
      prev.map((chapter) => ({
        ...chapter,
        engagements: chapter.engagements.map((eng) =>
          eng.id === engagementId ? { ...eng, currentComment: comment } : eng
        ),
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AuditHeader chapters={chapters} onImport={handleImport} />
      
      <main className="container py-8 space-y-8">
        {chapters.length > 0 ? (
          <>
            <AuditStats chapters={chapters} />
            
            <div className="space-y-6">
              {chapters.map((chapter) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  onStatusChange={handleStatusChange}
                  onCommentChange={handleCommentChange}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
