import { Plus, Search, Filter, ChevronDown, Music } from "lucide-react";
import { SheetCard } from "./components/SheetCard";
import { getMusicXMLExamples } from "./actions";
import { Button } from "@/components/ui/button";

export default async function Sheet() {
  const sheets = await getMusicXMLExamples();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/95">
      {/* Hero Section with reduced height for minimalism */}
      <section className="relative pt-16 sm:pt-20 md:pt-16 pb-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Logo and Heading - Simplified */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center justify-center mb-3">
                <Music className="h-8 w-8 text-primary mr-2" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="text-primary">Domisol</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground font-normal max-w-xl mx-auto">
                Discover, search & play beautiful sheet music
              </p>
            </div>

            {/* Modern Search Bar - Refined */}
            <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
              <form className="relative">
                <div className="flex items-center w-full h-12 sm:h-14 px-4 sm:px-5 rounded-full border border-border/60 bg-card/80 backdrop-blur-md shadow-xs hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 transition-all duration-200">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search sheets..."
                    className="flex-1 h-full border-0 outline-hidden bg-transparent text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-0 px-3"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex items-center gap-1 h-8 border-border/60 text-muted-foreground hover:text-foreground"
                    >
                      <Filter className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">Filters</span>
                      <ChevronDown className="h-3.5 w-3.5 ml-1" />
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle divider */}
      <div className="w-full flex items-center justify-center mb-4">
        <div className="w-16 h-px bg-border/60" />
      </div>

      {/* Content Section - Refined */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2 sm:mb-0">
              Featured Sheets
            </h2>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="text-sm">
                Most Popular
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cards grid - Improved layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sheets.map((sheet, index) => (
              <div
                key={`${sheet.title}-${index}`}
                className="h-full transition-all duration-300 hover:translate-y-[-4px] group animate-fade-in-card"
                style={{
                  animationDelay: `${Math.min(index * 50, 300)}ms`,
                }}
              >
                <SheetCard sheet={sheet} index={index} />
              </div>
            ))}
          </div>

          {/* Empty state (shown when no sheets are available) */}
          {sheets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-muted/50 p-4 rounded-full mb-4">
                <Music className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No sheets found</h3>
              <p className="text-muted-foreground max-w-md">
                There are no sheet music files available right now. Try again
                later or add your own sheet.
              </p>
            </div>
          )}
        </div>

        {/* Floating Add Sheet Button - Refined */}
        <Button
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Add new sheet"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </section>

      {/* Animation is defined in global CSS */}
    </div>
  );
}
