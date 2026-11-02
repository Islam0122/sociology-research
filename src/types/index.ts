import type { LucideIcon } from 'lucide-react';

/** Identifiers of every anchor section on the page. */
export type SectionId =
  | 'intro'
  | 'overview'
  | 'contents'
  | 'chapter-1'
  | 'chapter-2'
  | 'chapter-3'
  | 'chapter-4'
  | 'solutions'
  | 'survey'
  | 'conclusion'
  | 'references';

export interface NavItem {
  label: string;
  target: SectionId;
  /** Sections that keep this nav item highlighted while in view. */
  covers: SectionId[];
}

export interface ChapterMeta {
  number: string;
  title: string;
  summary: string;
  target: SectionId;
}

export interface ImageAsset {
  /** Ordered list of sources — the next one is tried if the previous fails. */
  sources: string[];
  alt: string;
  credit: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface SocialFunction {
  title: string;
  description: string;
  example: string;
  icon: LucideIcon;
}

export interface PlatformExample {
  name: string;
  format: string;
  role: string;
}

export interface ImpactTopic {
  id: string;
  title: string;
  lead: string;
  points: string[];
  example: string;
  icon: LucideIcon;
}

export interface NegativeTopic {
  id: string;
  title: string;
  causes: string;
  consequences: string;
  example: string;
  icon: LucideIcon;
}

export interface Recommendation {
  number: string;
  title: string;
  description: string;
  practice: string;
  icon: LucideIcon;
}

export type ReferenceKind = 'book' | 'article' | 'report' | 'textbook';

export interface Reference {
  id: number;
  kind: ReferenceKind;
  /** Bibliographic entry, formatted following ГОСТ-like conventions. */
  citation: string;
  note?: string;
}

/* ---------------- Survey ---------------- */

export type QuestionId = 'hours' | 'platform' | 'mood' | 'learning';

export interface SurveyOption {
  id: string;
  label: string;
}

export interface SurveyQuestion {
  id: QuestionId;
  number: number;
  text: string;
  shortLabel: string;
  options: SurveyOption[];
}

export type SurveyAnswers = Record<QuestionId, string>;

export interface SurveyResponse {
  id: string;
  createdAt: string;
  answers: SurveyAnswers;
}

/** Aggregated counts: question → option → count. */
export type SurveyCounts = Record<QuestionId, Record<string, number>>;

export interface PublishedSurvey {
  title: string;
  conductedAt: string;
  sampleDescription: string;
  totalRespondents: number;
  counts: SurveyCounts;
}

export interface DistributionRow {
  optionId: string;
  label: string;
  count: number;
  percent: number;
}

/* ---------------- Presentation ---------------- */

export interface Slide {
  id: string;
  kicker: string;
  title: string;
  notes: string;
}
