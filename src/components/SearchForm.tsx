import { useState } from 'react'

interface SearchFormProps {
  onSearch: (searchData: any) => void
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState('')
  const [minPower, setMinPower] = useState('')
  const [maxPower, setMaxPower] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      query,
      rarity: rarity || undefined,
      minPower: minPower ? parseInt(minPower) : undefined,
      maxPower: maxPower ? parseInt(maxPower) : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded"
          placeholder="Item name or description"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Rarity</label>
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Any</option>
          <option value="COMMON">Common</option>
          <option value="UNCOMMON">Uncommon</option>
          <option value="RARE">Rare</option>
          <option value="VERY_RARE">Very Rare</option>
          <option value="LEGENDARY">Legendary</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Power Min</label>
        <input
          type="number"
          min="1"
          max="10"
          value={minPower}
          onChange={(e) => setMinPower(e.target.value)}
          className="border p-2 rounded w-16"
          placeholder="1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Power Max</label>
        <input
          type="number"
          min="1"
          max="10"
          value={maxPower}
          onChange={(e) => setMaxPower(e.target.value)}
          className="border p-2 rounded w-16"
          placeholder="10"
        />
      </div>
      
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-10"
      >
        Search
      </button>
    </form>
  )
}