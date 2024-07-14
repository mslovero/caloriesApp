import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, isToday, parseISO } from "date-fns";
import { Meal } from "@/types";
const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(storageKey);
      if (currentSaveFood !== null) {
        const currentSaveFoodParsed = JSON.parse(currentSaveFood);
        currentSaveFoodParsed.push(meal);
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSaveFoodParsed)
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveFood = async ({ calories, name, portion }: Meal) => {
    try {
      const foodData = {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      };
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, foodData);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({ calories, name, portion }: Meal) => {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd");

      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: formattedDate,
      });

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods) as Meal[];

        const today = new Date();
        const todayUTC = new Date(
          Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate()
          )
        );

        // Filtro comidas para obtener solo las de hoy
        const todayFoods = parsedFoods.filter((meal) => {
          if (meal.date) {
            const mealDate = parseISO(meal.date);
            const isMealToday = isToday(mealDate);
            return isMealToday;
          }
          return false;
        });

        return todayFoods;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al recuperar las comidas:", error);
      throw error;
    }
  };
  const handleRemoveTodayFood = async (index: number) => {
    try {
      const TodayFood = await handleGetTodayFood();
      const filteredItem = TodayFood?.filter((item: Meal, itemIndex) => {
        return itemIndex !== index;
      });
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredItem)
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDelateTodayFood: handleRemoveTodayFood,
  };
};

export default useFoodStorage;
