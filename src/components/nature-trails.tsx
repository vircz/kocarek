import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Mountain, Route, Camera, Heart, MessageCircle, ExternalLink, Map } from 'lucide-react';
import { Place } from '@/types/place';

interface Trail {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  type: 'zámek' | 'hrad' | 'skalní město' | 'národní park' | 'rozhledna' | 'jeskyně';
  rating: number;
  userRatings: number;
  images: string[];
  difficulty: 'snadné' | 'střední' | 'náročné';
  distance: number;
  duration: number;
  strollerFriendly: boolean;
  highlights: string[];
  reviews: TrailReview[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface TrailReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

const natureTrails: Trail[] = [
  {
    id: 'trail-1',
    name: 'Kolem hradu Karlštejna',
    description: 'Krásná procházka kolem nejslavnějšího českého hradu s nádherným výhledem na krajinu. Trasa je částečně upravena pro kočárky.',
    location: 'Karlštejn',
    region: 'Středočeský kraj',
    type: 'hrad',
    rating: 4.6,
    userRatings: 134,
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73400?w=800',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
    ],
    difficulty: 'střední',
    distance: 2.8,
    duration: 90,
    strollerFriendly: true,
    highlights: ['Výhled na hrad', 'Výukové panely', 'Restaurace v blízkosti'],
    coordinates: {
      lat: 49.9393,
      lng: 14.1878
    },
    reviews: [
      {
        id: 'r1',
        userName: 'Petra K.',
        rating: 5,
        comment: 'Úžasná procházka s dětmi! Hrad je kouzelný a trasa dobře udržovaná.',
        date: '2024-03-15'
      },
      {
        id: 'r2', 
        userName: 'Martin V.',
        rating: 4,
        comment: 'S kočárkem to šlo, ale některé úseky jsou trochu náročnější. Výhledy stojí za to!',
        date: '2024-03-10'
      }
    ]
  },
  {
    id: 'trail-2',
    name: 'Adršpašsko-teplické skály',
    description: 'Jedinečné skalní město s upravenými cestami. Zážitek pro celou rodinu v nádherném přírodním prostředí.',
    location: 'Adršpach',
    region: 'Královéhradecký kraj',
    type: 'skalní město',
    rating: 4.8,
    userRatings: 89,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'snadné',
    distance: 1.5,
    duration: 60,
    strollerFriendly: true,
    highlights: ['Skalní útvary', 'Jeskyně', 'Upravené chodníky', 'Občerstvení'],
    coordinates: {
      lat: 50.6131,
      lng: 16.1100
    },
    reviews: [
      {
        id: 'r3',
        userName: 'Lucie M.',
        rating: 5,
        comment: 'Neuvěřitelné! Děti byly nadšené ze skal. Perfektně upraveno pro kočárky.',
        date: '2024-03-20'
      }
    ]
  },
  {
    id: 'trail-3',
    name: 'Zámek Lednice a park',
    description: 'UNESCO památka s nádherným anglickým parkem. Ideální pro rodinné procházky po rovných cestách.',
    location: 'Lednice',
    region: 'Jihomoravský kraj',
    type: 'zámek',
    rating: 4.7,
    userRatings: 156,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 3.2,
    duration: 120,
    strollerFriendly: true,
    highlights: ['Zámecký park', 'Skleníky', 'Lodičky', 'Dětské hřiště'],
    coordinates: {
      lat: 48.8003,
      lng: 16.8061
    },
    reviews: [
      {
        id: 'r4',
        userName: 'Tomáš H.',
        rating: 5,
        comment: 'Úžasný den s rodinou. Park je obrovský a perfektně udržovaný.',
        date: '2024-03-18'
      }
    ]
  },
  {
    id: 'trail-4',
    name: 'Český ráj - Hrubá Skála',
    description: 'Skalní město s vyhlášenými výhledy a upravenými cestami pro rodiny. Místo plné přírodních krás.',
    location: 'Hrubá Skála',
    region: 'Liberecký kraj',
    type: 'skalní město',
    rating: 4.5,
    userRatings: 67,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    difficulty: 'střední',
    distance: 2.1,
    duration: 75,
    strollerFriendly: true,
    highlights: ['Vyhlídky na skály', 'Zámek Hrubá Skála', 'Přírodní rezervace'],
    coordinates: {
      lat: 50.5422,
      lng: 15.1847
    },
    reviews: [
      {
        id: 'r5',
        userName: 'Jana S.',
        rating: 4,
        comment: 'Krásné místo, ale s kočárkem to chce trochu kondice. Výhledy jsou ale úžasné!',
        date: '2024-03-22'
      }
    ]
  },
  {
    id: 'trail-5',
    name: 'Hrad Křivoklát a okolí',
    description: 'Gotický hrad obklopený hustými lesy Křivoklátska. Příjemná procházka s možností návštěvy hradu.',
    location: 'Křivoklát',
    region: 'Středočeský kraj',
    type: 'hrad',
    rating: 4.4,
    userRatings: 98,
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73400?w=800',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
    ],
    difficulty: 'střední',
    distance: 1.8,
    duration: 60,
    strollerFriendly: false,
    highlights: ['Gotický hrad', 'Výhled do údolí', 'Lesní stezka'],
    coordinates: {
      lat: 50.0358,
      lng: 13.8719
    },
    reviews: [
      {
        id: 'r6',
        userName: 'Pavel N.',
        rating: 4,
        comment: 'Hezká procházka, ale s kočárkem to není ideální kvůli nerovnému terénu.',
        date: '2024-03-25'
      }
    ]
  }
];

interface NatureTrailsProps {
  onAddToFavorites?: (trail: Trail) => void;
}

export default function NatureTrails({ onAddToFavorites }: NatureTrailsProps) {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [userRating, setUserRating] = useState<number>(0);

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hrad': return '🏰';
      case 'zámek': return '🏛️';
      case 'skalní město': return '🏔️';
      case 'národní park': return '🌲';
      case 'rozhledna': return '🗼';
      case 'jeskyně': return '🕳️';
      default: return '🏞️';
    }
  };

  const getMapyCzUrl = (trail: Trail) => {
    // Vytvoří URL pro Mapy.cz s koordináty trasy
    return `https://mapy.cz/turisticka?source=coor&id=${trail.coordinates.lng},${trail.coordinates.lat}&z=15`;
  };

  const handleOpenInMapyCz = (trail: Trail) => {
    window.open(getMapyCzUrl(trail), '_blank');
  };

  const handleAddReview = () => {
    if (selectedTrail && newReview.comment.trim()) {
      const review: TrailReview = {
        id: Date.now().toString(),
        userName: 'Anonymní uživatel',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('cs-CZ')
      };
      
      // V reálné aplikaci by se odeslalo na server
      console.log('Nová recenze:', review);
      
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      alert('Děkujeme za vaši recenzi!');
    }
  };

  const handleRating = (trailId: string, rating: number) => {
    setUserRating(rating);
    // V reálné aplikaci by se odeslalo na server
    console.log('Nové hodnocení:', { trailId, rating });
    alert(`Ohodnotili jste trasu ${rating} hvězdičkami!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Mountain className="w-4 h-4" />
          Přírodní trasy pro rodiny
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Objevte <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">přírodní krásy</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vydejte se s kočárkem na objevování hradů, zámků, skalních měst a dalších přírodních zajímavostí České republiky.
        </p>
      </div>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {natureTrails.map((trail) => (
          <Card key={trail.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative">
              <img
                src={trail.images[0]}
                alt={trail.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <span className="text-lg">{getTypeIcon(trail.type)}</span>
                <span className="text-xs font-medium capitalize">{trail.type}</span>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">{trail.rating}</span>
                <span className="text-xs text-gray-600">({trail.userRatings})</span>
              </div>
              {trail.strollerFriendly && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                  ✓ Pro kočárek
                </div>
              )}
              {!trail.strollerFriendly && (
                <div className="absolute bottom-4 left-4 bg-orange-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                  ⚠️ Náročnější
                </div>
              )}
            </div>

            <CardHeader>
              <CardTitle className="text-xl text-gray-800 group-hover:text-green-600 transition-colors">
                {trail.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{trail.location}, {trail.region}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {trail.description}
              </p>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <Route className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                  <div className="text-sm font-medium">{trail.distance} km</div>
                  <div className="text-xs text-gray-600">Délka</div>
                </div>
                <div>
                  <Clock className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                  <div className="text-sm font-medium">{trail.duration} min</div>
                  <div className="text-xs text-gray-600">Čas</div>
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trail.difficulty)}`}>
                    {trail.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Zajímavosti:</h4>
                <div className="flex flex-wrap gap-1">
                  {trail.highlights.slice(0, 3).map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setSelectedTrail(trail)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Detail
                </Button>
                <Button
                  onClick={() => onAddToFavorites?.(trail)}
                  variant="outline"
                  size="sm"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {/* Mapy.cz Button */}
              <div className="pt-2">
                <Button
                  onClick={() => handleOpenInMapyCz(trail)}
                  variant="outline"
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                  size="sm"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Otevřít v Mapy.cz
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>

              {/* Quick Rating */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-gray-600">Ohodnoťte trasu:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(trail.id, star)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedTrail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedTrail(null)} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedTrail.images[0]}
                alt={selectedTrail.name}
                className="w-full h-64 object-cover"
              />
              <Button
                onClick={() => setSelectedTrail(null)}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                ×
              </Button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTrail.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedTrail.location}, {selectedTrail.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{selectedTrail.rating}</span>
                    <span>({selectedTrail.userRatings} hodnocení)</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{selectedTrail.description}</p>
                
                {/* Mapy.cz Button in Modal */}
                <div className="mb-6">
                  <Button
                    onClick={() => handleOpenInMapyCz(selectedTrail)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Zobrazit trasu v Mapy.cz
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Trail Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informace o trase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Délka:</span>
                        <span className="font-medium">{selectedTrail.distance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doba:</span>
                        <span className="font-medium">{selectedTrail.duration} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Obtížnost:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedTrail.difficulty)}`}>
                          {selectedTrail.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pro kočárek:</span>
                        <span className={selectedTrail.strollerFriendly ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {selectedTrail.strollerFriendly ? 'Ano' : 'Ne'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Zajímavosti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedTrail.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recenze návštěvníků</h3>
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    size="sm"
                    variant="outline"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Přidat recenzi
                  </Button>
                </div>

                {selectedTrail.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}

                {/* Review Form */}
                {showReviewForm && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Přidat recenzi</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Hodnocení</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                              className={`text-2xl ${
                                star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                              } hover:text-yellow-400 transition-colors`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Váš komentář</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          placeholder="Popište vaši zkušenost s touto trasou..."
                          rows={3}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddReview} className="bg-green-600 hover:bg-green-700">
                          Odeslat recenzi
                        </Button>
                        <Button onClick={() => setShowReviewForm(false)} variant="outline">
                          Zrušit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}