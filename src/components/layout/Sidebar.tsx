// @ts-nocheck
"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    ShoppingCart,
    CalendarDays,
    Star,
    Package,
    Zap,
    Gift,
    MapPin,
    MessageSquare,
    Building2,
    UtensilsCrossed,
    Grid3X3,
    DoorOpen,
    Truck,
    Users,
    QrCode,
    CreditCard,
    ArrowLeftRight,
    User,
    Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

interface NavCategory {
    title: string;
    items: NavItem[];
}

const navigation: NavCategory[] = [
    {
        title: "OVERVIEW",
        items: [
            { label: "Dashboard", href: "/", icon: <LayoutDashboard className="size-5" /> },
            { label: "Reports", href: "/reports", icon: <FileText className="size-5" /> },
        ],
    },
    {
        title: "OPERATIONS",
        items: [
            { label: "Orders", href: "/orders", icon: <ShoppingCart className="size-5" /> },
            { label: "Reservations", href: "/reservations", icon: <CalendarDays className="size-5" /> },
            { label: "Reviews", href: "/reviews", icon: <Star className="size-5" /> },
            { label: "Inventory", href: "/inventory", icon: <Package className="size-5" /> },
        ],
    },
    {
        title: "MARKETING",
        items: [
            { label: "Automation", href: "/automation", icon: <Zap className="size-5" /> },
            { label: "Loyalty Program", href: "/loyalty", icon: <Gift className="size-5" /> },
            { label: "Deals", href: "/deals", icon: <MapPin className="size-5" /> },
            { label: "Events", href: "/events", icon: <CalendarDays className="size-5" /> },
            { label: "Message", href: "/message", icon: <MessageSquare className="size-5" /> },
        ],
    },
    {
        title: "BUSINESS",
        items: [
            { label: "My Brands", href: "/brands", icon: <Building2 className="size-5" /> },
            { label: "Menu Management", href: "/menu", icon: <UtensilsCrossed className="size-5" /> },
            { label: "Tables / Sections", href: "/tables", icon: <Grid3X3 className="size-5" /> },
            { label: "Rooms", href: "/rooms", icon: <DoorOpen className="size-5" /> },
            { label: "Delivery Zone", href: "/delivery-zone", icon: <Truck className="size-5" /> },
            { label: "Suppliers", href: "/suppliers", icon: <Package className="size-5" /> },
            { label: "Teams", href: "/teams", icon: <Users className="size-5" /> },
            { label: "Smart Menu", href: "/smart-menu", icon: <UtensilsCrossed className="size-5" /> },
            { label: "QR Code Designer", href: "/qr-designer", icon: <QrCode className="size-5" /> },
        ],
    },
    {
        title: "FINANCE",
        items: [
            { label: "Transactions", href: "/transactions", icon: <CreditCard className="size-5" /> },
            { label: "Settlements", href: "/settlements", icon: <ArrowLeftRight className="size-5" /> },
            { label: "Account", href: "/account", icon: <User className="size-5" /> },
        ],
    },
    {
        title: "OTHER",
        items: [
            { label: "Translation Center", href: "/translation", icon: <Languages className="size-5" /> },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <aside className="flex w-[260px] flex-col bg-white py-6 px-4">
            {/* Logo */}
            <div className="mb-6 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-orange)] to-orange-600">
                    <span className="text-xl font-bold text-white">T</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
                {navigation.map((category) => (
                    <div key={category.title} className="flex flex-col gap-1">
                        <h3 className="px-4 pb-2 text-xs font-normal uppercase tracking-wide text-[var(--color-text-black-40)]">
                            {category.title}
                        </h3>
                        {category.items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-xl px-5 py-2.5 text-base transition-colors",
                                    isActive(item.href)
                                        ? "bg-[var(--color-brand-orange)] text-white"
                                        : "text-[var(--color-text-black-100)] hover:bg-gray-50"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            {/* Upgrade Banner */}
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-[var(--color-brand-purple)] p-4 text-white">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brand-orange)]">
                    <Zap className="size-4 text-white" />
                </div>
                <span className="flex-1 text-sm font-medium">Upgrade to unlock more power!</span>
            </div>
        </aside>
    );
}
