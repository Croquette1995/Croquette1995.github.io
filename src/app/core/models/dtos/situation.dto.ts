export interface LocationAreaDto {
  title: string;
  description: string;
  images: string[];
}

export interface MustSeeSpotDto {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface SituationDto {
  id: string;
  capistrano: LocationAreaDto;
  nerja: LocationAreaDto;
  mustSee: MustSeeSpotDto[];
}
