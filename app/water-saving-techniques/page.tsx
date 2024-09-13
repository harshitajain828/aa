import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function WaterSavingTechniques() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Water-Saving Techniques</h1>
      <p className="text-muted-foreground">
        Explore various techniques to conserve water in different settings.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Household Tips</CardTitle>
            <CardDescription>Learn how to save water at home</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Install low-flow showerheads</li>
              <li>Use efficient appliances</li>
              <li>Fix leaky faucets</li>
            </ul>
            <Button className="mt-4" asChild>
              <Link href="/water-saving-techniques/HouseholdTips">Read More</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agricultural Practices</CardTitle>
            <CardDescription>Efficient water use in farming</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Implement drip irrigation</li>
              <li>Use cover crops</li>
              <li>Practice crop rotation</li>
            </ul>
            <Button className="mt-4" asChild>
              <Link href="/water-saving-techniques/agriculturalpractices">Read More</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Industrial Processes</CardTitle>
            <CardDescription>Water conservation in industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Implement water recycling</li>
              <li>Upgrade wastewater treatment</li>
              <li>Optimize cooling systems</li>
            </ul>
            <Button className="mt-4" asChild>
              <Link href="/water-saving-techniques/industrialprocesses">Read More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}