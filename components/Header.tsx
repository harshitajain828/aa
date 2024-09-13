import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star } from 'lucide-react'
import { cn } from "@/lib/utils"

export function Headersearch() {
  const [query, setQuery] = useState('')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">WaterWiki</span>
        </Link>
        <div className="flex items-center space-x-2 ml-auto">
          {/* New search bar, hidden on mobile */}
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 md:w-[300px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/* Rest of the header content */}
        </div>
      </div>
      {/* Modified central search bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <div className="flex">
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !query && "text-muted-foreground"
                )}
              >
                <Search className="mr-2 h-4 w-4" />
                {query || "Search WaterWiki..."}
              </Button>
              <div className="mx-1 w-px bg-border" />
              <Button variant="outline" size="lg" className="flex-1 justify-start text-left font-normal">
                <Star className="mr-2 h-4 w-4" />
                AI-generated content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}