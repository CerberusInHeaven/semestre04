'use client'

import { useState, useEffect } from 'react'
import ItemList from '@/components/ItemList'
import SearchForm from '@/components/SearchForm'
import ItemForm from '@/components/ItemForm'
import { MagicItem } from '@prisma/client'

export default function Home() {
  const [items, setItems] = useState<MagicItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MagicItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchItems()
    fetchCategories()
  }, [])

  const fetchItems = async (searchParams = '') => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/items${searchParams}`)
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearch = (searchData: any) => {
    const params = new URLSearchParams()
    if (searchData.query) params.append('query', searchData.query)
    if (searchData.rarity) params.append('rarity', searchData.rarity)
    if (searchData.minPower) params.append('minPower', searchData.minPower.toString())
    if (searchData.maxPower) params.append('maxPower', searchData.maxPower.toString())
    
    fetchItems(`?${params.toString()}`)
  }

  const handleItemClick = (item: MagicItem) => {
    setSelectedItem(item)
  }

  const handleCloseDetails = () => {
    setSelectedItem(null)
  }

  const handleFormSubmit = async (itemData: any) => {
    const method = itemData.id ? 'PUT' : 'POST'
    const url = itemData.id ? '/api/items' : '/api/items'
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })
      
      if (res.ok) {
        fetchItems()
        setShowForm(false)
        setSelectedItem(null)
      }
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleDeleteItem = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await fetch(`/api/items?id=${id}`, {
          method: 'DELETE',
        })
        
        if (res.ok) {
          fetchItems()
          setSelectedItem(null)
        }
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Magic Items Collection</h1>
      
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Item
        </button>
        
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {isLoading ? (
        <p>Loading items...</p>
      ) : (
        <ItemList 
          items={items} 
          onItemClick={handleItemClick} 
        />
      )}
      
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={handleCloseDetails}
              className="float-right font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
            <p className="mb-2"><strong>Rarity:</strong> {selectedItem.rarity}</p>
            <p className="mb-2"><strong>Power Level:</strong> {selectedItem.powerLevel}</p>
            {selectedItem.price && <p className="mb-2"><strong>Price:</strong> {selectedItem.price} gold</p>}
            <p className="mb-4"><strong>Description:</strong> {selectedItem.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedItem(null)
                  setShowForm(true)
                }}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(selectedItem.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setShowForm(false)
                setSelectedItem(null)
              }}
              className="float-right font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedItem ? 'Edit Item' : 'Add New Item'}
            </h2>
            <ItemForm 
              item={selectedItem} 
              categories={categories}
              onSubmit={handleFormSubmit} 
              onCancel={() => {
                setShowForm(false)
                setSelectedItem(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}