import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Touchable</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => console.log("pressed TH")}>
          <Text style={styles.btnText}>TouchableHighlight</Text>
        </TouchableHighlight>
        <TouchableWithoutFeedback onPress={() => console.log("pressed TWF")}>
          <Text style={styles.btnText}>TouchableWithoutFeedback</Text>
        </TouchableWithoutFeedback>
        <Pressable
          onPress={() => console.log("pressed Pr")}
          TouchableOpacity={0.5}
        >
          <Text style={styles.btnText}>Pressable</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "column",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
});
