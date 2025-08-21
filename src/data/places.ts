import { Place } from '@/types/place';

export const places: Place[] = [
  {
    id: '1',
    name: 'Petřín - Petřínská rozhledna',
    description: 'Nádherný park s rozhlednou nabízející úžasný výhled na Prahu. Ideální pro rodinné procházky s kočárkem po zpevněných cestách.',
    location: 'Praha 1',
    region: 'Praha',
    images: [
      'https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=1000',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000'
    ],
    rating: 4.8,
    reviews: 245,
    coordinates: { lat: 50.0838, lng: 14.3969 },
    website: 'https://www.muzeumprahy.cz/petrinská-rozhledna/',
    phone: '+420 257 320 112',
    openingHours: '10:00 - 22:00 (letní sezóna)',
    accessibility: {
      strollerFriendly: true,
      pathType: 'asfalt',
      difficulty: 'střední',
      distance: 2.5,
      duration: 45,
      elevation: 130,
      wheelchairAccessible: true,
      restrooms: true,
      playground: true
    },
    attractions: [
      {
        id: '1-1',
        name: 'Petřínská rozhledna',
        type: 'jiné',
        ageGroup: 'všechny věky',
        description: 'Kopie Eiffelovy věže s výtahem a úžasným výhledem'
      },
      {
        id: '1-2',
        name: 'Bludiště',
        type: 'jiné',
        ageGroup: '3-12 let',
        description: 'Zrcadlové bludiště pro zábavu celé rodiny'
      },
      {
        id: '1-3',
        name: 'Dětské hřiště',
        type: 'hřiště',
        ageGroup: '2-10 let',
        description: 'Moderní hřiště s bezpečným povrchem'
      }
    ],
    parking: {
      available: true,
      free: false,
      spaces: 50,
      surface: 'asfalt',
      distance: 300
    }
  },
  {
    id: '2',
    name: 'Zoo Praha',
    description: 'Jedna z nejkrásnějších zoologických zahrad světa s bezbariérovými cestami a spoustou atrakcí pro děti.',
    location: 'Praha 7 - Troja',
    region: 'Praha',
    images: [
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=1000',
      'https://images.unsplash.com/photo-1549480017-d76466350719?q=80&w=1000'
    ],
    rating: 4.9,
    reviews: 892,
    coordinates: { lat: 50.1165, lng: 14.4130 },
    website: 'https://www.zoopraha.cz/',
    phone: '+420 296 112 230',
    openingHours: '9:00 - 18:00 (letní sezóna)',
    accessibility: {
      strollerFriendly: true,
      pathType: 'asfalt',
      difficulty: 'snadné',
      distance: 3.0,
      duration: 180,
      elevation: 50,
      wheelchairAccessible: true,
      restrooms: true,
      playground: true
    },
    attractions: [
      {
        id: '2-1',
        name: 'Dětská zoo',
        type: 'zoo',
        ageGroup: '1-8 let',
        description: 'Kontaktní zoo s domácími zvířaty',
        price: 'zahrnuto ve vstupném'
      },
      {
        id: '2-2',
        name: 'Lanová dráha',
        type: 'jiné',
        ageGroup: 'všechny věky',
        description: 'Pohodlná doprava po zoo s kočárky',
        price: '25 Kč'
      },
      {
        id: '2-3',
        name: 'Pavilon goril',
        type: 'zoo',
        ageGroup: 'všechny věky',
        description: 'Jeden z nejmodernějších pavilonů v Evropě'
      }
    ],
    parking: {
      available: true,
      free: false,
      spaces: 500,
      surface: 'asfalt',
      distance: 100
    }
  },
  {
    id: '3',
    name: 'Aquapalace Praha',
    description: 'Největší aquapark ve střední Evropě s tropickým prostředím a atrakcemi pro nejmenší děti.',
    location: 'Čestlice',
    region: 'Středočeský kraj',
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000'
    ],
    rating: 4.6,
    reviews: 634,
    coordinates: { lat: 50.0064, lng: 14.5369 },
    website: 'https://www.aquapalace.cz/',
    phone: '+420 271 104 111',
    openingHours: '10:00 - 22:00',
    accessibility: {
      strollerFriendly: true,
      pathType: 'dlaždice',
      difficulty: 'snadné',
      distance: 0.5,
      duration: 240,
      elevation: 0,
      wheelchairAccessible: true,
      restrooms: true,
      playground: false
    },
    attractions: [
      {
        id: '3-1',
        name: 'Baby bazén',
        type: 'aquapark',
        ageGroup: '0-3 roky',
        description: 'Mělký bazén s teplou vodou pro nejmenší'
      },
      {
        id: '3-2',
        name: 'Dětský svět',
        type: 'aquapark',
        ageGroup: '3-12 let',
        description: 'Vodní hřiště s tobogány a atrakcemi'
      },
      {
        id: '3-3',
        name: 'Wellness pro rodiče',
        type: 'jiné',
        ageGroup: 'dospělí',
        description: 'Relaxační zóna s masážemi a saunami'
      }
    ],
    parking: {
      available: true,
      free: true,
      spaces: 800,
      surface: 'asfalt',
      distance: 50
    }
  },
  {
    id: '4',
    name: 'Český Krumlov - Historické centrum',
    description: 'UNESCO památka s dlážděnými uličkami. Některé části jsou přístupné s kočárkem přes upravené trasy.',
    location: 'Český Krumlov',
    region: 'Jihočeský kraj',
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73400?q=80&w=1000',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1000'
    ],
    rating: 4.7,
    reviews: 423,
    coordinates: { lat: 48.8127, lng: 14.3175 },
    website: 'https://www.ckrumlov.info/',
    phone: '+420 380 704 622',
    openingHours: 'celodenně přístupné',
    accessibility: {
      strollerFriendly: false,
      pathType: 'dlaždice',
      difficulty: 'náročné',
      distance: 1.5,
      duration: 90,
      elevation: 80,
      wheelchairAccessible: false,
      restrooms: true,
      playground: true
    },
    attractions: [
      {
        id: '4-1',
        name: 'Státní zámek',
        type: 'zámek',
        ageGroup: '6+ let',
        description: 'Prohlídky zámeckých komnat s audiopůjčovnou',
        price: '280 Kč dospělí'
      },
      {
        id: '4-2',
        name: 'Zámecká zahrada',
        type: 'park',
        ageGroup: 'všechny věky',
        description: 'Barokní zahrada s fontánami a altány'
      },
      {
        id: '4-3',
        name: 'Medvědí příkop',
        type: 'zoo',
        ageGroup: 'všechny věky',
        description: 'Výběh s medvědy přímo pod zámkem'
      }
    ],
    parking: {
      available: true,
      free: false,
      spaces: 200,
      surface: 'asfalt',
      distance: 500
    }
  },
  {
    id: '5',
    name: 'Aquapark Babylon - Liberec',
    description: 'Tropický aquapark s Lunaparkem a IQ parkem. Komplex zábav pro celou rodinu na jednom místě.',
    location: 'Liberec',
    region: 'Liberecký kraj',
    images: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000'
    ],
    rating: 4.5,
    reviews: 756,
    coordinates: { lat: 50.7663, lng: 15.0543 },
    website: 'https://www.hotelbabylon.cz/',
    phone: '+420 485 153 999',
    openingHours: '9:00 - 21:00',
    accessibility: {
      strollerFriendly: true,
      pathType: 'dlaždice',
      difficulty: 'snadné',
      distance: 0.3,
      duration: 300,
      elevation: 0,
      wheelchairAccessible: true,
      restrooms: true,
      playground: false
    },
    attractions: [
      {
        id: '5-1',
        name: 'Aquapark',
        type: 'aquapark',
        ageGroup: 'všechny věky',
        description: 'Tropický aquapark s tobogány a bazény'
      },
      {
        id: '5-2',
        name: 'Lunapark',
        type: 'jiné',
        ageGroup: '3+ let',
        description: 'Vnitřní zábavní park s atrakcemi'
      },
      {
        id: '5-3',
        name: 'IQ Park',
        type: 'muzeum',
        ageGroup: '5+ let',
        description: 'Interaktivní vědecké centrum',
        price: '190 Kč'
      }
    ],
    parking: {
      available: true,
      free: true,
      spaces: 300,
      surface: 'asfalt',
      distance: 30
    }
  },
  {
    id: '6',
    name: 'Dinopark Vyškov',
    description: 'Největší dinopark v České republice s modely dinosaurů v životní velikosti a vzdělávacími programy.',
    location: 'Vyškov',
    region: 'Jihomoravský kraj',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2ac0?q=80&w=1000'
    ],
    rating: 4.4,
    reviews: 312,
    coordinates: { lat: 49.2778, lng: 16.9983 },
    website: 'https://www.dinopark-vyskov.cz/',
    phone: '+420 517 343 432',
    openingHours: '9:00 - 18:00 (sezónně)',
    accessibility: {
      strollerFriendly: true,
      pathType: 'zpevněná cesta',
      difficulty: 'snadné',
      distance: 1.8,
      duration: 120,
      elevation: 20,
      wheelchairAccessible: true,
      restrooms: true,
      playground: true
    },
    attractions: [
      {
        id: '6-1',
        name: 'Stezka dinosaurů',
        type: 'jiné',
        ageGroup: 'všechny věky',
        description: '70 modelů dinosaurů v životní velikosti'
      },
      {
        id: '6-2',
        name: 'Paleontologické pískoviště',
        type: 'hřiště',
        ageGroup: '4-12 let',
        description: 'Vykopávky kostí dinosaurů pro děti'
      },
      {
        id: '6-3',
        name: '4D kino',
        type: 'jiné',
        ageGroup: '6+ let',
        description: 'Dokumenty o dinosaurech s efekty',
        price: '50 Kč'
      }
    ],
    parking: {
      available: true,
      free: true,
      spaces: 150,
      surface: 'štěrk',
      distance: 100
    }
  }
];