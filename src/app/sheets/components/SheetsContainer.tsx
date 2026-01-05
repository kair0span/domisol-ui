"use client";

import { useState } from "react";
import { Music, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MusicSheet } from "../actions";
import { SearchBar } from "./SearchBar";
import { SheetCard } from "./SheetCard";

interface SheetsContainerProps {
    initialSheets: MusicSheet[];
}

export function SheetsContainer({ initialSheets }: SheetsContainerProps) {
    const [filteredSheets, setFilteredSheets] =
        useState<MusicSheet[]>(initialSheets);

    return (
        <>
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

                        {/* Search Bar Component */}
                        <SearchBar
                            sheets={initialSheets}
                            onFilteredSheetsChange={setFilteredSheets}
                        />
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
                            {filteredSheets.length === initialSheets.length
                                ? "Featured Sheets"
                                : `Found ${filteredSheets.length} sheet${filteredSheets.length !== 1 ? "s" : ""}`}
                        </h2>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-muted-foreground">
                                {filteredSheets.length} of {initialSheets.length} sheets
                            </span>
                        </div>
                    </div>

                    {/* Cards grid - Improved layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredSheets.map((sheet, index) => (
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
                    {filteredSheets.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-muted/50 p-4 rounded-full mb-4">
                                <Music className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No sheets found</h3>
                            <p className="text-muted-foreground max-w-md">
                                {initialSheets.length === 0
                                    ? "There are no sheet music files available right now. Try again later or add your own sheet."
                                    : "No sheets match your search criteria. Try adjusting your filters or search terms."}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
