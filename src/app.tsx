import { useState, useMemo } from 'react';
import { places as initialPlaces } from '@/data/places';
import { Place } from '@/types/place';
import PlaceCard from '@/components/place-card';
import PlaceDetailModal from '@/components/place-detail-modal';
import AddPlaceForm from '@/components/add-place-form';
import TouristTrails from '@/components/tourist-trails';
import FilterSidebar, { FilterOptions } from '@/components/filter-sidebar';
import SearchBar from '@/components/search-bar';
import { Baby, MapPin, Star, Heart, Plus, Mountain, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function App() {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'places' | 'trails'>('places');
  const [filters, setFilters] = useState<FilterOptions>({
    region: 'Všechny kraje',
    difficulty: 'všechny',
    strollerFriendly: null,
    hasPlayground: null,
    freeParking: null,
    maxDistance: 10
  });

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          place.name.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query) ||
          place.location.toLowerCase().includes(query) ||
          place.region.toLowerCase().includes(query) ||
          place.attractions.some(attraction => 
            attraction.name.toLowerCase().includes(query) ||
            attraction.type.toLowerCase().includes(query)
          );
        if (!matchesQuery) return false;
      }

      // Region filter
      if (filters.region !== 'Všechny kraje' && place.region !== filters.region) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'všechny' && place.accessibility.difficulty !== filters.difficulty) {
        return false;
      }

      // Stroller friendly filter
      if (filters.strollerFriendly === true && !place.accessibility.strollerFriendly) {
        return false;
      }

      // Playground filter
      if (filters.hasPlayground === true && !place.accessibility.playground) {
        return false;
      }

      // Free parking filter
      if (filters.freeParking === true && (!place.parking.available || !place.parking.free)) {
        return false;
      }

      // Max distance filter
      if (place.accessibility.distance > filters.maxDistance) {
        return false;
      }

      return true;
    });
  }, [places, searchQuery, filters]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      region: 'Všechny kraje',
      difficulty: 'všechny',
      strollerFriendly: null,
      hasPlayground: null,
      freeParking: null,
      maxDistance: 10
    });
    setSearchQuery('');
  };

  const handleAddPlace = (newPlaceData: Omit<Place, 'id' | 'rating' | 'reviews'>) => {
    const newPlace: Place = {
      ...newPlaceData,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0
    };
    setPlaces(prev => [newPlace, ...prev]);
  };

  const strollerFriendlyCount = places.filter(place => place.accessibility.strollerFriendly).length;
  const avgRating = places.length > 0 ? (places.reduce((sum, place) => sum + place.rating, 0) / places.length).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-2xl">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Kočárek</h1>
                <p className="text-sm text-gray-600">Výlety pro rodiny s kočárkem</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <Baby className="w-4 h-4" />
                  <span>{strollerFriendlyCount} míst pro kočárky</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Star className="w-4 h-4" />
                  <span>⌀ {avgRating} hodnocení</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <MapPin className="w-4 h-4" />
                  <span>{places.length} míst v ČR</span>
                </div>
              </div>
              <Button
                onClick={() => setIsAddFormOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Přidat místo
              </Button>
            </div>
          </div>
          
          <SearchBar onSearch={handleSearch} placeholder="Hledat místa, atrakce, kraje..." />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Objevujte Českou republiku s dětmi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Nejkrásnější místa pro
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              rodiny s kočárkem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Najděte perfektní destinace pro výlety s malými dětmi. Všechna místa jsou pečlivě vybrána 
            s ohledem na přístupnost pro kočárky, bezpečnost a atrakce pro nejmenší. Můžete také sdílet 
            svá oblíbená místa s ostatními rodiči!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Baby className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Kočárkově přístupné</h3>
            <p className="text-sm text-gray-600">Zpevněné cesty a bezbariérové přístupy</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Po celé ČR</h3>
            <p className="text-sm text-gray-600">Místa ve všech krajích České republiky</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎪</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Pro děti</h3>
            <p className="text-sm text-gray-600">Hřiště, zoo, aquaparky a další atrakce</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mountain className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Turistické trasy</h3>
            <p className="text-sm text-gray-600">Procházky a výlety po celé republice</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="container mx-auto px-4 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => setActiveTab('places')}
                variant={activeTab === 'places' ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${activeTab === 'places' ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                <MapPin className="w-4 h-4" />
                Místa a atrakce
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{places.length}</span>
              </Button>
              <Button
                onClick={() => setActiveTab('trails')}
                variant={activeTab === 'trails' ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${activeTab === 'trails' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              >
                <Mountain className="w-4 h-4" />
                Turistické trasy
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">20</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {activeTab === 'places' ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </aside>

            {/* Places Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchQuery ? `Výsledky pro "${searchQuery}"` : 'Všechna místa'}
                </h2>
                <p className="text-gray-600">
                  Nalezeno {filteredPlaces.length} míst
                </p>
              </div>

              {filteredPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Žádná místa nenalezena</h3>
                  <p className="text-gray-600 mb-6">Zkuste upravit filtry nebo hledaný výraz.</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleResetFilters}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Resetovat všechny filtry
                    </button>
                    <span className="text-gray-300">nebo</span>
                    <button
                      onClick={() => setIsAddFormOpen(true)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Přidat nové místo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onSelect={handlePlaceSelect}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <TouristTrails />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Baby className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">Kočárek</span>
            </div>
            <p className="text-sm">
              Výlety pro rodiny s kočárkem • Objevujte Českou republiku s dětmi
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{places.length} míst a atrakcí</span>
              </div>
              <div className="flex items-center gap-1">
                <Mountain className="w-3 h-3" />
                <span>20 turistických tras</span>
              </div>
              <div className="flex items-center gap-1">
                <Map className="w-3 h-3" />
                <span>Všechny kraje ČR</span>
              </div>
            </div>
            <p className="text-xs mt-2">
              © 2024 Kočárek App • Vytvořeno s láskou pro rodiče
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PlaceDetailModal
        place={selectedPlace}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <AddPlaceForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddPlace}
      />
    </div>
  );
}

export default App;