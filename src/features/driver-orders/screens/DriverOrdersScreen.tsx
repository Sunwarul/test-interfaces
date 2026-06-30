import { useState, useMemo } from "react";
import { View, Text, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageHeader } from "@/components/layout/PageHeader";
import { TripChart } from "../components/TripChart";
import { SearchBar } from "../components/SearchBar";
import { DateRangeChip } from "../components/DateRangeChip";
import { OrderRow } from "../components/OrderRow";
import { DatePickerModal } from "../components/DatePickerModal";
import type { OrderItem, EarningsData } from "../types";
import { type TimePeriod } from "../config";
import { format } from "date-fns";

// Mock data for demo purposes (since API returns empty datasets)
const MOCK_ORDERS: OrderItem[] = [
  {
    id: "1",
    orderNumber: "#3018",
    itemCount: 1,
    price: 6.5,
    pickupTime: "2024-03-16T10:10:00Z",
    dropoffTime: "2024-03-16T10:39:00Z",
    pickupAddress: {
      id: "p1",
      name: "Juice N Bite",
      address: "Avenue 2 ResDubai, Discovery Gardens",
      type: "pickup",
    },
    dropoffAddress: {
      id: "d1",
      name: "",
      address: "No 812, 6 Floor, Septa Building, Washing Ave. Manchester",
      type: "dropoff",
    },
    status: "completed",
  },
  {
    id: "2",
    orderNumber: "#3017",
    itemCount: 2,
    price: 12.0,
    pickupTime: "2024-03-16T09:30:00Z",
    dropoffTime: "2024-03-16T10:00:00Z",
    pickupAddress: {
      id: "p2",
      name: "Pizza Palace",
      address: "123 Main Street, Downtown",
      type: "pickup",
    },
    dropoffAddress: {
      id: "d2",
      name: "",
      address: "456 Oak Avenue, Suburb",
      type: "dropoff",
    },
    status: "completed",
  },
  {
    id: "3",
    orderNumber: "#3016",
    itemCount: 1,
    price: 8.5,
    pickupTime: "2024-03-15T14:00:00Z",
    dropoffTime: "2024-03-15T14:45:00Z",
    pickupAddress: {
      id: "p3",
      name: "Burger Joint",
      address: "789 Fast Food Lane",
      type: "pickup",
    },
    dropoffAddress: {
      id: "d3",
      name: "",
      address: "321 Elm Street, Westside",
      type: "dropoff",
    },
    status: "completed",
  },
];

// Mock earnings data
const MOCK_EARNINGS: Record<TimePeriod, EarningsData> = {
  Today: {
    totalAmount: 980.5,
    orderCount: 6,
    period: "Today",
    chartData: [
      { label: "12-4", value: 150, isHighlighted: false },
      { label: "4-8", value: 80, isHighlighted: false },
      { label: "8-12", value: 200, isHighlighted: false },
      { label: "12-4", value: 300, isHighlighted: true },
      { label: "4-8", value: 120, isHighlighted: false },
      { label: "8-12", value: 130.5, isHighlighted: false },
    ],
  },
  Weekly: {
    totalAmount: 3861.5,
    orderCount: 24,
    period: "Weekly",
    chartData: [
      { label: "Mon", value: 500, isHighlighted: false },
      { label: "Tue", value: 420, isHighlighted: false },
      { label: "Wed", value: 660, isHighlighted: true },
      { label: "Thu", value: 380, isHighlighted: false },
      { label: "Fri", value: 520, isHighlighted: false },
      { label: "Sat", value: 481.5, isHighlighted: false },
      { label: "Sun", value: 400, isHighlighted: false },
    ],
  },
  Monthly: {
    totalAmount: 19261.5,
    orderCount: 86,
    period: "Monthly",
    chartData: [
      { label: "W1", value: 4500, isHighlighted: false },
      { label: "W2", value: 3800, isHighlighted: false },
      { label: "W3", value: 6600, isHighlighted: true },
      { label: "W4", value: 4361.5, isHighlighted: false },
    ],
  },
  Yearly: {
    totalAmount: 19261.5,
    orderCount: 86,
    period: "Yearly",
    chartData: [
      { label: "Jan", value: 660, isHighlighted: true },
      { label: "Feb", value: 520, isHighlighted: false },
      { label: "Mar", value: 480, isHighlighted: false },
      { label: "Apr", value: 0, isHighlighted: false },
      { label: "May", value: 0, isHighlighted: false },
      { label: "Jun", value: 0, isHighlighted: false },
      { label: "Jul", value: 0, isHighlighted: false },
      { label: "Aug", value: 0, isHighlighted: false },
      { label: "Sep", value: 0, isHighlighted: false },
      { label: "Oct", value: 0, isHighlighted: false },
      { label: "Nov", value: 0, isHighlighted: false },
      { label: "Dec", value: 0, isHighlighted: false },
    ],
  },
};

interface SectionData {
  title: string;
  data: OrderItem[];
}

export default function DriverOrdersScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Use mock data for now since API returns empty datasets
  const orders = MOCK_ORDERS;
  const earnings = MOCK_EARNINGS[selectedPeriod];

  // Filter orders based on search
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return orders;
    const query = searchQuery.toLowerCase();
    return orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.pickupAddress.address.toLowerCase().includes(query) ||
        order.dropoffAddress.address.toLowerCase().includes(query)
    );
  }, [orders, searchQuery]);

  // Group orders by date
  const sections = useMemo((): SectionData[] => {
    const groups: Record<string, OrderItem[]> = {};

    filteredOrders.forEach((order) => {
      const date = format(new Date(order.pickupTime), "EEEE, MMM d, yyyy");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
    });

    return Object.entries(groups).map(([title, data]) => ({ title, data }));
  }, [filteredOrders]);

  const handleDateRangeSave = (start: Date, end: Date) => {
    setDateRange({ start, end });
    setShowDatePicker(false);
  };

  const handleDateRangeClear = () => {
    setDateRange(null);
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Orders" showBackButton />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderRow order={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View className="px-6 py-2">
            <Text className="text-sm font-bold text-text-muted">{title}</Text>
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* Trip Chart */}
            <View className="px-6 mb-6">
              <TripChart
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
                totalAmount={earnings.totalAmount}
                orderCount={earnings.orderCount}
                chartData={earnings.chartData}
                highlightedValue={660}
              />
            </View>

            {/* Search Bar */}
            <View className="mb-6">
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFilterPress={() => setShowDatePicker(true)}
              />
            </View>

            {/* Date Range Chip (shown when filter is active) */}
            {dateRange && (
              <View className="px-6 mb-4">
                <DateRangeChip
                  startDate={dateRange.start.toISOString()}
                  endDate={dateRange.end.toISOString()}
                  onPress={() => setShowDatePicker(true)}
                />
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-base text-text-secondary">No orders found</Text>
          </View>
        }
        contentContainerClassName="pb-6"
        stickySectionHeadersEnabled={false}
      />

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSave={handleDateRangeSave}
        onClear={handleDateRangeClear}
        initialStartDate={dateRange?.start}
        initialEndDate={dateRange?.end}
      />
    </SafeAreaView>
  );
}