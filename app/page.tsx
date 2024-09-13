'use client'

import { SearchComponent } from '@/components/SearchComponent'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to WaterWiki</h1>
      <p className="text-xl text-center text-muted-foreground mb-8">
        Your comprehensive resource for water efficiency and conservation
      </p>
      
      <div className="w-full max-w-3xl mb-12">
        <SearchComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {sections.map((section) => (
          <div key={section.title} className="bg-card text-card-foreground rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            <p className="text-muted-foreground mb-4">{section.description}</p>
            <Button asChild>
              <Link href={section.link}>{section.buttonText}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

const sections = [
  {
    title: "Water-Saving Techniques",
    description: "Discover practical ways to conserve water",
    link: "/water-saving-techniques",
    buttonText: "Explore Techniques"
  },
  {
    title: "Case Studies",
    description: "Learn from successful water conservation projects",
    link: "/case-studies",
    buttonText: "View Case Studies"
  },
  {
    title: "Research and Findings",
    description: "Access peer-reviewed articles and statistics",
    link: "/research-and-findings",
    buttonText: "Explore Research"
  },
  {
    title: "Interactive Tools",
    description: "Calculate your water usage and more",
    link: "/interactive-tools",
    buttonText: "Try Tools"
  },
  {
    title: "Community Forums",
    description: "Engage with others and share knowledge",
    link: "/community-forums",
    buttonText: "Join Discussions"
  }
]