import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./../components/Task";
import AddTask from "../components/AddTask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

function Home() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("task_list", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("task_list");
      valueReturned = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTaskItems([...valueReturned]);
    } catch (e) {
      // error reading value
    }
  };

  const handleAddTask = (task) => {
    setTaskItems([...taskItems, task]);
    setTask(null);
    storeData([...taskItems, task]);
  };

  const removeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    storeData([...itemsCopy]);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let completedItem = {
      text: itemsCopy[index]["text"],
      date: itemsCopy[index]["date"],
      time: itemsCopy[index]["time"],
      reminder: itemsCopy[index]["reminder"],
      completed: true,
    };
    itemsCopy.splice(index, 1, completedItem);
    setTaskItems(itemsCopy);
    storeData([...itemsCopy]);
  };

  return (
    <View style={styles.container}>
      {/* Write a task */}
      <AddTask handleAddTask={handleAddTask} />
      <Text style={styles.sectionTitle}>Completions:</Text>
      <View style={styles.items}>
        {taskItems
          .filter((item) => item["completed"])
          .map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => removeTask(index)}>
                <Task
                  text={item["text"]}
                  date={new Date(item["date"])}
                  time={new Date(item["time"])}
                  reminder={item["reminder"]}
                  completed={item["completed"]}
                />
              </TouchableOpacity>
            );
          })}
      </View>
      <Text style={styles.sectionTitle}>Upcoming:</Text>
      <View style={styles.items}>
        {taskItems
          .filter((item) => !item["completed"])
          .map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task
                  text={item["text"]}
                  date={new Date(item["date"])}
                  time={new Date(item["time"])}
                  reminder={item["reminder"]}
                  completed={item["completed"]}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEC",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  sectionTitle: {
    paddingVertical: 15,
    fontSize: 28,
    fontWeight: "bold",
    color: "#474935",
  },
  items: {
    marginTop: 5,
  },
});

export default Home;
