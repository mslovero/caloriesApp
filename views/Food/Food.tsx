import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "@/components/AddFoodModal";
import useFoodStorage from "@/hooks/useFoodStorage";

const Food = () => {
  const [visibleButton, setVisibleButton] = useState<boolean>(false);
  const { onGetFoods } = useFoodStorage();

  const handleclose = (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Comida guardada exitosamente");
    }
    setVisibleButton(false);
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
          <Input placeholder="carne, gaseosa, manzana..." />
        </View>
        <Button
          title="Buscar"
          color="#ade8af"
          titleStyle={styles.titleButton}
          radius="lg"
        />
      </View>
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
});
