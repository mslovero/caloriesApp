import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "@/components/Header";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Meal, RootStackParams } from "@/types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import useFoodStorage from "@/hooks/useFoodStorage";
import TodayCalories, { TodayCaloriesProps } from "@/components/TodayCalories";
import TodalMeals from "@/components/TodayMeals/TodalMeals";
const totalCaloriesPerDay = 2000;
const Home = () => {
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: totalCaloriesPerDay,
  });
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParams, "Home">>();

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0
      );
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;
      setTodayStatistics({
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
        total: totalCaloriesPerDay,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      if (todayFoodResponse) {
        setTodayFood(todayFoodResponse);
        calculateTodayStatistics(todayFoodResponse);
      } else {
        setTodayFood([]);
      }
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood])
  );
  const actionCalories = () => {
    navigate("Food");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.leyend}>Calorias</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            radius={"lg"}
            type="solid"
            color="#4ecb71"
            onPress={actionCalories}
          >
            <Icon name="add-circle-outline" color="white" />
          </Button>
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodalMeals
        foods={todayFood}
        onCompleteAddRemove={() => loadTodayFood()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    alignContent: "flex-end",
    justifyContent: "center",
  },
  caloriesContainer: {
    alignItems: "center",
    marginVertical: 24,
    flexDirection: "row",
  },
  leyend: {
    fontSize: 20,
  },
});
