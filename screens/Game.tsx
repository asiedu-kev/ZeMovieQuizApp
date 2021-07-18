import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants/env";
import { RootState } from "../store";
import { useSelector } from "react-redux";

//// TODO: version simpliste du jeux
// ecrire une fonction qui fetch des fims et des acteurs et crée un ensemble de question
//sauvegarder ces questions(avec leur réponses) dans redux
// afficher la première question et permettre d'aller à la suivante uniquement si la réponse est bonne
//sauvegarder le score

const GameScreen = () => {
  const [timer, setTimer] = useState(60);
  const [actorId, setActorId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actorData, setActorData] = useState();
  const [moviesData, setMoviesData] = useState();
  const bestScore = useSelector((s: RootState) => s.preferences.bestScore);
  const image_base_url = useSelector((s: RootState) => s.preferences.base_url);
  const image_width = useSelector((s: RootState) => s.preferences.size);

//// TODO: ameliorer cette fonction et idealement la mettre en tant qu'action redux (plus tard)
  const getData = () => {

      fetch(API_BASE_URL + 'person/popular?api_key=' + API_KEY + '&page=', {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          setActorData(result?.results);
        })
        .catch(error => console.log(error));

      // call for movie
      fetch(API_BASE_URL + 'discover/movie?api_key=' + API_KEY + '&page=1', {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          setLoading(true);
          setMoviesData(result?.results);
          setLoading(false);
        })
        .catch(error => console.log(error));
    //}
  }
  //getData est appelé une seule fois avec cette syntaxe
  useEffect(() => {
    getData();

  },[])

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const selectIds = () => {
    const max = moviesData?.length,
      min = 1;
    const id = getRandomInt(min, max);
    setActorId(id);
    setMovieId(id);
  };
  //not used
  //la verification de si la réponse est bonne ou pas ne doit pas être fait lorsque l'utilisateur 
  //click oui ou non. le check doit être fait en amont pendant que tu crée la liste des questions
  //sinon le jeux ne sera jamais fluide
  const checkAnswer = () => {
    //setLoading(true);

    setNext(true);
    // actorData?.[0]?.known_for.map((item) => {
    //   if (item?.title == moviesData?.[0]?.title) {
    //     selectIds();
    //     setNext(true);
    //   }
    // })

  }

  /* useEffect(() => {
     selectIds();
   }, [])

   useEffect(() => {

     console.log(actorData);
   }, [actorId, movieId])*/

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
          loading ?
            (<View>
              <ActivityIndicator size="small" color="white" />
            </View>)
            :
            <>

                  <View style={{ backgroundColor: 'white', width: '90%', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={{ uri: image_base_url + image_width + actorData?.[0]?.profile_path }} style={{ width: '50%', height: 300 }} />
                      <Image source={{ uri: image_base_url + image_width + moviesData?.[0]?.poster_path }} style={{ width: '50%', height: 300 }} />
                    </View>
                    <View style={{ padding: 5 }}>

                      <Text>L'acteur
                        <Text style={styles.actorName}>{actorData?.[0]?.name} </Text>
                        a joué dans le film<Text style={styles.filmName}> {moviesData?.[0]?.title}</Text>
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity  style={{ backgroundColor: 'green', flex: 1, padding: 15 }}>
                        <Text style={styles.answer}>Oui</Text>
                      </TouchableOpacity>
                      <TouchableOpacity  style={{ backgroundColor: 'red', flex: 1, padding: 15 }}>
                        <Text style={styles.answer}>Non</Text>
                      </TouchableOpacity>
                    </View>
                    <View />
                  </View>

            </>
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
