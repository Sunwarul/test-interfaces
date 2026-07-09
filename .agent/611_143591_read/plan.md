# Reservations Screen Implementation Plan

## 1. Layout & Colocation

### Dashboard Layout Structure
- `src/app/[locale]/(dashboard)/layout.tsx` - Auth guard + sidebar + main content area
- `src/components/layout/Sidebar.tsx` - Full sidebar navigation with all menu items
- `src/components/layout/MainHeader.tsx` - Brand selector + header buttons

### Reservations Feature Structure
```
src/app/[locale]/(dashboard)/reservations/
├── components/
│   ├── ReservationsPage.tsx        # Main list screen
│   ├── ReservationsTable.tsx      # Table with columns
│   ├── ReservationsFilters.tsx    # Search + status + date filters
│   ├── ReservationStatusBadge.tsx # Status pill component
│   ├── ReservationDetailPopup.tsx # Detail modal
│   └── DatePicker.tsx             # Calendar date picker
├── config/reservations.config.ts  # API IDs (as const)
├── hooks/useReservations.ts       # List hook
├── services/reservations.service.ts # API calls
├── types/reservations.types.ts    # Zod + TypeScript types
└── page.tsx                       # Thin wrapper
```

## 2. Config IDs

From Interface API Guide:
```ts
export const READ_RESERVATION_CONFIG = {
  component_id: "68c07ba8fd692a63c00add48",
  module_id: "699730e0f95ada2d9e0ffbef",
  section_id: "699730e3f95ada2d9e0ffbf3",
  interface_id: "699589dc612b0f969a1f7473",
  brand_service_id: "697bb7b883ed8855500e83d8",
  project_id: "68bec562008c0eee11657a75"
} as const;
```

## 3. Component Audit

### New Components
- `Sidebar.tsx` - Full navigation sidebar (shared across dashboard)
- `MainHeader.tsx` - Header with brand selector (shared across dashboard)
- `ReservationsPage.tsx` - Main list screen
- `ReservationsTable.tsx` - Table with sortable columns
- `ReservationsFilters.tsx` - Filter bar with search, status, date
- `ReservationStatusBadge.tsx` - Status pill (Pending/Confirmed/Cancelled/etc)
- `ReservationDetailPopup.tsx` - Modal with reservation details
- `DatePicker.tsx` - Calendar widget

### Existing Components to Reuse
- `Button` from shadcn/ui
- `Input` from shadcn/ui
- `Select` from shadcn/ui
- `Dialog` from shadcn/ui
- `Table` components from shadcn/ui
- `Badge` from shadcn/ui
- `Skeleton` from shadcn/ui

## 4. Service & Hook Layer

### Service
```ts
// reservations.service.ts
export async function getReservation(id: string, config: Config) {
  return apiClient.get(`/entities/read/${id}`, { params: config });
}
```

### Hook
```ts
// useReservations.ts
export function useReservation(id: string) {
  return useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getReservation(id, READ_RESERVATION_CONFIG)
  });
}
```

## 5. Tailwind Token Audit

### New Design Tokens (add to globals.css)
```css
/* Status colors */
--color-status-blue-bg: #d1e2fb;
--color-status-blue-text: #1870eb;
--color-status-yellow-bg: #fcf3cc;
--color-status-yellow-text: #957c1c;
--color-status-red-bg: #f9cfcf;
--color-status-red-text: #e10e0e;

/* Brand orange */
--color-brand-orange: #ff5634;

/* Text variants */
--color-text-black-40: rgba(26, 26, 26, 0.4);
--color-text-black-60: rgba(26, 26, 26, 0.6);
```

### Typography Utilities
```css
@utility text-title-desktop { font-size: 32px; font-weight: 700; line-height: 40px; letter-spacing: -0.96px; }
@utility text-body-normal { font-size: 16px; font-weight: 400; line-height: 20px; letter-spacing: -0.16px; }
@utility text-caption-normal { font-size: 13px; font-weight: 400; line-height: 16px; }
@utility text-caption-bold { font-size: 13px; font-weight: 700; line-height: 16px; }
@utility text-button-small { font-size: 14px; font-weight: 700; line-height: 16px; }
```

## 6. Navigation Integration

### Sidebar Menu Items
- OVERVIEW: Dashboard, Reports
- OPERATIONS: Orders, Reservations (active), Reviews, Inventory
- MARKETING: Automation, Loyalty Program, Deals, Events, Message
- BUSINESS: My Brands, Menu Management, Tables/Sections, Rooms, Delivery Zone, Suppliers, Teams, Smart Menu, QR Code Designer
- FINANCE: Transactions, Settlements, Account
- OTHER: Translation Center

### Route Addition
Add to sidebar navigation: `/reservations` → Reservations

## 7. UI States

### Table States
- Loading: Skeleton rows
- Error: ErrorState with retry
- Empty: EmptyState with CTA
- No results (filtered): "No results" + Reset filters

### Detail Modal States
- Loading: Skeleton
- Error: ErrorState
- Success: Render fields

## 8. Key Design Details

### Table
- Header: 48px height, bg black/5, border-bottom
- Row: 64px height, bg white/60, border-bottom
- Column widths: # (80px), Date (flex), Time (flex), Guests (96px), Status (166px), Actions (247px)

### Status Badges
- Pending: yellow bg (#fcf3cc), orange text (#957c1c)
- Confirmed: blue bg (#d1e2fb), blue text (#1870eb)
- Cancelled: red bg (#f9cfcf), red text (#e10e0e)
- Request Expired: red bg (#f9cfcf), red text (#e10e0e)
- On the Way: blue bg (#d1e2fb), blue text (#1870eb)

### Filters
- Search input: 200px width
- Status dropdown: 160px width
- Date picker: 160px width
- "Make a Reservation" button: black bg, white text, pill shape