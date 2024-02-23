import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (txt) => setText(txt);
  const addToDo = () => {
    if (text === "") return;

    const newToDos = { ...toDos, [Date.now()]: { work: working, text } };
    setToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={working ? "Add a To do" : "Where do you want to go"}
          returnKeyType="send"
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={addToDo}
        ></TextInput>
      </View>
      <ScrollView style={styles.toDoBox}>
        {Object.keys(toDos).map((key) => {
          return toDos[key].work === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ) : null;
        })}
      </ScrollView>
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
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  listText: {
    color: "white",
  },
  toDoBox: {
    flex: 1,
    marginVertical: 10,
  },
  toDo: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 15,
    marginVertical: 5,
  },
  toDoText: {
    color: "white",
  },
});
