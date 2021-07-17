import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants/env";
import { RootState } from "../store";
import { useSelector } from "react-redux";


const GameScreen = () => {
  const [timer, setTimer] = useState(60);
  const [actorId, setActorId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [next, setNext] = useState(true);
  const [actorData, setActorData] = useState(null);
  const [movieCreditsData, setMovieCreditsData] = useState(null);
  const bestScore = useSelector((s: RootState) => s.preferences.bestScore);
  const image_base_url = useSelector((s: RootState) => s.preferences.base_url);
  const image_width = useSelector((s: RootState) => s.preferences.size);



  /*const getActor = async (id: Number) => {
    await fetch(API_BASE_URL + 'person/'+id+'?api_key='+API_KEY, {
      method: 'GET',
      redirect: 'follow'
    })
    .then(response =>response.json())
    .then(result=>{
      setActorData(result);
    })
    .catch(error => console.log(error));
  };

  const getMovieCredit = async (id: Number) => {
    await fetch(API_BASE_URL + 'movie/'+id+'/credits?api_key='+API_KEY, {
      method: 'GET',
      redirect: 'follow'
    })
    .then(response =>response.json())
    .then(result=>{
      setMovieData(result);
    })
    .catch(error => console.log(error));
  };*/
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
    setNext(true);
  };

  useEffect(() => {
    selectIds();
  }, [])

  useEffect(() => {
    if (actorId != 0 && movieId != 0) {
      fetch(API_BASE_URL + 'person/' + actorId + '?api_key=' + API_KEY, {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          setActorData(result);
        })
        .catch(error => console.log(error));

      // call for movie
      fetch(API_BASE_URL + 'movie/' + movieId + '/credits?api_key=' + API_KEY, {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          setMovieCreditsData(result);
        })
        .catch(error => console.log(error));
    }
    console.log(actorData);
  }, [actorId, movieId])

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
            <Text style={styles.commonText}>{bestScore}</Text>
          </View>
        </View>
      </View>
      <View style={styles.roundView}>
        <Text style={styles.commonText}>Round 1</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          next ? (
            <View style={{ backgroundColor: 'white', width: '90%', flexDirection: 'column' }}>
              <View style={{flex: 1, backgroundColor: 'white'}}>
                  <Image source={{uri: image_base_url+ image_width+ actorData?.profile_path}} style={{flex: 1}} />
              </View>
              <View style={{ padding: 5 }}>
                
                <Text>L'acteur
                  <Text style={styles.actorName}>{actorData?.name} </Text>
                  a joué dans le film<Text style={styles.filmName}> Barbecue forever</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ backgroundColor: 'green', flex: 1, padding: 15 }}>
                  <Text style={styles.answer}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: 'red', flex: 1, padding: 15 }}>
                  <Text style={styles.answer}>Non</Text>
                </TouchableOpacity>
              </View>
              <View />
            </View>
          ) : (
            <TouchableOpacity onPress={() => selectIds()} style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )
        }
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
  answer: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  actorName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  filmName: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
export default GameScreen;
