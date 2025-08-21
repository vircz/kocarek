import { Place } from '@/types/place';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Star, 
  Clock, 
  Car, 
  Phone, 
  Globe, 
  Baby, 
  Accessibility,
  MapIcon,
  Mountain,
  Route,
  X,
  Utensils,
  Gamepad2
} from 'lucide-react';

interface PlaceDetailModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlaceDetailModal({ place, isOpen, onClose }: PlaceDetailModalProps) {
  if (!isOpen || !place) return null;

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

  const getAttractionIcon = (type: string) => {
    switch (type) {
      case 'hřiště': return '🎪';
      case 'zoo': return '🦁';
      case 'muzeum': return '🏛️';
      case 'zámek': return '🏰';
      case 'aquapark': return '🏊';
      case 'park': return '🌳';
      default: return '🎯';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{place.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span>{place.location}, {place.region}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{place.rating}</span>
                  <span className="text-gray-600">({place.reviews} hodnocení)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{place.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Accessibility Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="w-5 h-5 text-green-600" />
                  Přístupnost s kočárkem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Vhodnost pro kočárek</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      place.accessibility.strollerFriendly 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {place.accessibility.strollerFriendly ? '✅ Vhodné' : '❌ Nevhodné'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Obtížnost</div>
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(place.accessibility.difficulty)}`}>
                      {place.accessibility.difficulty}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{place.accessibility.distance} km</div>
                      <div className="text-xs text-gray-600">Vzdálenost trasy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{place.accessibility.duration} min</div>
                      <div className="text-xs text-gray-600">Doba procházky</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{place.accessibility.elevation} m</div>
                      <div className="text-xs text-gray-600">Převýšení</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium capitalize">{place.accessibility.pathType}</div>
                      <div className="text-xs text-gray-600">Typ cesty</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {place.accessibility.wheelchairAccessible && (
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      <Accessibility className="w-3 h-3" />
                      Bezbariérové
                    </div>
                  )}
                  {place.accessibility.restrooms && (
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      🚻 WC
                    </div>
                  )}
                  {place.accessibility.playground && (
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      🎪 Hřiště
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Practical Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Praktické informace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Parking */}
                <div>
                  <div className="text-sm font-medium mb-2">Parkování</div>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Dostupnost:</span>
                      <span className={`text-sm font-medium ${
                        place.parking.available ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {place.parking.available ? 'Ano' : 'Ne'}
                      </span>
                    </div>
                    {place.parking.available && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cena:</span>
                          <span className="text-sm font-medium">
                            {place.parking.free ? 'Zdarma' : 'Placené'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Místa:</span>
                          <span className="text-sm font-medium">{place.parking.spaces}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Vzdálenost:</span>
                          <span className="text-sm font-medium">{place.parking.distance} m</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  {place.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${place.phone}`} className="text-sm text-blue-600 hover:underline">
                        {place.phone}
                      </a>
                    </div>
                  )}
                  {place.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={place.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Oficiální web
                      </a>
                    </div>
                  )}
                  {place.openingHours && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{place.openingHours}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attractions */}
          {place.attractions.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-purple-600" />
                  Atrakce pro děti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {place.attractions.map((attraction) => (
                    <div key={attraction.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getAttractionIcon(attraction.type)}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">{attraction.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {attraction.ageGroup}
                            </span>
                            {attraction.price && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {attraction.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Images */}
          {place.images.length > 1 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Další fotky</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {place.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${place.name} - fotka ${index + 2}`}
                    className="rounded-lg object-cover h-32 w-full hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}