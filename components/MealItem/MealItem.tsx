import { Alert, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Meal } from "@/types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "@/hooks/useFoodStorage";

const MealItem: FC<Meal> = ({ calories, portion, name }) => {
  const { onSaveTodayFood } = useFoodStorage();

  const handleAddItemPress = async () => {
    try {
      await onSaveTodayFood({ calories, name, portion });
      Alert.alert("Agregaste la comida al día");
    } catch (error) {
      console.error(error);

      Alert.alert("No gregaste la comida al día");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}> {portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          radius={"sm"}
          type="clear"
          style={styles.button}
          onPress={handleAddItemPress}
        >
          <Icon name="add-circle-outline" />
        </Button>
        <Text style={styles.calories}>{calories} Cal</Text>
      </View>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ade8af",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
  },
  leftContainer: {
    justifyContent: "center",
    flex: 1,
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  name: {
    fontSize: 19,
    fontWeight: 500,
  },
  portion: {
    fontSize: 16,
    color: "#808080",
    fontWeight: 500,
  },
  calories: {
    fontSize: 19,
  },
  button: {
    marginBottom: -8,
  },
});
