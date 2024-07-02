import { StyleSheet, View, Modal } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Button, Icon } from "@rneui/themed";
import FormItem from "../FormItem";
import useFoodStorage from "@/hooks/useFoodStorage";

type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};
const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const { onSaveFood } = useFoodStorage();
  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion,
      });
      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose()}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeButton}>
            <Button onPress={() => onClose()} type="clear">
              <Icon name="close" size={28} />
            </Button>
          </View>
          {/* <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input />
            </View>
            <View style={styles.leyendContainer}>
              <Text style={styles.leyend}>KCAL</Text>
            </View>
          </View> */}
          <FormItem
            label="CAL"
            placeholder="Agregar Comida"
            value={calories}
            onChangeText={setCalories}
          />
          <FormItem
            label="Nombre"
            placeholder="Nombre de Comida"
            value={name}
            onChangeText={setName}
          />
          <FormItem
            label="Porción"
            placeholder="Agregar Porción"
            value={portion}
            onChangeText={setPortion}
          />
          <View style={styles.buttonContainer}>
            <Button
              radius={"lg"}
              type="solid"
              color="#4ecb71"
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                portion.trim() === ""
              }
              onPress={handleAddPress}
            >
              <Icon name="add" color="white" />
              Agregar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddFoodModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignItems: "flex-end",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
  },
  leyendContainer: {
    flex: 1,
  },
  leyend: { fontWeight: 500 },
  buttonContainer: {
    alignItems: "flex-end",
  },
});
