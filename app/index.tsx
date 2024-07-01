import Header from "@/components/Header";
import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "@/src/routes";
import Rutes from "@/src/routes/Rutes";
export default function App() {
  return <Rutes />;
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: "rgba(7,26,93,2555)",
  //   flex: 1,
  // },
});
