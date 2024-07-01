import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import imagenuri from "../../assets/images/sole.png";
import { Button, Icon } from "@rneui/themed";

const staticInfo = {
  name: "Maria Lovero",
  uri: require("../../assets/images/sole.png"),
};

// console.log("viendo mi static", staticInfo);

const Header = () => {
  const { canGoBack, goBack } = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button radius={"sm"} type="clear" onPress={() => goBack()}>
            <Icon name="arrow-back" size={24} />
          </Button>
        </View>
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hola ${staticInfo.name}`}</Text>
        <Text style={styles.subtitulo}>Bienvenido de nuevo a tu objetivo</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={staticInfo.uri} style={styles.imagen} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 12,
    color: "#808080",
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 2,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});
