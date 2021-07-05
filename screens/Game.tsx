import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants/env";

const GameScreen = () => {
  const [timer, setTimer] = useState(60);
  const [actorId, setActorId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [next, setNext] = useState(true);
  const [actorData, setActorData] = useState(null);
  const [movieData, setMovieData] = useState(null);

  const getActor = async (id: Number) => {
    await axios.get(`${API_BASE_URL}person/${id}?api_key=${API_KEY}`);
  };
  const getMovieCredit = async (id: Number) => {
    await axios.get(`${API_BASE_URL}movie/${id}/credits?api_key=${API_KEY}`);
  };
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const selectIds = () => {
    const max = 50,
      min = 1;
    const id = getRandomInt(min, max);
    setActorId(id);
    setMovieId(id);
  };

  useEffect(() => {
    selectIds();
    if (actorId != 0 && movieId != 0) {
      getActor(actorId).then((res) => console.log(res));
      getMovieCredit(movieId).then((res) => console.log(res));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.commonText}>Time</Text>
          <View>
            <Text style={styles.commonText}>{timer}s</Text>
          </View>
        </View>
        <View>
          <Text style={styles.commonText}>Meilleur Score</Text>
          <View>
            <Text style={styles.commonText}>50</Text>
          </View>
        </View>
      </View>
      <View style={styles.roundView}>
        <Text style={styles.commonText}>Round 1</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#FF5757",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  roundView: {
    justifyContent: "center",
    alignItems: "center",
  },
  commonText: {
    color: "white",
    fontSize: 18,
  },
});
export default GameScreen;
