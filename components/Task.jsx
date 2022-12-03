import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ text, date, time, reminder, completed }) => {
  return (
    <View>
      <View
        style={[
          styles.item,
          completed
            ? { backgroundColor: "#98CBB4" }
            : { backgroundColor: "#CCC9DC" },
        ]}
      >
        <View style={styles.ciricleTitle}>
          <View style={styles.circular}></View>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <Text style={styles.itemText}>
          {date.toDateString() === new Date().toDateString()
            ? ("0" + date.getHours()).slice(-2) +
              ":" +
              ("0" + date.getMinutes()).slice(-2)
            : ("0" + (date.getMonth() + 1)).slice(-2) +
              "/" +
              ("0" + date.getDate()).slice(-2) +
              "/" +
              date.getFullYear()}
        </Text>
      </View>
      {completed && <View style={styles.line} />}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ciricleTitle: {
    flexDirection: "row",
  },
  itemLeft: {
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    color: "#423B0B",
    fontSize: 18,
    fontWeight: "bolder",
    paddingStart: 7,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#423B0B",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
  },
  line: {
    height: "45%",
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    position: "absolute",
  },
});

export default Task;
