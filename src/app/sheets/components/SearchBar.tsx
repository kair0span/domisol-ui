"use client";

import { useState, useCallback, useMemo } from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MusicSheet } from "../actions";

interface SearchBarProps {
    sheets: MusicSheet[];
    onFilteredSheetsChange: (sheets: MusicSheet[]) => void;
}

type SortOption = "popular" | "newest" | "oldest" | "title";

const CATEGORIES = ["vocal", "instrumental"] as const;

export function SearchBar({ sheets, onFilteredSheetsChange }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("popular");

    // Extract unique genres from sheets
    const availableGenres = useMemo(() => {
        const genres = new Set<string>();
        sheets.forEach((sheet) => {
            if (sheet.genre) genres.add(sheet.genre);
        });
        return Array.from(genres).sort();
    }, [sheets]);

    const filterAndSortSheets = useCallback(
        (
            searchQuery: string,
            categories: string[],
            genres: string[],
            sort: SortOption
        ) => {
            let filtered = [...sheets];

            // Text search
            if (searchQuery.trim()) {
                const lowerQuery = searchQuery.toLowerCase();
                filtered = filtered.filter(
                    (sheet) =>
                        sheet.title.toLowerCase().includes(lowerQuery) ||
                        sheet.composer.toLowerCase().includes(lowerQuery) ||
                        sheet.description.toLowerCase().includes(lowerQuery) ||
                        sheet.lyricist?.toLowerCase().includes(lowerQuery) ||
                        sheet.genre?.toLowerCase().includes(lowerQuery) ||
                        sheet.location?.toLowerCase().includes(lowerQuery) ||
                        sheet.key.tonic.toLowerCase().includes(lowerQuery) ||
                        sheet.key.mode.toLowerCase().includes(lowerQuery)
                );
            }

            // Category filter
            if (categories.length > 0) {
                filtered = filtered.filter((sheet) =>
                    categories.includes(sheet.category)
                );
            }

            // Genre filter
            if (genres.length > 0) {
                filtered = filtered.filter(
                    (sheet) => sheet.genre && genres.includes(sheet.genre)
                );
            }

            // Sort
            switch (sort) {
                case "newest":
                    filtered.sort((a, b) => b.year - a.year);
                    break;
                case "oldest":
                    filtered.sort((a, b) => a.year - b.year);
                    break;
                case "title":
                    filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "popular":
                default:
                    // Keep original order for "popular"
                    break;
            }

            onFilteredSheetsChange(filtered);
        },
        [sheets, onFilteredSheetsChange]
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        filterAndSortSheets(query, selectedCategories, selectedGenres, sortBy);
    };

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
        filterAndSortSheets(newQuery, selectedCategories, selectedGenres, sortBy);
    };

    const toggleCategory = (category: string) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newCategories);
        filterAndSortSheets(query, newCategories, selectedGenres, sortBy);
    };

    const toggleGenre = (genre: string) => {
        const newGenres = selectedGenres.includes(genre)
            ? selectedGenres.filter((g) => g !== genre)
            : [...selectedGenres, genre];
        setSelectedGenres(newGenres);
        filterAndSortSheets(query, selectedCategories, newGenres, sortBy);
    };

    const handleSortChange = (sort: SortOption) => {
        setSortBy(sort);
        filterAndSortSheets(query, selectedCategories, selectedGenres, sort);
    };

    const clearFilters = () => {
        setQuery("");
        setSelectedCategories([]);
        setSelectedGenres([]);
        setSortBy("popular");
        onFilteredSheetsChange(sheets);
    };

    const hasActiveFilters =
        query || selectedCategories.length > 0 || selectedGenres.length > 0;

    return (
        <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
            <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center w-full h-12 sm:h-14 px-4 sm:px-5 rounded-full border border-border/60 bg-card/80 backdrop-blur-md shadow-xs hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 transition-all duration-200">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        placeholder="Search sheets..."
                        className="flex-1 h-full border-0 outline-hidden bg-transparent text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-0 px-3"
                    />
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`hidden sm:flex items-center gap-1 h-8 border-border/60 text-muted-foreground hover:text-foreground ${showFilters ? "bg-secondary" : ""
                                }`}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Filters</span>
                            <ChevronDown
                                className={`h-3.5 w-3.5 ml-1 transition-transform ${showFilters ? "rotate-180" : ""
                                    }`}
                            />
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

            {/* Filter Panel */}
            {showFilters && (
                <div className="mt-4 p-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-4">
                        {/* Categories */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                Category
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((category) => (
                                    <Badge
                                        key={category}
                                        variant={
                                            selectedCategories.includes(category)
                                                ? "default"
                                                : "outline"
                                        }
                                        className="cursor-pointer capitalize transition-colors"
                                        onClick={() => toggleCategory(category)}
                                    >
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Genres */}
                        {availableGenres.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                    Genre
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {availableGenres.map((genre) => (
                                        <Badge
                                            key={genre}
                                            variant={
                                                selectedGenres.includes(genre) ? "default" : "outline"
                                            }
                                            className="cursor-pointer capitalize transition-colors"
                                            onClick={() => toggleGenre(genre)}
                                        >
                                            {genre}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sort */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                Sort by
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(
                                    [
                                        { value: "popular", label: "Most Popular" },
                                        { value: "newest", label: "Newest" },
                                        { value: "oldest", label: "Oldest" },
                                        { value: "title", label: "Title A-Z" },
                                    ] as const
                                ).map((option) => (
                                    <Badge
                                        key={option.value}
                                        variant={sortBy === option.value ? "default" : "outline"}
                                        className="cursor-pointer transition-colors"
                                        onClick={() => handleSortChange(option.value)}
                                    >
                                        {option.label}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Active filters display */}
            {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">Active filters:</span>
                    {query && (
                        <Badge variant="secondary" className="text-xs">
                            &quot;{query}&quot;
                            <X
                                className="h-3 w-3 ml-1 cursor-pointer"
                                onClick={() => handleQueryChange("")}
                            />
                        </Badge>
                    )}
                    {selectedCategories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs capitalize">
                            {cat}
                            <X
                                className="h-3 w-3 ml-1 cursor-pointer"
                                onClick={() => toggleCategory(cat)}
                            />
                        </Badge>
                    ))}
                    {selectedGenres.map((genre) => (
                        <Badge
                            key={genre}
                            variant="secondary"
                            className="text-xs capitalize"
                        >
                            {genre}
                            <X
                                className="h-3 w-3 ml-1 cursor-pointer"
                                onClick={() => toggleGenre(genre)}
                            />
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
