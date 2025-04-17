import { MagicItem } from '@prisma/client'

interface ItemListProps {
  items: MagicItem[]
  onItemClick: (item: MagicItem) => void
}

export default function ItemList({ items, onItemClick }: ItemListProps) {
  if (items.length === 0) {
    return <p>No items found. Try a different search.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item)}
          className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.rarity}</p>
          <p className="text-sm line-clamp-2">{item.description}</p>
        </div>
      ))}
    </div>
  )
}