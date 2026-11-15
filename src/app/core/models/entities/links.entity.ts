export type LinkCategory = 'tourism' | 'flights' | 'carRental' | 'transports';

export interface UsefulLink {
  id: string;
  name: string;
  category: LinkCategory;
  url: string;
  note: string;
  iconName: string;
}

export interface RestaurantGuide {
  title: string;
  pdfUrl: string;
  date: string;
  coverImage: string;
}

export class LinksDirectory {
  constructor(
    public readonly id: string,
    public readonly links: UsefulLink[],
    public readonly restaurantGuide: RestaurantGuide
  ) {}

  getLinksByCategory(category: LinkCategory): UsefulLink[] {
    return this.links.filter(l => l.category === category);
  }
}
