import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";

function AddTask() {
  const [addTaskSelected, setAddTaskSelected] = useState(false);

  const [text, setText] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("task_list", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setDate(date);
    }
  };

  const handleTimeChange = (event, date) => {
    if (event.type === "set") {
      setTime(date.getTime());
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemTop}>
        <View style={styles.topLeft}>
          <Text>something's comming up...</Text>
        </View>
        <View style={styles.topRight}>
          <Text>+</Text>
        </View>
      </View>
      {addTaskSelected && (
        <View style={styles.itemLower}>
          <View style={styles.itemMiddle}>
            <View style={styles.middleTop}>
              <MaterialCommunityIcons
                name="calendar-month"
                size={24}
                color={"#1B2A41"}
              />
              <RNDateTimePicker
                mode="date"
                value={date}
                onChange={handleDateChange}
              />
              <FontAwesome name="clock-o" size={24} color={"#1B2A41"} />
              <RNDateTimePicker
                mode="time"
                value={time}
                onChange={handleDateChange}
              />
            </View>
            <View style={styles.middleBottom}></View>
          </View>
          <View style={styles.itemBottom}></View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {},
  itemTop: {},
  topLeft: {},
  topRight: {},
  itemLower: {},
  itemMiddle: {},
  middleTop: {},
  middleBottom: {},
  itemBottom: {},
});

export default AddTask;
