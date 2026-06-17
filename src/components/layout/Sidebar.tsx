"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    ShoppingCart,
    CalendarDays,
    Star,
    Package,
    Zap,
    Gift,
    Tag,
    Calendar,
    MessageSquare,
    Building2,
    UtensilsCrossed,
    Grid3X3,
    Bed,
    Truck,
    Users,
    QrCode,
    CreditCard,
    FileText,
    Globe,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

interface NavCategory {
    label: string;
    items: NavItem[];
}

const navCategories: NavCategory[] = [
    {
        label: "OVERVIEW",
        items: [
            { label: "Dashboard", href: "/", icon: <LayoutDashboard className="size-5" /> },
            { label: "Reports", href: "/reports", icon: <BarChart3 className="size-5" /> },
        ],
    },
    {
        label: "OPERATIONS",
        items: [
            { label: "Orders", href: "/orders", icon: <ShoppingCart className="size-5" /> },
            { label: "Reservations", href: "/reservations", icon: <CalendarDays className="size-5" /> },
            { label: "Reviews", href: "/reviews", icon: <Star className="size-5" /> },
            { label: "Inventory", href: "/inventory", icon: <Package className="size-5" /> },
        ],
    },
    {
        label: "MARKETING",
        items: [
            { label: "Automation", href: "/automation", icon: <Zap className="size-5" /> },
            { label: "Loyalty Program", href: "/loyalty", icon: <Gift className="size-5" /> },
            { label: "Deals", href: "/deals", icon: <Tag className="size-5" /> },
            { label: "Events", href: "/events", icon: <Calendar className="size-5" /> },
            { label: "Message", href: "/message", icon: <MessageSquare className="size-5" /> },
        ],
    },
    {
        label: "BUSINESS",
        items: [
            { label: "My Brands", href: "/brands", icon: <Building2 className="size-5" /> },
            { label: "Menu Management", href: "/menu", icon: <UtensilsCrossed className="size-5" /> },
            { label: "Tables / Sections", href: "/tables", icon: <Grid3X3 className="size-5" /> },
            { label: "Rooms", href: "/rooms", icon: <Bed className="size-5" /> },
            { label: "Delivery Zone", href: "/delivery-zone", icon: <Truck className="size-5" /> },
            { label: "Suppliers", href: "/suppliers", icon: <Users className="size-5" /> },
            { label: "Teams", href: "/teams", icon: <Users className="size-5" /> },
            { label: "Smart Menu", href: "/smart-menu", icon: <UtensilsCrossed className="size-5" /> },
            { label: "QR Code Designer", href: "/qr-designer", icon: <QrCode className="size-5" /> },
        ],
    },
    {
        label: "FINANCE",
        items: [
            { label: "Transactions", href: "/transactions", icon: <CreditCard className="size-5" /> },
            { label: "Settlements", href: "/settlements", icon: <FileText className="size-5" /> },
            { label: "Account", href: "/account", icon: <CreditCard className="size-5" /> },
        ],
    },
    {
        label: "OTHER",
        items: [
            { label: "Translation Center", href: "/translation", icon: <Globe className="size-5" /> },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[260px] bg-white flex flex-col gap-6 py-6 px-4 min-h-screen">
            {/* Logo */}
            <div className="w-14 h-14 rounded-[51.2px] bg-[#6054ba] flex items-center justify-center shrink-0 mx-auto">
                <span className="text-white font-bold text-xl">P</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-4">
                {navCategories.map((category) => (
                    <div key={category.label} className="flex flex-col gap-0">
                        <div className="pb-2 px-4">
                            <span className="text-[13px] text-black/40 font-normal">
                                {category.label}
                            </span>
                        </div>
                        {category.items.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 h-10 px-5 rounded-full text-[16px] transition-colors",
                                        isActive
                                            ? "bg-[#ff5634] text-white"
                                            : "text-[#1a1a1a] hover:bg-black/5"
                                    )}
                                >
                                    <span className="shrink-0">{item.icon}</span>
                                    <span className="flex-1 tracking-[-0.16px]">{item.label}</span>
                                    {isActive && (
                                        <ChevronRight className="size-4 shrink-0" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Upgrade Banner */}
            <div className="absolute bottom-4 left-0 w-[260px] p-4 bg-[#6054ba] flex items-center gap-2 z-10">
                <div className="w-6 h-6 rounded-full bg-[#ff5634] flex items-center justify-center shrink-0">
                    <Zap className="size-4 text-white" />
                </div>
                <span className="flex-1 text-[16px] font-medium text-white tracking-[-0.16px]">
                    Upgrade to unlock more power!
                </span>
                <ChevronRight className="size-6 text-white shrink-0" />
            </div>
        </aside>
    );
}