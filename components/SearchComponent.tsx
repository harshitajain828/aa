'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Loader2 } from 'lucide-react'

// Mock data for site-wide search
const siteContent = [
  { id: 1, title: "Water Conservation Techniques", content: "Learn about various water conservation techniques for homes and businesses." },
  { id: 2, title: "Rainwater Harvesting", content: "Explore the benefits and methods of rainwater harvesting for sustainable water management." },
  { id: 3, title: "Drought-Resistant Landscaping", content: "Discover how to create beautiful, water-efficient landscapes using drought-resistant plants." },
  { id: 4, title: "Water Pollution Prevention", content: "Understand the causes of water pollution and learn strategies to prevent it in your community." },
  { id: 5, title: "Efficient Irrigation Systems", content: "Find out about modern irrigation systems that can significantly reduce water usage in agriculture." },
];

const searchSite = async (query: string) => {
  // Simulate an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Perform a case-insensitive search on the mock data
  const lowercaseQuery = query.toLowerCase();
  return siteContent.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) || 
    item.content.toLowerCase().includes(lowercaseQuery)
  );
}

const searchGemini = async (query: string) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from Gemini');
  }

  const data = await response.json();
  return data.result;
}

export function SearchComponent() {
  const [query, setQuery] = useState('')
  const [siteResults, setSiteResults] = useState<Array<{ id: number; title: string; content: string }>>([])
  const [geminiResult, setGeminiResult] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isGeminiSearching, setIsGeminiSearching] = useState(false)
  const [showGeminiResult, setShowGeminiResult] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setIsDialogOpen(true)
    try {
      const results = await searchSite(query)
      setSiteResults(results)
    } catch (error) {
      console.error('Error searching site:', error)
      setSiteResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleGeminiSearch = async () => {
    setShowGeminiResult(true)
    setIsGeminiSearching(true)
    try {
      const result = await searchGemini(query)
      setGeminiResult(result)
    } catch (error) {
      console.error('Error searching Gemini:', error)
      setGeminiResult('Failed to get a response from Gemini. Please try again.')
    } finally {
      setIsGeminiSearching(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Search WaterWiki..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 text-lg rounded-full border-2 border-primary"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        </div>
        <Button type="submit" size="lg" className="h-14 px-8 rounded-full">
          Search
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Search Results for "{query}"</DialogTitle>
          </DialogHeader>
          {isSearching ? (
            <div className="flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Searching...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {siteResults.length > 0 ? (
                siteResults.map((result) => (
                  <div key={result.id} className="border-b pb-2">
                    <h3 className="font-semibold">{result.title}</h3>
                    <p className="text-sm text-gray-600">{result.content}</p>
                  </div>
                ))
              ) : (
                <p>No results found on the site. Try asking Gemini for more information.</p>
              )}
              {!showGeminiResult && (
                <Button onClick={handleGeminiSearch} className="w-full">
                  Ask Gemini
                </Button>
              )}
              {showGeminiResult && (
                <div className="mt-4 p-4 bg-secondary rounded-md">
                  <h3 className="font-semibold mb-2">Gemini Response:</h3>
                  {isGeminiSearching ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Getting response from Gemini...</span>
                    </div>
                  ) : (
                    <p className="text-sm">{geminiResult}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}