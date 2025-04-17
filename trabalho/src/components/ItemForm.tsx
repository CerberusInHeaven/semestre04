import { useState, useEffect } from 'react'
import { MagicItem } from '@prisma/client'

interface ItemFormProps {
  item: MagicItem | null
  categories: any[]
  onSubmit: (itemData: any) => void
  onCancel: () => void
}

export default function ItemForm({ item, categories, onSubmit, onCancel }: ItemFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [rarity, setRarity] = useState('COMMON')
  const [powerLevel, setPowerLevel] = useState(1)
  const [price, setPrice] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  useEffect(() => {
    if (item) {
      setName(item.name)
      setDescription(item.description)
      setRarity(item.rarity)
      setPowerLevel(item.powerLevel)
      setPrice(item.price?.toString() || '')
      // Assuming item has categories relationship loaded
      setSelectedCategories(item.categories?.map(c => c.id) || [])
    } else {
      resetForm()
    }
  }, [item])

  const resetForm = () => {
    setName('')
    setDescription('')
    setRarity('COMMON')
    setPowerLevel(1)
    setPrice('')
    setSelectedCategories([])
  }

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const itemData = {
      id: item?.id,
      name,
      description,
      rarity,
      powerLevel,
      price: price ? parseFloat(price) : undefined,
      categoryIds: selectedCategories,
    }
    
    onSubmit(itemData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          rows={4}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Rarity*</label>
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="COMMON">Common</option>
          <option value="UNCOMMON">Uncommon</option>
          <option value="RARE">Rare</option>
          <option value="VERY_RARE">Very Rare</option>
          <option value="LEGENDARY">Legendary</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Power Level (1-10)*</label>
        <input
          type="number"
          min="1"
          max="10"
          value={powerLevel}
          onChange={(e) => setPowerLevel(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Price (gold)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="border p-2 rounded"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {item ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  )
}