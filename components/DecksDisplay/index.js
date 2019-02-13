import React, { Component } from "react";
import { View, Text } from "react-native";

// Redux
import { connect } from "react-redux";
import { handleInitialData } from "../../actions";

class DecksDisplay extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    //const { decks, navigation } = this.props;
    //console.log("Decks", decks);

    return (
      <View>
        <Text> Decks Display </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks
  };
};

export default connect(mapStateToProps)(DecksDisplay);
