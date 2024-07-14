import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { FC } from "react";
import { Meal } from "@/types";
import MealItem from "../MealItem";

type TodayMealsProps = {
  foods: Meal[];
  onCompleteAddRemove?: () => void;
};

const TodalMeals: FC<TodayMealsProps> = ({ foods, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal: Meal, index) => (
          <MealItem
            key={`today-meal-item-${meal.name}-${index}`}
            {...meal}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TodalMeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  content: { marginVertical: 16 },
  title: {
    fontSize: 16,
  },
});
