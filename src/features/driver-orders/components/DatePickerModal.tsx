// @ts-nocheck
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "@/utils/icons";

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (startDate: Date, endDate: Date) => void;
  onClear: () => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function DatePickerModal({
  visible,
  onClose,
  onSave,
  onClear,
  initialStartDate,
  initialEndDate,
}: DatePickerModalProps) {
  const [currentMonth, setCurrentMonth] = useState(initialStartDate || new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate || null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate || null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handleDayPress = (day: Date) => {
    if (selecting === "start") {
      setStartDate(day);
      setEndDate(null);
      setSelecting("end");
    } else {
      if (startDate && day < startDate) {
        setStartDate(day);
        setEndDate(null);
        setSelecting("end");
      } else {
        setEndDate(day);
      }
    }
  };

  const handleSave = () => {
    if (startDate && endDate) {
      onSave(startDate, endDate);
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelecting("start");
    onClear();
  };

  const isInRange = (day: Date) => {
    if (startDate && endDate) {
      return isWithinInterval(day, { start: startDate, end: endDate });
    }
    return false;
  };

  const isSelected = (day: Date) => {
    return (startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/20">
        <View className="bg-white rounded-t-[32px]">
          {/* Header */}
          <View className="p-6 items-center">
            <View className="w-[100px] h-[6px] bg-bg-black-10 rounded-full mb-4" />
            <Text className="text-2xl font-bold text-text-primary tracking-[-0.48px]">
              {startDate && endDate
                ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`
                : "Select Date Range"}
            </Text>
          </View>

          {/* Month Navigation */}
          <View className="flex-row items-center justify-between px-6 pb-4">
            <Pressable
              className="w-12 h-12 items-center justify-center"
              onPress={() => setCurrentMonth(addMonths(currentMonth, -1))}
            >
              <ChevronLeft className="text-text-primary" size={24} />
            </Pressable>
            <Text className="text-xl font-bold text-text-primary tracking-[-0.2px]">
              {format(currentMonth, "MMMM yyyy")}
            </Text>
            <Pressable
              className="w-12 h-12 items-center justify-center"
              onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="text-text-primary" size={24} />
            </Pressable>
          </View>

          {/* Weekday Headers */}
          <View className="flex-row px-6 pb-2">
            {WEEKDAYS.map((day, index) => (
              <View key={index} className="flex-1 items-center">
                <Text className="text-base font-medium text-text-secondary">{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <ScrollView className="max-h-[300px]">
            <View className="flex-row flex-wrap px-6">
              {days.map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const selected = isSelected(day);
                const inRange = isInRange(day);

                return (
                  <Pressable
                    key={index}
                    className="w-[14.28%] aspect-square items-center justify-center"
                    onPress={() => handleDayPress(day)}
                    disabled={!isCurrentMonth}
                  >
                    <View
                      className={`
                        w-12 h-12 items-center justify-center rounded-full
                        ${selected ? "bg-text-primary" : ""}
                        ${inRange && !selected ? "bg-bg-black-5" : ""}
                      `}
                    >
                      <Text
                        className={`
                          text-base
                          ${!isCurrentMonth ? "text-transparent" : ""}
                          ${selected ? "text-white font-medium" : "text-text-secondary"}
                        `}
                      >
                        {format(day, "d")}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="p-6 gap-3">
            <Pressable
              className="bg-primary h-14 rounded-[32px] items-center justify-center"
              onPress={handleSave}
            >
              <Text className="text-xl font-bold text-white tracking-[-0.2px]">Save</Text>
            </Pressable>
            <Pressable
              className="bg-bg-black-10 h-14 rounded-[32px] items-center justify-center"
              onPress={handleClear}
            >
              <Text className="text-xl font-bold text-text-primary tracking-[-0.2px]">Clear</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
