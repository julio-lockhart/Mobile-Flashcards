import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "react-native-material-color";

// Redux
import { connect } from "react-redux";
import { deleteDeck } from "../../actions/";
import { deleteDeckFromStorage } from "../../utils/api";

// Constants
const ICON_SIZE = 20;

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    };
  };

  handleStartQuiz = () => {
    const { title, navigation } = this.props;

    navigation.navigate("Quiz", { deckKey: title });
  };

  deleteDeck = async () => {
    const { title, navigation, dispatch } = this.props;

    // Update Redux
    dispatch(deleteDeck(title));

    // Save to AsyncStorage
    await deleteDeckFromStorage(title);

    navigation.navigate("DecksDisplay");
  };

  render() {
    const { title, questions } = this.props;

    return (
      <View style={styles.mainContainer}>
        <Card title={title}>
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            {questions ? questions.length : 0} cards
          </Text>

          <View>
            <Button
              icon={
                <Icon
                  name="add-circle-outline"
                  size={ICON_SIZE}
                  color="white"
                />
              }
              buttonStyle={styles.buttonStyle}
              title="Add Card"
              onPress={() => {
                this.props.navigation.navigate("AddCard", {
                  title: title
                });
              }}
            />
          </View>

          <View>
            <Button
              icon={
                <Icon
                  name="play-circle-outline"
                  size={ICON_SIZE}
                  color="white"
                />
              }
              buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
              title="Start Quiz"
              onPress={() => this.handleStartQuiz()}
            />
          </View>
        </Card>

        <Button
          title="Delete Deck"
          buttonStyle={styles.deleteButtonStyle}
          onPress={() => this.deleteDeck()}
        />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center"
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  deleteButtonStyle: {
    backgroundColor: Color.Red,
    alignContent: "center",
    marginTop: 25
  }
};

const mapStateToProps = ({ decks }, { navigation }) => {
  const { title } = navigation.state.params;
  const deck = decks[title];

  return {
    title,
    questions: deck ? deck.questions : []
  };
};

export default connect(mapStateToProps)(DeckDetail);
