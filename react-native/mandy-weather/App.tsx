import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const API_KEY = "43cca2a3f54587d6f99a296c542c8625";
const icons = {
  Clouds: "cloudy",
  Rain: "rains",
  Snow: "snowflake-4",
  Drizzle: "rain",
  Atmosphere: "fog",
  Sunny: "day-sunny",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city || "");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();

    setDays(json.list);
  };

  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weahter}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 130 }} />
          </View>
        ) : (
          days.map((day) => {
            return (
              <View style={styles.day}>
                <View style={{ marginBottom: -50 }}>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={50}
                  ></Fontisto>
                </View>

                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 38,
    fontWeight: "800",
  },
  weahter: {},
  day: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  temp: { marginTop: 50, fontSize: 198 },
  description: { marginTop: -30, fontSize: 60 },
  tinyText: {
    fontSize: 20,
  },
});
