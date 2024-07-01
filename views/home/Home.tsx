import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@/types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const Home = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParams, "Home">>(); // Ajusta según tus propios tipos

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
