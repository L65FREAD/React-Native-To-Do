import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Switch,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Button,
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
  const [reminder, setReminder] = useState(false);

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
      setTime(date);
    }
  };

  const handleReminderToggle = () => {
    setReminder((previousState) => !previousState);
  };

  const handleTaskAddToggle = () => {
    setAddTaskSelected((previousState) => !previousState);
  };

  const handleDiscardTask = () => {
    setAddTaskSelected(false);
    setText(null);
    setReminder(false);
    setDate(new Date());
    setTime(new Date());
  };

  const handleSaveClick = () => {};

  return (
    <View style={styles.addTaskWrapper}>
      <Pressable
        style={styles.initialDisplayWrapper}
        onPress={handleTaskAddToggle}
      >
        {addTaskSelected && (
          <TextInput
            placeholder="something's coming up..."
            value={text}
            placeholderTextColor={"#00000030"}
            onTextChange={(text) => setText(text)}
          />
        )}
        {!addTaskSelected && (
          <Text style={styles.placeholderColor}>something's coming up...</Text>
        )}
        <Text>+</Text>
      </Pressable>
      {addTaskSelected && (
        <View style={styles.popUp}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="calendar-month"
              size={24}
              color={"#1B2A41"}
            />
            <RNDateTimePicker
              mode="date"
              value={date}
              onChange={handleDateChange}
              style={styles.dateTimePicker}
            />
            <FontAwesome
              name="clock-o"
              size={24}
              color={"#1B2A41"}
              style={styles.clock}
            />
            <RNDateTimePicker
              mode="time"
              value={time}
              onChange={handleTimeChange}
              style={styles.dateTimePicker}
              accentColor="#fff"
            />
          </View>
          <View style={styles.row}>
            <Switch
              onValueChange={handleReminderToggle}
              value={reminder}
              thumbColor={"#44B5B5"}
              trackColor={{ false: "#0F8888", true: "#1B2A41" }}
              ios_backgroundColor={"#0F8888"}
              style={styles.toggle}
            />
            <Text style={styles.whiteText}>Remind Me</Text>
          </View>
          <View style={styles.thirdRow}>
            <Button
              title="Discard"
              style={styles.discard}
              color={"red"}
              onPress={handleDiscardTask}
            />
            <Button title="Save" style={styles.discard} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addTaskWrapper: {
    width: "100%",
    backgroundColor: "#41D3D3",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  initialDisplayWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  placeholderColor: {
    color: "#00000030",
  },
  popUp: {
    paddingTop: 5,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 7,
  },
  thirdRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  discard: {},
  save: {},
  clock: {
    marginStart: 10,
  },
  dateTimePicker: {
    marginStart: 5,
  },
  toggle: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
    marginEnd: -5,
    marginStart: -10,
  },
});

export default AddTask;
