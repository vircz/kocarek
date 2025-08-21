export interface Place {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  accessibility: AccessibilityInfo;
  attractions: Attraction[];
  images: string[];
  rating: number;
  reviews: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  website?: string;
  phone?: string;
  openingHours?: string;
  parking: ParkingInfo;
}

export interface AccessibilityInfo {
  strollerFriendly: boolean;
  pathType: 'asfalt' | 'dlaždice' | 'zpevněná cesta' | 'přírodní stezka';
  difficulty: 'snadné' | 'střední' | 'náročné';
  distance: number; // km
  duration: number; // minutes
  elevation: number; // meters
  wheelchairAccessible: boolean;
  restrooms: boolean;
  playground: boolean;
}

export interface Attraction {
  id: string;
  name: string;
  type: 'hřiště' | 'zoo' | 'muzeum' | 'zámek' | 'aquapark' | 'park' | 'jiné';
  ageGroup: string;
  description: string;
  price?: string;
}

export interface ParkingInfo {
  available: boolean;
  free: boolean;
  spaces: number;
  surface: 'asfalt' | 'dlažba' | 'štěrk' | 'tráva';
  distance: number; // meters from main attraction
}