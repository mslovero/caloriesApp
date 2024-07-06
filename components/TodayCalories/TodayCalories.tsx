import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";

const TodayCalories = ({ total, consumed, Remaining }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={58} valueSuffix={"%"} />
      </View>
      <View style={styles.rightContainer}></View>
      <Text style={today}>TodayCalories</Text>
      <View style={styles.rightItem}>
        <Text>Total</Text>
        <Text>{Total}</Text>
      </View>
      <View style={styles.rightItem}>
        <Text>Consumido</Text>
        <Text>{consumed}</Text>
      </View>
      <View style={styles.rightItem}>
        <Text>Remaining</Text>
        <Text>{Remaining}</Text>
      </View>
    </View>
  );
};

export default TodayCalories;

const styles = StyleSheet.create({
  container: {},
  leftContainer: {},
  rightContainer: {},
});
