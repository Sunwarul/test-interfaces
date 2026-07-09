// @ts-nocheck
import { useState, useMemo } from "react";
import { View, Text, SectionList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageHeader } from "@/components/layout/PageHeader";
import { TripChart } from "../components/TripChart";
import { SearchBar } from "../components/SearchBar";
import { DateRangeChip } from "../components/DateRangeChip";
import { OrderRow } from "../components/OrderRow";
import { DatePickerModal } from "../components/DatePickerModal";
import { useOrders, useCloneOrder, useDeleteOrder } from "../hooks";
import type { OrderItem, EarningsData } from "../types";
import { type TimePeriod } from "../config";
import { format } from "date-fns";

// Mock earnings data (in production, this would come from API)
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

  // Fetch orders using React Query
  const {
    data: ordersResponse,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error: ordersError,
    refetch: refetchOrders,
  } = useOrders({
    period: selectedPeriod,
    searchQuery,
    dateRange: dateRange ?? undefined,
  });

  // Clone mutation hook
  const cloneMutation = useCloneOrder();

  // Delete mutation hook
  const deleteMutation = useDeleteOrder();

  // Raw API order data type (snake_case from API)
  interface RawApiOrder {
    id: string;
    order_number?: string;
    orderNumber?: string;
    item_count?: number;
    itemCount?: number;
    price?: number;
    pickup_time?: string;
    pickupTime?: string;
    dropoff_time?: string;
    dropoffTime?: string;
    pickup_address?: {
      id?: string;
      name?: string;
      address?: string;
    };
    pickupAddress?: {
      id?: string;
      name?: string;
      address?: string;
    };
    dropoff_address?: {
      id?: string;
      name?: string;
      address?: string;
    };
    dropoffAddress?: {
      id?: string;
      name?: string;
      address?: string;
    };
    status?: string;
  }

  // Transform API response to OrderItem array
  // In production, this would parse the actual API response structure
  const orders = useMemo((): OrderItem[] => {
    if (!ordersResponse?.data?.datasets) {
      return [];
    }
    // Transform API datasets to OrderItem format
    // This adapts to the actual API response structure
    const datasets = ordersResponse.data.datasets;
    const ordersData = (datasets.orders ?? []) as RawApiOrder[];
    return ordersData.map((item) => ({
      id: item.id,
      orderNumber: item.order_number ?? item.orderNumber ?? `#${item.id?.slice(-4) ?? "0000"}`,
      itemCount: item.item_count ?? item.itemCount ?? 1,
      price: item.price ?? 0,
      pickupTime: item.pickup_time ?? item.pickupTime ?? new Date().toISOString(),
      dropoffTime: item.dropoff_time ?? item.dropoffTime ?? new Date().toISOString(),
      pickupAddress: {
        id: item.pickup_address?.id ?? `p-${item.id}`,
        name: item.pickup_address?.name ?? "",
        address: item.pickup_address?.address ?? "",
        type: "pickup" as const,
      },
      dropoffAddress: {
        id: item.dropoff_address?.id ?? `d-${item.id}`,
        name: item.dropoff_address?.name ?? "",
        address: item.dropoff_address?.address ?? "",
        type: "dropoff" as const,
      },
      status: item.status ?? "completed",
    }));
  }, [ordersResponse]);

  // Use mock earnings data (would be fetched from API in production)
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

  const handleCloneOrder = (orderId: string) => {
    cloneMutation.mutate(orderId, {
      onSuccess: (data) => {
        // Handle successful clone - data contains the new cloned record info
        console.log("Order cloned successfully:", data.data.main.id);
      },
      onError: (error) => {
        // Handle clone error
        console.error("Failed to clone order:", error);
      },
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    deleteMutation.mutate(orderId, {
      onSuccess: (data) => {
        // Handle successful delete
        console.log("Order deleted successfully:", data.data.deleted_entity.id);
      },
      onError: (error) => {
        // Handle delete error
        console.error("Failed to delete order:", error);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Orders" showBackButton />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderRow
            order={item}
            onClone={handleCloneOrder}
            onDelete={handleDeleteOrder}
            isCloning={cloneMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
        )}
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
          isLoadingOrders ? (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#6054ba" />
              <Text className="mt-4 text-base text-text-secondary">Loading orders...</Text>
            </View>
          ) : isErrorOrders ? (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-base text-error">
                {ordersError?.message ?? "Failed to load orders"}
              </Text>
              <Text
                className="mt-2 text-sm text-primary"
                onPress={() => refetchOrders()}
              >
                Tap to retry
              </Text>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-base text-text-secondary">No orders found</Text>
            </View>
          )
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
