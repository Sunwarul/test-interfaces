// @ts-nocheck
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
    Search,
    HelpCircle,
    Moon,
    Bell,
    User,
    ChevronDown,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainHeader() {
    const brands = useAuthStore((state) => state.brands);
    const [selectedBrand, setSelectedBrand] = useState<string>(
        brands?.[0]?.id || ""
    );

    return (
        <header className="flex items-center justify-between border-b border-[var(--border-black-10)] bg-white p-6">
            {/* Brand Selector */}
            <div className="w-[320px]">
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="h-12 rounded-full border border-[var(--border-black-10)] bg-white/60 pl-5 pr-3">
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-[var(--color-text-black-60)]">
                                Brand
                            </span>
                            <SelectValue className="font-bold">
                                {brands?.find((b) => b.id === selectedBrand)?.name ||
                                    "Select Brand"}
                            </SelectValue>
                        </div>
                        <ChevronDown className="ml-2 size-5 text-[var(--color-text-black-60)]" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full hover:bg-gray-100"
                >
                    <Search className="size-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full hover:bg-gray-100"
                >
                    <HelpCircle className="size-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full hover:bg-gray-100"
                >
                    <Moon className="size-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full hover:bg-gray-100"
                >
                    <Bell className="size-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full hover:bg-gray-100"
                >
                    <User className="size-6" />
                </Button>
            </div>
        </header>
    );
}
