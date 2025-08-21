import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Place, AccessibilityInfo, Attraction, ParkingInfo } from '@/types/place';
import { X, Plus, Minus, Save, MapPin, Baby, Car, Phone, Globe } from 'lucide-react';

interface AddPlaceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (place: Omit<Place, 'id' | 'rating' | 'reviews'>) => void;
}

const regions = [
  'Praha',
  'Středočeský kraj',
  'Jihočeský kraj',
  'Plzeňský kraj',
  'Karlovarský kraj',
  'Ústecký kraj',
  'Liberecký kraj',
  'Královéhradecký kraj',
  'Pardubický kraj',
  'Vysočina',
  'Jihomoravský kraj',
  'Olomoucký kraj',
  'Zlínský kraj',
  'Moravskoslezský kraj'
];

const attractionTypes = ['hřiště', 'zoo', 'muzeum', 'zámek', 'aquapark', 'park', 'jiné'] as const;

export default function AddPlaceForm({ isOpen, onClose, onSubmit }: AddPlaceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    region: regions[0],
    website: '',
    phone: '',
    openingHours: '',
    images: [''],
    coordinates: { lat: 0, lng: 0 }
  });

  const [accessibility, setAccessibility] = useState<AccessibilityInfo>({
    strollerFriendly: true,
    pathType: 'asfalt' as const,
    difficulty: 'snadné' as const,
    distance: 1,
    duration: 30,
    elevation: 0,
    wheelchairAccessible: true,
    restrooms: false,
    playground: false
  });

  const [parking, setParking] = useState<ParkingInfo>({
    available: true,
    free: true,
    spaces: 20,
    surface: 'asfalt' as const,
    distance: 100
  });

  const [attractions, setAttractions] = useState<Omit<Attraction, 'id'>[]>([{
    name: '',
    type: 'park' as const,
    ageGroup: 'všechny věky',
    description: '',
    price: ''
  }]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPlace: Omit<Place, 'id' | 'rating' | 'reviews'> = {
      ...formData,
      accessibility,
      parking,
      attractions: attractions.map((attr, index) => ({
        ...attr,
        id: `${Date.now()}-${index}`
      }))
    };
    
    onSubmit(newPlace);
    onClose();
  };

  const addAttraction = () => {
    setAttractions([...attractions, {
      name: '',
      type: 'park',
      ageGroup: 'všechny věky',
      description: '',
      price: ''
    }]);
  };

  const removeAttraction = (index: number) => {
    if (attractions.length > 1) {
      setAttractions(attractions.filter((_, i) => i !== index));
    }
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b rounded-t-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Přidat nové místo</h2>
              <p className="text-gray-600">Sdílej své oblíbené destinace s ostatními rodiči</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Základní informace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Název místa *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Např. Zoo Praha, Petřín, Aquapark..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Lokalita *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Např. Praha 1, Liberec, Brno-Kohoutovice..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Kraj *</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Popis *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Popište místo - co je tam k vidění, co je zajímavé pro rodiny s kočárkem..."
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Web</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://..."
                      className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+420 123 456 789"
                      className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Otevírací doba</label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, openingHours: e.target.value }))}
                    placeholder="Např. 9:00 - 18:00"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Fotografie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index] = e.target.value;
                      setFormData(prev => ({ ...prev, images: newImages }));
                    }}
                    placeholder="URL obrázku (např. z Unsplash)"
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Button
                    type="button"
                    onClick={() => removeImageField(index)}
                    variant="outline"
                    size="icon"
                    disabled={formData.images.length === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addImageField} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Přidat další fotku
              </Button>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-green-600" />
                Přístupnost s kočárkem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Typ cesty</label>
                  <select
                    value={accessibility.pathType}
                    onChange={(e) => setAccessibility(prev => ({ ...prev, pathType: e.target.value as any }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="asfalt">Asfalt</option>
                    <option value="dlaždice">Dlaždice</option>
                    <option value="zpevněná cesta">Zpevněná cesta</option>
                    <option value="přírodní stezka">Přírodní stezka</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Obtížnost</label>
                  <select
                    value={accessibility.difficulty}
                    onChange={(e) => setAccessibility(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="snadné">Snadné</option>
                    <option value="střední">Střední</option>
                    <option value="náročné">Náročné</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Vzdálenost (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={accessibility.distance}
                    onChange={(e) => setAccessibility(prev => ({ ...prev, distance: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Doba (minuty)</label>
                  <input
                    type="number"
                    min="0"
                    value={accessibility.duration}
                    onChange={(e) => setAccessibility(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Převýšení (m)</label>
                  <input
                    type="number"
                    min="0"
                    value={accessibility.elevation}
                    onChange={(e) => setAccessibility(prev => ({ ...prev, elevation: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="strollerFriendly"
                      checked={accessibility.strollerFriendly}
                      onChange={(e) => setAccessibility(prev => ({ ...prev, strollerFriendly: e.target.checked }))}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="strollerFriendly" className="ml-2 text-sm">Vhodné pro kočárek</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="wheelchairAccessible"
                      checked={accessibility.wheelchairAccessible}
                      onChange={(e) => setAccessibility(prev => ({ ...prev, wheelchairAccessible: e.target.checked }))}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="wheelchairAccessible" className="ml-2 text-sm">Bezbariérové</label>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="restrooms"
                      checked={accessibility.restrooms}
                      onChange={(e) => setAccessibility(prev => ({ ...prev, restrooms: e.target.checked }))}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="restrooms" className="ml-2 text-sm">WC k dispozici</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="playground"
                      checked={accessibility.playground}
                      onChange={(e) => setAccessibility(prev => ({ ...prev, playground: e.target.checked }))}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="playground" className="ml-2 text-sm">Dětské hřiště</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                Parkování
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="parkingAvailable"
                  checked={parking.available}
                  onChange={(e) => setParking(prev => ({ ...prev, available: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="parkingAvailable" className="ml-2 text-sm font-medium">Parkování k dispozici</label>
              </div>

              {parking.available && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="freeParking"
                        checked={parking.free}
                        onChange={(e) => setParking(prev => ({ ...prev, free: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="freeParking" className="ml-2 text-sm">Parkování zdarma</label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Povrch</label>
                      <select
                        value={parking.surface}
                        onChange={(e) => setParking(prev => ({ ...prev, surface: e.target.value as any }))}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="asfalt">Asfalt</option>
                        <option value="dlažba">Dlažba</option>
                        <option value="štěrk">Štěrk</option>
                        <option value="tráva">Tráva</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Počet míst</label>
                      <input
                        type="number"
                        min="0"
                        value={parking.spaces}
                        onChange={(e) => setParking(prev => ({ ...prev, spaces: parseInt(e.target.value) || 0 }))}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Vzdálenost od atrakce (m)</label>
                      <input
                        type="number"
                        min="0"
                        value={parking.distance}
                        onChange={(e) => setParking(prev => ({ ...prev, distance: parseInt(e.target.value) || 0 }))}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Attractions */}
          <Card>
            <CardHeader>
              <CardTitle>Atrakce pro děti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {attractions.map((attraction, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Atrakce #{index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeAttraction(index)}
                      variant="ghost"
                      size="icon"
                      disabled={attractions.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Název</label>
                      <input
                        type="text"
                        value={attraction.name}
                        onChange={(e) => {
                          const newAttractions = [...attractions];
                          newAttractions[index].name = e.target.value;
                          setAttractions(newAttractions);
                        }}
                        placeholder="Název atrakce"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Typ</label>
                      <select
                        value={attraction.type}
                        onChange={(e) => {
                          const newAttractions = [...attractions];
                          newAttractions[index].type = e.target.value as any;
                          setAttractions(newAttractions);
                        }}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {attractionTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Věková skupina</label>
                      <input
                        type="text"
                        value={attraction.ageGroup}
                        onChange={(e) => {
                          const newAttractions = [...attractions];
                          newAttractions[index].ageGroup = e.target.value;
                          setAttractions(newAttractions);
                        }}
                        placeholder="Např. 2-10 let"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cena (volitelné)</label>
                      <input
                        type="text"
                        value={attraction.price}
                        onChange={(e) => {
                          const newAttractions = [...attractions];
                          newAttractions[index].price = e.target.value;
                          setAttractions(newAttractions);
                        }}
                        placeholder="Např. 120 Kč"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Popis</label>
                    <textarea
                      value={attraction.description}
                      onChange={(e) => {
                        const newAttractions = [...attractions];
                        newAttractions[index].description = e.target.value;
                        setAttractions(newAttractions);
                      }}
                      placeholder="Popis atrakce..."
                      rows={2}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
              
              <Button type="button" onClick={addAttraction} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Přidat atrakci
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" onClick={onClose} variant="outline">
              Zrušit
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Uložit místo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}