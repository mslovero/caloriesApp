import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

export type TodayCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
};
const TodayCalories: FC<TodayCaloriesProps> = ({
  total = 2000,
  consumed = 0,
  remaining = 0,
  percentage = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={percentage} valueSuffix={"%"} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.today}>TodayCalories</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Consumido</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Restante</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodayCalories;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  today: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 14,
  },
  rightItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  consumed: {},

  rightItemLeyend: {
    flex: 1,
  },
  rightItemValue: {
    flex: 1,
    textAlign: "right",
  },
});
