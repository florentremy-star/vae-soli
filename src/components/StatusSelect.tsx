import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AuditStatus } from '@/types/audit';
import { CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface StatusSelectProps {
  value: AuditStatus;
  onChange: (value: AuditStatus) => void;
}

const statusOptions: { value: AuditStatus; label: string; icon: typeof CheckCircle2 }[] = [
  { value: 'pending', label: 'En attente', icon: Clock },
  { value: 'ok', label: 'OK', icon: CheckCircle2 },
  { value: 'ko', label: 'KO', icon: XCircle },
  { value: 'ecart_majeur', label: 'Écart majeur', icon: AlertTriangle },
];

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-popover z-50">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          return (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {option.label}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
