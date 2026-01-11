import { Chapter } from '@/types/audit';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertTriangle, Clock, BarChart3 } from 'lucide-react';

interface AuditStatsProps {
  chapters: Chapter[];
}

export function AuditStats({ chapters }: AuditStatsProps) {
  const allEngagements = chapters.flatMap((c) => c.engagements);
  const total = allEngagements.length;
  
  const stats = {
    ok: allEngagements.filter((e) => e.currentStatus === 'ok').length,
    ko: allEngagements.filter((e) => e.currentStatus === 'ko').length,
    ecart: allEngagements.filter((e) => e.currentStatus === 'ecart_majeur').length,
    pending: allEngagements.filter((e) => e.currentStatus === 'pending').length,
  };

  const completionRate = total > 0 
    ? Math.round(((total - stats.pending) / total) * 100) 
    : 0;

  const statCards = [
    { label: 'OK', value: stats.ok, icon: CheckCircle2, className: 'text-success' },
    { label: 'KO', value: stats.ko, icon: XCircle, className: 'text-destructive' },
    { label: 'Écarts majeurs', value: stats.ecart, icon: AlertTriangle, className: 'text-warning' },
    { label: 'En attente', value: stats.pending, icon: Clock, className: 'text-muted-foreground' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Icon className={`h-8 w-8 ${stat.className}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Card className="animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{completionRate}%</p>
              <p className="text-sm text-muted-foreground">Complété</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
