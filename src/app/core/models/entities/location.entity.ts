export interface LocationArea {
  title: string;
  description: string;
  images: string[];
}

export interface MustSeeSpot {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export class LocationGuide {
  constructor(
    public readonly id: string,
    public readonly capistrano: LocationArea,
    public readonly nerja: LocationArea,
    public readonly mustSee: MustSeeSpot[]
  ) {}
}
