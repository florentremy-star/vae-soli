import { FileSpreadsheet, Upload } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="p-4 rounded-full bg-primary/10 mb-6">
        <FileSpreadsheet className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Aucun plan de contrôle</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Importez un fichier CSV contenant vos chapitres et engagements pour commencer l'audit.
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
        <Upload className="h-4 w-4" />
        <span>Format CSV : Chapitre;Engagement;Statut_N-1;Commentaire_N-1</span>
      </div>
    </div>
  );
}
