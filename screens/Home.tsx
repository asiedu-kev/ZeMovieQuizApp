import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { useDispatch } from "react-redux";
import PreferencesSlice from "../store/slices/preferences";
import { API_BASE_URL, API_KEY } from "../constants/env";""
import preferences from "../store/slices/preferences";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const play = () => {
    fetch(API_BASE_URL + 'configuration?api_key='+API_KEY, {
      method: 'GET',
      redirect: 'follow'
    })
    .then(response =>response.json())
    .then(result=>{
      dispatch(PreferencesSlice.actions.setPreferences({base_url: result?.images?.base_url, size: result?.images?.poster_sizes[3]}))
    
    })
    .catch(error => console.log(error));
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to ZeMovieQuizz</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            play();
            navigation.navigate("Game", navigation)}
          }
        >
          <AntDesign name={"play"} size={35} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Help")}
        >
          <Text style={styles.buttonText}>How it works ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5757",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  button: {
    backgroundColor: "#00008B",
    borderColor: "white",
    borderWidth: 0.5,
    shadowColor: "#dddddd",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
    borderRadius: 6,
    minHeight: 50,
    maxHeight: 70,
    minWidth: 100,
    maxWidth: 110,
    padding: 10,
    margin: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
