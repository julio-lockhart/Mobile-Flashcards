import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "react-native-material-color";
import commonStyles from "../../utils/styles";

const QuizDetail = ({ content }) => {
  return (
    <View style={[commonStyles.container, { height: 300 }]}>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Color.BLUEGREY[700],
    fontSize: 26,
    maxWidth: 300
  },
  link: {
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "underline",
    color: Color.Blue
  }
});

export default QuizDetail;
