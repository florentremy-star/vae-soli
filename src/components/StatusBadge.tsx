import { AuditStatus } from '@/types/audit';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: AuditStatus | null;
  size?: 'sm' | 'md';
}

const statusConfig: Record<AuditStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  ok: { label: 'OK', className: 'status-ok', icon: CheckCircle2 },
  ko: { label: 'KO', className: 'status-ko', icon: XCircle },
  ecart_majeur: { label: 'Écart majeur', className: 'status-ecart', icon: AlertTriangle },
  pending: { label: 'En attente', className: 'status-pending', icon: Clock },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  if (!status) {
    return <span className="text-muted-foreground text-sm">—</span>;
  }

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </span>
  );
}
