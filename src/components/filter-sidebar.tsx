import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';

export interface FilterOptions {
  region: string;
  difficulty: string;
  strollerFriendly: boolean | null;
  hasPlayground: boolean | null;
  freeParking: boolean | null;
  maxDistance: number;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const regions = [
  'Všechny kraje',
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

const difficulties = ['všechny', 'snadné', 'střední', 'náročné'];

export default function FilterSidebar({ filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="h-fit sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-green-600" />
          Filtry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Region */}
        <div>
          <label className="text-sm font-medium mb-2 block">Kraj</label>
          <select
            value={filters.region}
            onChange={(e) => updateFilter('region', e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-sm font-medium mb-2 block">Obtížnost</label>
          <select
            value={filters.difficulty}
            onChange={(e) => updateFilter('difficulty', e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'všechny' ? 'Všechny obtížnosti' : difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Max Distance */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Maximální vzdálenost trasy: {filters.maxDistance} km
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={filters.maxDistance}
            onChange={(e) => updateFilter('maxDistance', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0,5 km</span>
            <span>10 km</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="stroller"
              checked={filters.strollerFriendly === true}
              onChange={(e) => updateFilter('strollerFriendly', e.target.checked ? true : null)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="stroller" className="ml-2 text-sm text-gray-700">
              Pouze místa vhodná pro kočárek
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="playground"
              checked={filters.hasPlayground === true}
              onChange={(e) => updateFilter('hasPlayground', e.target.checked ? true : null)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="playground" className="ml-2 text-sm text-gray-700">
              S dětským hřištěm
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="parking"
              checked={filters.freeParking === true}
              onChange={(e) => updateFilter('freeParking', e.target.checked ? true : null)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="parking" className="ml-2 text-sm text-gray-700">
              Bezplatné parkování
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Resetovat filtry
        </Button>
      </CardContent>
    </Card>
  );
}