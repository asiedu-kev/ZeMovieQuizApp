import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const GameScreen = () => {
  const [timer, setTimer] = useState(60);
  setInterval(() => {
    const time = timer - 1;
    setTimer(time);
  }, 2000);
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
