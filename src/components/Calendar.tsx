import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import RNPickerSelect from "react-native-picker-select"; // Import the dropdown component
import { PColors } from "../shared/Colors";

interface CalendarDropProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
}

const CalendarDrop: React.FC<CalendarDropProps> = ({
  isVisible,
  onClose,
  onSelectDate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().split("-").slice(0, 2).join("-")
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const getMarkedDates = (selectedMonth: string) => {
    const today = new Date();
    const markedDates: { [date: string]: any } = {};

    markedDates[today.toISOString().split("T")[0]] = { selected: true };

    const daysInMonth = new Date(selectedMonth + "-01").getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfMonth = new Date(
        selectedMonth + "-" + i.toString().padStart(2, "0")
      );
      markedDates[dayOfMonth.toISOString().split("T")[0]] = {
        disabled: true,
        disableTouchEvent: true,
        selected: false,
        dotColor: "gray",
        disabledOpacity: 0.5,
      };
    }

    return markedDates;
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Open Calendar</Text>
      </TouchableOpacity>
      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.dropdownContainer}>
            </View>
            <Calendar
              onDayPress={(day) => {
                closeModal();
                onSelectDate(day.dateString);
              }}
              theme={{
                todayTextColor: PColors.Orange,
              }}
              markingType={"custom"}
              markedDates={getMarkedDates(selectedMonth)}
            />
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
    borderRadius: 8,
    padding: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default CalendarDrop;
