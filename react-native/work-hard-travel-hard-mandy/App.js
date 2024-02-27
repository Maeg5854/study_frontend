import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

const STORAGE_KEY_TODOS = "@toDos";
const STORAGE_KEY_MODE = "@mode";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const saveMode = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_MODE, working.toString());
      console.log("saveMode / working = ", working);
    } catch (e) {
      console.error(e);
    }
  };
  const loadMode = async (mode) => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY_MODE);
      if (!s) return;
      setWorking(s.toLowerCase() === "true");
    } catch (e) {
      console.error(e);
    }
  };
  const travel = () => {
    setWorking(false);
  };
  const work = () => {
    setWorking(true);
  };
  const onChangeText = (txt) => setText(txt);
  const addToDo = async () => {
    if (text === "") return;

    const newToDos = { ...toDos, [Date.now()]: { work: working, text } };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(toSave));
    } catch (e) {
      console.error(e);
    }
  };
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY_TODOS);
      setToDos(JSON.parse(s));
    } catch (e) {
      console.error(e);
    }
  };
  const deleteToDo = async (key) => {
    Alert.alert("Delete To Do?", "Are you sure?", [
      { text: "Cancle", style: "cancle" },
      {
        text: "I'm sure",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key]; // we can not delete toDo directly in toDos, but can do in newToDos because of non-mutation of newToDos
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
    return;
  };

  useEffect(() => {
    loadMode();
    loadToDos();
  }, []);
  useEffect(() => {
    saveMode();
  }, [working]);

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
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <EvilIcons name="trash" size={20} color="white" />
              </TouchableOpacity>
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
    paddingVertical: 20,
    backgroundColor: "#222222",
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
  },
});
