import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Place } from '@/types/place';
import { MapPin, Star, Clock, Car, Baby, Accessibility } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onSelect: (place: Place) => void;
}

export default function PlaceCard({ place, onSelect }: PlaceCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'snadné':
        return 'text-green-600 bg-green-100';
      case 'střední':
        return 'text-yellow-600 bg-yellow-100';
      case 'náročné':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPathTypeIcon = (pathType: string) => {
    switch (pathType) {
      case 'asfalt':
        return '🛣️';
      case 'dlaždice':
        return '🧱';
      case 'zpevněná cesta':
        return '🛤️';
      case 'přírodní stezka':
        return '🌿';
      default:
        return '🚶';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={place.images[0]}
          alt={place.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold">{place.rating}</span>
          <span className="text-xs text-gray-600">({place.reviews})</span>
        </div>
        {place.accessibility.strollerFriendly && (
          <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full p-2">
            <Baby className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-gray-800 group-hover:text-green-600 transition-colors">
          {place.name}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{place.location}, {place.region}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {place.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getPathTypeIcon(place.accessibility.pathType)}</span>
            <span className="text-xs text-gray-600 capitalize">
              {place.accessibility.pathType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {place.accessibility.duration} min
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {place.parking.available ? (place.parking.free ? 'Zdarma' : 'Placené') : 'Bez parkování'}
            </span>
          </div>
          {place.accessibility.wheelchairAccessible && (
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-600">Bezbariérové</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(place.accessibility.difficulty)}`}>
            {place.accessibility.difficulty}
          </span>
          <Button 
            onClick={() => onSelect(place)}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            Zobrazit detail
          </Button>
        </div>

        <div className="flex flex-wrap gap-1 pt-2">
          {place.attractions.slice(0, 3).map((attraction) => (
            <span
              key={attraction.id}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {attraction.name}
            </span>
          ))}
          {place.attractions.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{place.attractions.length - 3} dalších
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}