export type SectionType = 
  | 'hero' 
  | 'apartment-tour' 
  | 'gallery' 
  | 'pricing-booking' 
  | 'situation-guide' 
  | 'useful-links' 
  | 'contact';

export interface DynamicSectionDto {
  id: string;
  type: SectionType;
  order: number;
  enabled: boolean;
  titleKey?: string;
  subtitleKey?: string;
  customData?: Record<string, unknown>;
}
