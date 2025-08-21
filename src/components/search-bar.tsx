import { useState } from 'react';
import { Search, MapPin, Mountain, Castle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Hledat místa..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <Button
            type="submit"
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white px-4"
          >
            Hledat
          </Button>
        </div>
      </div>
      
      {/* Quick suggestions */}
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={() => onSearch('zoo')}
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
        >
          <span>🦁</span>
          Zoo
        </button>
        <button
          type="button"
          onClick={() => onSearch('aquapark')}
          className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full hover:bg-cyan-200 transition-colors"
        >
          <span>🏊</span>
          Aquapark
        </button>
        <button
          type="button"
          onClick={() => onSearch('hrad')}
          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full hover:bg-purple-200 transition-colors"
        >
          <Castle className="w-3 h-3" />
          Hrady a zámky
        </button>
        <button
          type="button"
          onClick={() => onSearch('skalní město')}
          className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full hover:bg-orange-200 transition-colors"
        >
          <Mountain className="w-3 h-3" />
          Skalní města
        </button>
        <button
          type="button"
          onClick={() => onSearch('Praha')}
          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors"
        >
          <MapPin className="w-3 h-3" />
          Praha
        </button>
      </div>
    </form>
  );
}