"use client";

import { useState } from "react";
import {
    Search,
    HelpCircle,
    Moon,
    Bell,
    User,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/auth.store";

export function DashboardHeader() {
    const brands = useAuthStore((state) => state.brands);
    const currentBrandId = useAuthStore((state) => state.componentId);
    const [selectedBrandId, setSelectedBrandId] = useState<string>(
        brands[0]?.id ?? ""
    );

    const selectedBrand = brands.find((b) => b.id === selectedBrandId);

    return (
        <header className="flex items-center justify-between p-6 bg-white border-b border-black/10">
            {/* Brand Selector */}
            <div className="w-[320px]">
                <Select value={selectedBrandId} onValueChange={setSelectedBrandId}>
                    <SelectTrigger className="h-12 rounded-full pl-5 pr-4 gap-2 bg-white/60 border border-black/10">
                        <div className="flex flex-col items-start flex-1">
                            <span className="text-[13px] text-black/60 font-normal leading-4">
                                Brand
                            </span>
                            <span className="text-[13px] font-bold text-[#1a1a1a] leading-4 truncate w-full">
                                {selectedBrand?.name ?? "Select Brand"}
                            </span>
                        </div>
                        <ChevronDown className="size-5 text-black/60 shrink-0" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map((brand) => (
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
                    className="size-12 rounded-full bg-white"
                >
                    <Search className="size-6 text-[#1a1a1a]" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full bg-white"
                >
                    <HelpCircle className="size-6 text-[#1a1a1a]" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full bg-white"
                >
                    <Moon className="size-6 text-[#1a1a1a]" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full bg-white relative"
                >
                    <Bell className="size-6 text-[#1a1a1a]" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ff5634] rounded-full" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full bg-white"
                >
                    <User className="size-6 text-[#1a1a1a]" />
                </Button>
            </div>
        </header>
    );
}