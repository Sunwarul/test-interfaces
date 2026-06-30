import { View, Text, Pressable } from "react-native";
import { cn } from "@/utils/cn";
import { TIME_PERIODS, type TimePeriod } from "../config";

interface ChartBar {
  label: string;
  value: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
}

interface TripChartProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  totalAmount: number;
  orderCount: number;
  chartData: ChartBar[];
  highlightedValue?: number;
}

export function TripChart({
  selectedPeriod,
  onPeriodChange,
  totalAmount,
  orderCount,
  chartData,
  highlightedValue,
}: TripChartProps) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <View className="bg-bg-black-5 rounded-[32px] p-6 gap-10">
      {/* Tabs and Amount */}
      <View className="gap-4">
        {/* Period Tabs */}
        <View className="flex-row gap-1">
          {TIME_PERIODS.map((period) => {
            const isActive = selectedPeriod === period;
            return (
              <Pressable
                key={period}
                className={cn(
                  "flex-1 py-2 px-4 rounded-[32px] items-center justify-center",
                  isActive ? "bg-text-primary" : "bg-white"
                )}
                onPress={() => onPeriodChange(period)}
                accessibilityLabel={`${period} period`}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  className={cn(
                    "text-sm font-bold",
                    isActive ? "text-white" : "text-text-primary"
                  )}
                >
                  {period}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Amount Display */}
        <View className="flex-row items-center justify-between pb-6">
          <Text className="flex-1 text-[40px] font-bold text-text-primary tracking-[-1.6px]">
            {formatCurrency(totalAmount)}
          </Text>
          <Text className="text-base font-medium text-text-primary tracking-[-0.16px]">
            {orderCount} {orderCount === 1 ? "Order" : "Orders"}
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View className="flex-row gap-2">
        {chartData.map((bar, index) => {
          const heightPercent = (bar.value / maxValue) * 100;
          const isHighlighted = bar.isHighlighted || bar.value === highlightedValue;

          return (
            <View key={index} className="flex-1 items-center">
              {/* Tooltip for highlighted bar */}
              {isHighlighted && (
                <View className="absolute -top-8 bg-rating-yellow rounded-2xl px-2 py-1 z-10">
                  <Text className="text-sm font-bold text-text-primary">
                    {formatCurrency(bar.value)}
                  </Text>
                </View>
              )}

              {/* Bar */}
              <View className="flex-1 w-full justify-end">
                <View
                  className={cn(
                    "w-full rounded-3xl",
                    bar.isSelected ? "bg-white" : "bg-bg-black-5"
                  )}
                  style={{ height: `${Math.max(heightPercent, 5)}%` }}
                />
              </View>

              {/* Label */}
              <View
                className={cn(
                  "mt-2 px-1 py-1 rounded-[32px]",
                  bar.isSelected ? "bg-white" : "bg-bg-black-5"
                )}
              >
                <Text className="text-xs text-text-primary text-center">
                  {bar.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}