import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParams } from "@/types";
import Food from "@/views/Food";
import Home from "@/views/home";

const Stack = createNativeStackNavigator<RootStackParams>();

const Rutes = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          //   options={routeScreenDefaultOptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Food"
          component={Food}
          //   options={routeScreenDefaultOptions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rutes;

const styles = StyleSheet.create({});
