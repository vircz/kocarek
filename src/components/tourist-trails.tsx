import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock, Mountain, Route, Camera, Heart, MessageCircle, ExternalLink, Map, Filter, Search } from 'lucide-react';

interface TouristTrail {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  type: 'zámek' | 'hrad' | 'skalní město' | 'národní park' | 'rozhledna' | 'jeskyně' | 'město' | 'příroda' | 'vodní dílo' | 'hora';
  rating: number;
  userRatings: number;
  images: string[];
  difficulty: 'snadné' | 'střední' | 'náročné';
  distance: number;
  duration: number;
  strollerFriendly: boolean;
  familyFriendly: boolean;
  highlights: string[];
  seasonRecommendation: 'celoročně' | 'jaro-podzim' | 'léto' | 'zima';
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews: TrailReview[];
}

interface TrailReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const touristTrails: TouristTrail[] = [
  // Praha
  {
    id: 'trail-prague-1',
    name: 'Procházka Petřínem a Strahovem',
    description: 'Krásná trasa Petřínskými sady s návštěvou rozhledny a Strahovského kláštera. Kombinuje přírodu s kulturou.',
    location: 'Praha 1, Praha 6',
    region: 'Praha',
    type: 'město',
    rating: 4.7,
    userRatings: 156,
    images: [
      'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'střední',
    distance: 3.2,
    duration: 120,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Petřínská rozhledna', 'Strahovský klášter', 'Výhledy na Prahu', 'Hřiště pro děti'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 50.0838, lng: 14.3969 },
    reviews: [
      {
        id: 'r1', userName: 'Alena K.', rating: 5,
        comment: 'Úžasná procházka s dětmi! Rozhledna je skvělá a výhledy jsou nádherné.',
        date: '2024-03-20'
      }
    ]
  },
  {
    id: 'trail-prague-2',
    name: 'Divoká Šárka',
    description: 'Přírodní rezervace v Praze s údolím, potokem a skalními útvary. Ideální únik z městského ruchu.',
    location: 'Praha 6',
    region: 'Praha',
    type: 'příroda',
    rating: 4.5,
    userRatings: 89,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    difficulty: 'střední',
    distance: 2.8,
    duration: 90,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Přírodní údolí', 'Skalní útvary', 'Potok', 'Klidné prostředí'],
    seasonRecommendation: 'jaro-podzim',
    coordinates: { lat: 50.1028, lng: 14.3194 },
    reviews: []
  },

  // Středočeský kraj
  {
    id: 'trail-central-1',
    name: 'Kolem Křivoklátu',
    description: 'Procházka kolem gotického hradu Křivoklát s možností návštěvy hradu a procházkou lesem.',
    location: 'Křivoklát',
    region: 'Středočeský kraj',
    type: 'hrad',
    rating: 4.6,
    userRatings: 134,
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73400?w=800',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
    ],
    difficulty: 'střední',
    distance: 2.5,
    duration: 75,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Gotický hrad', 'Lesní stezka', 'Výhled do údolí', 'Historické centrum'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 50.0358, lng: 13.8719 },
    reviews: [
      {
        id: 'r2', userName: 'Pavel N.', rating: 4,
        comment: 'Krásný hrad, ale s kočárkem to není ideální kvůli nerovnému terénu.',
        date: '2024-03-15'
      }
    ]
  },
  {
    id: 'trail-central-2',
    name: 'Sázava - vodní mlýn Hoslovice',
    description: 'Romantická procházka podél řeky Sázavy s návštěvou historického vodního mlýna.',
    location: 'Hoslovice',
    region: 'Středočeský kraj',
    type: 'vodní dílo',
    rating: 4.3,
    userRatings: 67,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'snadné',
    distance: 1.8,
    duration: 60,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Vodní mlýn', 'Řeka Sázava', 'Rovinná cesta', 'Piknikové místo'],
    seasonRecommendation: 'jaro-podzim',
    coordinates: { lat: 49.7439, lng: 14.8883 },
    reviews: []
  },

  // Jihočeský kraj
  {
    id: 'trail-south-1',
    name: 'Hluboká nad Vltavou - zámecký park',
    description: 'Procházka nejkrásnějším zámeckým parkem v Čechách s anglickým parkem a výhledy na zámek.',
    location: 'Hluboká nad Vltavou',
    region: 'Jihočeský kraj',
    type: 'zámek',
    rating: 4.8,
    userRatings: 198,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 2.0,
    duration: 90,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Neogotický zámek', 'Anglický park', 'Jezírka', 'Dětské hřiště'],
    seasonRecommendation: 'jaro-podzim',
    coordinates: { lat: 49.0522, lng: 14.4342 },
    reviews: [
      {
        id: 'r3', userName: 'Marie V.', rating: 5,
        comment: 'Nádherný zámek a park! Perfektní pro rodinný výlet, děti si užily hřiště.',
        date: '2024-03-22'
      }
    ]
  },
  {
    id: 'trail-south-2',
    name: 'Třeboň - rybníky a město',
    description: 'Procházka historickým městem Třeboň a okolními rybníky. Ideální pro poznání jihočeské krajiny.',
    location: 'Třeboň',
    region: 'Jihočeský kraj',
    type: 'město',
    rating: 4.4,
    userRatings: 112,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'snadné',
    distance: 3.5,
    duration: 120,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Historické město', 'Rybníky', 'Rozhledna Hoří', 'Lázeňský park'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.0031, lng: 14.7711 },
    reviews: []
  },

  // Západočeský kraj (Plzeňský)
  {
    id: 'trail-west-1',
    name: 'Šumava - Černé a Čertovo jezero',
    description: 'Nádherná trasa k ledovcovým jezerům na Šumavě. Méně náročná varianta vhodná pro rodiny.',
    location: 'Železná Ruda',
    region: 'Plzeňský kraj',
    type: 'národní park',
    rating: 4.9,
    userRatings: 223,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'střední',
    distance: 4.2,
    duration: 150,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Ledovcová jezera', 'Prales', 'Čistý vzduch', 'Unikátní příroda'],
    seasonRecommendation: 'léto',
    coordinates: { lat: 49.1342, lng: 13.2358 },
    reviews: [
      {
        id: 'r4', userName: 'Tomáš H.', rating: 5,
        comment: 'Úžasná příroda! S dětmi jsme šli jen k Černému jezeru, což bylo akorát.',
        date: '2024-03-18'
      }
    ]
  },

  // Karlovarský kraj
  {
    id: 'trail-karlovy-1',
    name: 'Karlovy Vary - lázeňská procházka',
    description: 'Procházka nejslavnějším lázeňským městem s ochutnávkou minerálních pramenů a architekturou.',
    location: 'Karlovy Vary',
    region: 'Karlovarský kraj',
    type: 'město',
    rating: 4.6,
    userRatings: 145,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 2.3,
    duration: 90,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Lázeňská kolonáda', 'Minerální prameny', 'Historická architektura', 'Lanovka'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 50.2245, lng: 12.8717 },
    reviews: []
  },

  // Ústecký kraj
  {
    id: 'trail-usti-1',
    name: 'České Švýcarsko - Pravčická brána',
    description: 'Návštěva největšího přírodního skalního mostu v Evropě. Upravená trasa vhodná i pro menší děti.',
    location: 'Hřensko',
    region: 'Ústecký kraj',
    type: 'národní park',
    rating: 4.8,
    userRatings: 287,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'střední',
    distance: 3.6,
    duration: 120,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Pravčická brána', 'Skalní města', 'Sokolí hnízdo', 'Výhledy do údolí'],
    seasonRecommendation: 'jaro-podzim',
    coordinates: { lat: 50.8747, lng: 14.2756 },
    reviews: [
      {
        id: 'r5', userName: 'Lucie M.', rating: 5,
        comment: 'Úchvatné! Děti byly nadšené z skal. Trasa je sice náročnější, ale stojí to za to.',
        date: '2024-03-25'
      }
    ]
  },

  // Liberecký kraj
  {
    id: 'trail-liberec-1',
    name: 'Ještěd - výstup lanovkou a procházka',
    description: 'Symbol Liberce s unikátním hotelem na vrcholu. Lanovka usnadňuje přístup rodinám s dětmi.',
    location: 'Liberec',
    region: 'Liberecký kraj',
    type: 'hora',
    rating: 4.7,
    userRatings: 189,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'snadné',
    distance: 1.2,
    duration: 60,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Lanovka', 'Televizní věž', '360° výhledy', 'Restaurace na vrcholu'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 50.7319, lng: 15.0086 },
    reviews: []
  },
  {
    id: 'trail-liberec-2',
    name: 'Jizerské hory - Smědava',
    description: 'Procházka k prameni řeky Jizery v krásné horské krajině Jizerskýchhor.',
    location: 'Bedřichov',
    region: 'Liberecký kraj',
    type: 'hora',
    rating: 4.4,
    userRatings: 98,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'střední',
    distance: 2.8,
    duration: 90,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Pramen Jizery', 'Horská příroda', 'Rašeliniště', 'Čistý vzduch'],
    seasonRecommendation: 'léto',
    coordinates: { lat: 50.8236, lng: 15.2736 },
    reviews: []
  },

  // Královéhradecký kraj
  {
    id: 'trail-hradec-1',
    name: 'Krkonoše - Špindlerův Mlýn',
    description: 'Rodinná procházka údolím se zastávkami u vodopádů a možností jízdy lanovkou.',
    location: 'Špindlerův Mlýn',
    region: 'Královéhradecký kraj',
    type: 'hora',
    rating: 4.6,
    userRatings: 167,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'střední',
    distance: 3.0,
    duration: 105,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Lanovky', 'Vodopády', 'Horské výhledy', 'Wellness hotely'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 50.7272, lng: 15.6097 },
    reviews: []
  },

  // Pardubický kraj
  {
    id: 'trail-pardubice-1',
    name: 'Litomyšl - zámek a město',
    description: 'UNESCO památka s renesančním zámkem a malebným historickým městem.',
    location: 'Litomyšl',
    region: 'Pardubický kraj',
    type: 'zámek',
    rating: 4.5,
    userRatings: 123,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 1.8,
    duration: 75,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Renesanční zámek', 'Historické náměstí', 'Smetanův dům', 'Zámecký park'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.8650, lng: 16.3133 },
    reviews: []
  },

  // Vysočina
  {
    id: 'trail-vysocina-1',
    name: 'Telč - UNESCO perla',
    description: 'Procházka nejkrásnějším náměstím v České republice a okolními rybníky.',
    location: 'Telč',
    region: 'Vysočina',
    type: 'město',
    rating: 4.8,
    userRatings: 201,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 2.2,
    duration: 90,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Renesanční náměstí', 'Zámek Telč', 'Rybníky', 'Historická architektura'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.1842, lng: 15.4525 },
    reviews: [
      {
        id: 'r6', userName: 'Jana S.', rating: 5,
        comment: 'Nejkrásnější náměstí! Děti se bavily u rybníků a fotky jsou úžasné.',
        date: '2024-03-28'
      }
    ]
  },

  // Jihomoravský kraj
  {
    id: 'trail-moravia-1',
    name: 'Mikulov - Svatý kopeček',
    description: 'Výstup na Svatý kopeček s kaplí a výhledy na vinařskou krajinu a Pálavu.',
    location: 'Mikulov',
    region: 'Jihomoravský kraj',
    type: 'hora',
    rating: 4.5,
    userRatings: 134,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'střední',
    distance: 2.5,
    duration: 80,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Kaple sv. Šebestiána', 'Výhledy na Pálavu', 'Vinařská krajina', 'Mikulovský zámek'],
    seasonRecommendation: 'jaro-podzim',
    coordinates: { lat: 48.8058, lng: 16.6375 },
    reviews: []
  },
  {
    id: 'trail-moravia-2',
    name: 'Brno - Špilberk a centrum',
    description: 'Procházka historickým centrem Brna s návštěvou hradu Špilberk a parků.',
    location: 'Brno',
    region: 'Jihomoravský kraj',
    type: 'město',
    rating: 4.4,
    userRatings: 156,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'střední',
    distance: 3.2,
    duration: 120,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Hrad Špilberk', 'Katedrála sv. Petra a Pavla', 'Zelný trh', 'Denisovy sady'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.1922, lng: 16.6113 },
    reviews: []
  },

  // Olomoucký kraj
  {
    id: 'trail-olomouc-1',
    name: 'Olomouc - UNESCO památky',
    description: 'Procházka historickým centrem s nejkrásnějším sloupem Nejsvětější Trojice v Evropě.',
    location: 'Olomouc',
    region: 'Olomoucký kraj',
    type: 'město',
    rating: 4.6,
    userRatings: 98,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 2.8,
    duration: 100,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Sloup Nejsvětější Trojice', 'Historické náměstí', 'Katedrála sv. Václava', 'Olomoucké tvarůžky'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.5938, lng: 17.2508 },
    reviews: []
  },

  // Zlínský kraj
  {
    id: 'trail-zlin-1',
    name: 'Moravské Karpaty - Buchlov',
    description: 'Návštěva nejstaršího královského hradu na Moravě s procházkou okolní krajinou.',
    location: 'Buchlovice',
    region: 'Zlínský kraj',
    type: 'hrad',
    rating: 4.3,
    userRatings: 87,
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73400?w=800',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
    ],
    difficulty: 'střední',
    distance: 2.2,
    duration: 85,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Královský hrad', 'Výhledy do údolí', 'Lesní cesta', 'Historické exponáty'],
    seasonRecommendation: 'jaro-podzim',
    coordinates: { lat: 49.1506, lng: 17.3358 },
    reviews: []
  },

  // Moravskoslezský kraj
  {
    id: 'trail-silesia-1',
    name: 'Beskydy - Pustevny',
    description: 'Návštěva nejvyhlášenějšího místa Beskyd s dřevěnými stavbami Dušana Jurkoviče.',
    location: 'Prostřední Bečva',
    region: 'Moravskoslezský kraj',
    type: 'hora',
    rating: 4.7,
    userRatings: 178,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    difficulty: 'střední',
    distance: 3.5,
    duration: 120,
    strollerFriendly: false,
    familyFriendly: true,
    highlights: ['Libušín a Maměnka', 'Lanovka', 'Radhošť', 'Moravskoslezské Beskydy'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.5119, lng: 18.2247 },
    reviews: [
      {
        id: 'r7', userName: 'Petr D.', rating: 5,
        comment: 'Úžasné místo! Děti byly nadšené z lanovky a výhledy jsou nádherné.',
        date: '2024-03-30'
      }
    ]
  },
  {
    id: 'trail-silesia-2',
    name: 'Ostrava - Dolní Vítkovice',
    description: 'Procházka industriálním dědictvím s návštěvou Bolt Tower a Science Centra.',
    location: 'Ostrava',
    region: 'Moravskoslezský kraj',
    type: 'město',
    rating: 4.2,
    userRatings: 143,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    ],
    difficulty: 'snadné',
    distance: 2.0,
    duration: 90,
    strollerFriendly: true,
    familyFriendly: true,
    highlights: ['Bolt Tower', 'Věda a technika', 'Industriální architektura', 'Interaktivní exponáty'],
    seasonRecommendation: 'celoročně',
    coordinates: { lat: 49.8069, lng: 18.2661 },
    reviews: []
  }
];

interface TouristTrailsProps {
  onAddToFavorites?: (trail: TouristTrail) => void;
}

export default function TouristTrails({ onAddToFavorites }: TouristTrailsProps) {
  const [selectedTrail, setSelectedTrail] = useState<TouristTrail | null>(null);
  const [filterRegion, setFilterRegion] = useState<string>('všechny');
  const [filterType, setFilterType] = useState<string>('všechny');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('všechny');
  const [onlyStrollerFriendly, setOnlyStrollerFriendly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const regions = ['všechny', 'Praha', 'Středočeský kraj', 'Jihočeský kraj', 'Plzeňský kraj', 'Karlovarský kraj', 'Ústecký kraj', 'Liberecký kraj', 'Královéhradecký kraj', 'Pardubický kraj', 'Vysočina', 'Jihomoravský kraj', 'Olomoucký kraj', 'Zlínský kraj', 'Moravskoslezský kraj'];
  const types = ['všechny', 'zámek', 'hrad', 'město', 'příroda', 'národní park', 'hora', 'vodní dílo'];
  const difficulties = ['všechny', 'snadné', 'střední', 'náročné'];

  const filteredTrails = touristTrails.filter(trail => {
    if (filterRegion !== 'všechny' && trail.region !== filterRegion) return false;
    if (filterType !== 'všechny' && trail.type !== filterType) return false;
    if (filterDifficulty !== 'všechny' && trail.difficulty !== filterDifficulty) return false;
    if (onlyStrollerFriendly && !trail.strollerFriendly) return false;
    if (searchTerm && !trail.name.toLowerCase().includes(searchTerm.toLowerCase()) && !trail.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'snadné': return 'text-green-600 bg-green-100';
      case 'střední': return 'text-yellow-600 bg-yellow-100';
      case 'náročné': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hrad': return '🏰';
      case 'zámek': return '🏛️';
      case 'město': return '🏘️';
      case 'příroda': return '🌿';
      case 'národní park': return '🌲';
      case 'hora': return '⛰️';
      case 'vodní dílo': return '🌊';
      case 'skalní město': return '🏔️';
      default: return '🏞️';
    }
  };

  const getMapyCzUrl = (trail: TouristTrail) => {
    return `https://mapy.cz/turisticka?source=coor&id=${trail.coordinates.lng},${trail.coordinates.lat}&z=15`;
  };

  const handleOpenInMapyCz = (trail: TouristTrail) => {
    window.open(getMapyCzUrl(trail), '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Mountain className="w-4 h-4" />
          Turistické trasy z celé České republiky
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Objevte <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">krásy Česka</span> s celou rodinou
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Kompletní kolekce turistických tras z všech krajů České republiky. Každá trasa je pečlivě vybrána s ohledem na vhodnost pro rodiny s dětmi a přístupnost s kočárky.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtry tras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kraj</label>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Typ trasy</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Obtížnost</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hledat</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Město, název..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="strollerOnly"
                checked={onlyStrollerFriendly}
                onChange={(e) => setOnlyStrollerFriendly(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="strollerOnly" className="ml-2 text-sm text-gray-700">
                Pouze trasy vhodné pro kočárek
              </label>
            </div>
            <div className="text-sm text-gray-600">
              Nalezeno {filteredTrails.length} tras
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrails.map((trail) => (
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
              <div className="absolute bottom-4 left-4">
                {trail.strollerFriendly ? (
                  <div className="bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                    ✓ Pro kočárek
                  </div>
                ) : (
                  <div className="bg-orange-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                    ⚠️ Náročnější
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-purple-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                  {trail.familyFriendly ? '👨‍👩‍👧‍👦 Rodinné' : '👥 Obecné'}
                </div>
              </div>
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
                  {trail.highlights.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{trail.highlights.length - 3}
                    </span>
                  )}
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredTrails.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mountain className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Žádné trasy nenalezeny</h3>
          <p className="text-gray-600">Zkuste upravit filtry nebo hledaný výraz.</p>
        </div>
      )}

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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rodinné:</span>
                        <span className={selectedTrail.familyFriendly ? 'text-green-600 font-medium' : 'text-gray-600 font-medium'}>
                          {selectedTrail.familyFriendly ? 'Ano' : 'Obecné'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doporučená sezóna:</span>
                        <span className="font-medium">{selectedTrail.seasonRecommendation}</span>
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
              {selectedTrail.reviews.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Recenze návštěvníků</h3>
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}