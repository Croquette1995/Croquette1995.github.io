export interface UsefulLinkDto {
  id: string;
  name: string;
  category: 'tourism' | 'flights' | 'carRental' | 'transports';
  url: string;
  note: string;
}

export interface RestaurantGuideDto {
  title: string;
  pdfUrl: string;
  date: string;
  coverImage: string;
}

export interface LinksDto {
  id: string;
  usefulLinks: UsefulLinkDto[];
  restaurantGuide: RestaurantGuideDto;
}
