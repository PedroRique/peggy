import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import Modal from "react-native-modal";
import { PColors } from "../shared/Colors";
import { CALENDAR_LOCALE_CONFIG } from "../shared/Constants";
import Button from "./Button";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";

interface CalendarDropProps {
  onClose: () => void;
  onSelectDate: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  editable?: boolean;
  value?: Date | null;
  unavailableDates?: { startDate: Date; endDate: Date }[];
}

const CalendarDrop: React.FC<CalendarDropProps> = ({
  onClose,
  onSelectDate,
  editable = true,
  label = "Select a Date",
  placeholder = "Select a date",
  value,
  unavailableDates = [],
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleDatePress = (date: DateData) => {
    setSelectedDate(date);
  };

  LocaleConfig.locales["br"] = CALENDAR_LOCALE_CONFIG;
  LocaleConfig.defaultLocale = "br";

  const getMarkedDates = () => {
    const markedDates: { [date: string]: any } = {};

    if (selectedDate) {
      markedDates[selectedDate.dateString] = {
        selected: true,
        selectedColor: PColors.Orange,
      };
    }

    const today = new Date();

    for (let i = 1; i < 9999; i++) {
      const pastDay = new Date();
      pastDay.setDate(today.getDate() - i);
      const pastDayString = pastDay.toISOString().split("T")[0];
      markedDates[pastDayString] = {
        disabled: true,
        disableTouchEvent: true,
        dotColor: "gray",
        disabledOpacity: 0.5,
      };
    }

    unavailableDates.forEach(({ startDate, endDate }) => {
      const orangeDays = [];

      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const formattedDate = currentDate.toISOString().split("T")[0];
        orangeDays.push(formattedDate);
      }

      orangeDays.forEach((date) => {
        markedDates[date] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: {
              backgroundColor: PColors.Orange,
              opacity: 0.5,
            },
            text: {
              color: PColors.Black,
            },
          },
        };
      });
    });

    return markedDates;
  };

  const handleApplyButtonPress = () => {
    if (selectedDate) {
      const { year, month, day } = selectedDate;
      onSelectDate(new Date(year, month - 1, day));
    }
    closeModal();
  };
  const placeholderColor = value ? PColors.Black : PColors.Grey;

  return (
    <View>
      <BoldText style={styles.headerText}>{label}</BoldText>
      <TouchableOpacity
        style={styles.button}
        onPress={!editable ? toggleCalendar : openModal}
      >
        <Text style={[styles.placeholder, { color: placeholderColor }]}>
          {value ? format(value, "dd/MM/yyyy") : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <BoldText style={styles.title}>{label}</BoldText>
              <Feather
                name="x"
                size={30}
                color={PColors.Black}
                onPress={closeModal}
              />
            </View>
            <Calendar
              onDayPress={handleDatePress}
              theme={{
                todayTextColor: PColors.Blue,
              }}
              markingType="custom"
              markedDates={{
                ...getMarkedDates(),
                [selectedDate?.dateString || ""]: {
                  selected: true,
                  selectedColor: PColors.Blue,
                },
              }}
              renderArrow={(direction) => (
                <View style={styles.arrowContainer}>
                  {direction === "left" ? (
                    <Feather
                      name="chevron-left"
                      size={30}
                      color={PColors.Blue}
                    />
                  ) : (
                    <Feather
                      name="chevron-right"
                      size={30}
                      color={PColors.Blue}
                    />
                  )}
                </View>
              )}
            />
            <View style={styles.calendar}>
              <Button title="Salvar" onPress={handleApplyButtonPress} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    bottom: -20.7,
    left: -20.7,
    right: -20.7,
    maxHeight: 600,
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  buttonText: {
    color: PColors.White,
    fontSize: 16,
  },
  placeholder: {},
  button: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: PColors.Black,
  },
  calendar: {
    marginTop: 16,
  },
  arrowContainer: {
    padding: 10,
  },
});

export default CalendarDrop;
