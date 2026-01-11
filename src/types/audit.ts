export type AuditStatus = 'ok' | 'ko' | 'ecart_majeur' | 'pending';

export interface Engagement {
  id: string;
  chapterId: string;
  title: string;
  currentStatus: AuditStatus;
  currentComment: string;
  previousStatus: AuditStatus | null;
  previousComment: string | null;
}

export interface Chapter {
  id: string;
  title: string;
  engagements: Engagement[];
}

export interface AuditData {
  chapters: Chapter[];
}
