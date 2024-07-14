import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "@/components/AddFoodModal";
import useFoodStorage from "@/hooks/useFoodStorage";
import { Meal } from "@/types";
import MealItem from "@/components/MealItem";

const Food = () => {
  const [visibleButton, setVisibleButton] = useState<boolean>(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>("");

  const { onGetFoods } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodResponse = await onGetFoods();
      setFoods(foodResponse);
      console.log("desde food", foodResponse);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleclose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Comida guardada exitosamente");
      loadFoods();
    }
    setVisibleButton(false);
  };
  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      console.log(result);

      const searchLower = search.toLowerCase();
      console.log("Palabra de búsqueda:", searchLower);

      const filteredFoods = result.filter((item: Meal) =>
        item.name.toLowerCase().includes(searchLower)
      );

      console.log("Resultados filtrados:", filteredFoods);

      setFoods(filteredFoods);
      setSearch(""); // Limpiar el input después de la búsqueda
    } catch (error) {
      console.log(error);
      setFoods([]);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.leyend}>Agregar Comida</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            radius={"lg"}
            type="solid"
            color="#4ecb71"
            onPress={() => setVisibleButton(true)}
          >
            <Icon name="add-circle-outline" color="white" />
          </Button>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="carne, gaseosa, manzana..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title="Buscar"
          color="#ade8af"
          titleStyle={styles.titleButton}
          radius="lg"
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal, index) => (
          // <MealItem key={`my-meal-item-${meal.name}`} {...meal} />
          <MealItem
            key={`my-meal-item-${meal.name}-${index}`}
            {...meal}
            isAbleToAdd
          />
        ))}
      </ScrollView>
      <AddFoodModal visible={visibleButton} onClose={handleclose} />
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  leyend: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  titleButton: {
    color: "#000",
    fontSize: 14,
  },
  content: {},
});
