import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./middleware";
import reducer from "./reducers";

// Components
import NavigationBar from "./components/NavigationBar";

const store = createStore(reducer, middleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationBar />
          <Text>Test</Text>
        </View>
      </Provider>
    );
  }
}
