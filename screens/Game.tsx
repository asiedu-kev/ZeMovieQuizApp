import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants/env";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { EvilIcons, MaterialCommunityIcons } from "expo-vector-icons";
import { useNavigation } from "@react-navigation/native";
import PreferencesSlice from "../store/slices/preferences";

//// TODO: version simpliste du jeux
// ecrire une fonction qui fetch des fims et des acteurs et crée un ensemble de question
//sauvegarder ces questions(avec leur réponses) dans redux
// afficher la première question et permettre d'aller à la suivante uniquement si la réponse est bonne
//sauvegarder le score

const GameScreen = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState(60);
  const [actorId, setActorId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actorData, setActorData] = useState();
  const [moviesData, setMoviesData] = useState();
  const [currentScore, setCurrentScore] = useState(0);
  const bestScore = useSelector((s: RootState) => s.preferences.bestScore);
  const image_base_url = useSelector((s: RootState) => s.preferences.base_url);
  const image_width = useSelector((s: RootState) => s.preferences.size);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer]= useState(false);
  const dispatch = useDispatch();
  const [round, setRound] = useState(0);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    if (next){
      if (timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
      } else {
        setNext(false);
      }
    } else {
      setTimer(60);
    }
    
  });

  const selectIds = () => {
    const max = moviesData?.length,
      min = 1;
    const id = getRandomInt(min, max);
    setActorId(id);
    setMovieId(id);
  };
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
  /*const getAnswers =  () => {
    const oldResponse = answers;
    for (var i = 0; i<actorData?.length; i++) {
      actorData?.[i]?.known_for.map((item) => {
        if (item?.title == moviesData?.[i]?.title) {
          const resp = 1;
          oldResponse.push(resp);
        }else {
          const resp = 0;
          oldResponse.push(resp);
        }
     })
    }
     setAnswers(oldResponse);
  }*/
  //getData est appelé une seule fois avec cette syntaxe
  useEffect(() => {
    getData();
    //getAnswers();
    selectIds();

  },[])


  //not used
  //la verification de si la réponse est bonne ou pas ne doit pas être fait lorsque l'utilisateur 
  //click oui ou non. le check doit être fait en amont pendant que tu crée la liste des questions
  //sinon le jeux ne sera jamais fluide
  const checkAnswer = (userResponse: boolean) => {
    setAnswer(false);
    setLoading(true);
    setNext(false);
    actorData?.[actorId]?.known_for.map((item: { title: any; }) => {
      if (item?.title == moviesData?.[movieId]?.title) {
        setAnswer(true);
      }
    });
    if (userResponse === answer) {
      setNext(true);
      selectIds();
      setCurrentScore(currentScore+10);
      setRound(round+1);
      if (currentScore > bestScore) {
        dispatch(PreferencesSlice.actions.setPreferences({bestScore: currentScore}))
      }
    }
    else {
      setNext(false);
      console.log(false);
    }
    setLoading(false);

  }

  const replay = () => {
    setRound(0);
    setCurrentScore(0);
    setNext(true);
    getData();
    selectIds();
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
        <Text style={styles.commonText}>Round {round +1}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          loading ?
            (<View>
              <ActivityIndicator size="small" color="white" />
            </View>)
            :
              next ? (
                <>

                <View style={{ backgroundColor: 'white', width: '90%', flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: image_base_url + image_width + actorData?.[actorId]?.profile_path }} style={{ width: '50%', height: 300 }} />
                    <Image source={{ uri: image_base_url + image_width + moviesData?.[movieId]?.poster_path }} style={{ width: '50%', height: 300 }} />
                  </View>
                  <View style={{ padding: 5 }}>

                    <Text>L'acteur
                      <Text style={styles.actorName}> {actorData?.[actorId]?.name} </Text>
                      a joué dans le film<Text style={styles.filmName}> {moviesData?.[movieId]?.title}</Text>
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity  style={{ backgroundColor: 'green', flex: 1, padding: 15 }} onPress={() => checkAnswer(true)}>
                      <Text style={styles.answer}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ backgroundColor: 'red', flex: 1, padding: 15 }} onPress={() => checkAnswer(false)}>
                      <Text style={styles.answer}>Non</Text>
                    </TouchableOpacity>
                  </View>
                  <View />
                </View>

          </>
              ):
                <>
                <View>
                  <View style={{backgroundColor: "#00008B", padding: 15, borderRadius: 10}}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold' }}>Echec</Text>
                  </View>
                </View>
                <View style={{padding: 15}}>
                  {
                    timer != 0 ? (
                      <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Tu n'as pas eu raison !</Text>
                    )        :
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Temps écoulé!</Text>          }
              
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Votre Score: {currentScore}</Text>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Meilleure Score: {bestScore}</Text>
                <TouchableOpacity 
                style={{backgroundColor: "#00008B", padding: 15, borderRadius: 10, marginVertical: '10%', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => replay()}
                >
                  <Text  style={{color: 'white', fontSize: 15}}>Rejouer</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{backgroundColor: "#00008B", padding: 10, borderRadius: 10, marginVertical: '1%', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigation.goBack()}
                >
                  <EvilIcons name="arrow-left" size={40} color="white" />
                </TouchableOpacity>
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
