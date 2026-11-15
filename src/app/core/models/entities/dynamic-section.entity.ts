import { SectionType } from '../dtos/dynamic-section.dto';

export class DynamicSection {
  constructor(
    public readonly id: string,
    public readonly type: SectionType,
    public readonly order: number,
    public readonly enabled: boolean,
    public readonly titleKey?: string,
    public readonly subtitleKey?: string,
    public readonly customData?: Record<string, unknown>
  ) {}
}
