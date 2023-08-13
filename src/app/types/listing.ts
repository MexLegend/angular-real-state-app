import { SafeUser } from './index';

export type Location = {
  coordinates?: number[];
  country?: string;
  region?: string;
  place?: string;
  postCode?: number;
  address?: string;
  placeName?: string;
};

export interface SafeLocation extends Location {
  listingId: string;
  id: string;
}

export type ListingImage = {
  url: string;
  public_id: string;
};

export type Listing = {
  amenities: string[];
  categories: string[];
  createdAt: string;
  description: string;
  features: {
    bathroomCount: number;
    propertyArea: number;
    roomCount: number;
  };
  id: string;
  images: ListingImage[];
  location: Location;
  price: string;
  rating: number;
  title: string;
  user: SafeUser;
};
