import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import { Button, Icon } from "@rneui/themed";

const Food = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.leyend}>Agregar Comida</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button radius={"lg"} type="solid" color="#4ecb71">
            <Icon name="add-circle-outline" color="white" />
          </Button>
        </View>
      </View>
      <View style={styles.searchContainer}></View>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    padding: 12,
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
  searchContainer: {},
});
