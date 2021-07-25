import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        The best movie game ever made up. At least it will be.
      </Text>
      <Text style={styles.text}>
        Ce jeu teste la culture cinématographique du joueur. Le principe de base
        est ultra simple: Dans un temps imparti (let's say 60 secondes), le jeu
        présente au joueur sous forme de rounds un acteur et une affiche de
        film. Le joueur doit dire si l'acteur a joué dans le film présenté ou
        non. Le jeu s'arrête au bout du temps imparti ou à la première erreur,
        et donne le score à l'utilisateur. Il a la possibilité de rejouer pour
        tenter de battre son meilleur score. Et voilà, plutôt basique, mais
        efficace et fun.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
  },
});
export default HelpScreen;
