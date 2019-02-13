import React, { Component } from "react";
import { Platform, View, StatusBar } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Constants } from "expo";

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "react-native-material-color";
import { purple, white } from "../../utils/colors";

// Components
import DecksDisplay from "../DecksDisplay";
import CreateDeck from "../CreateDeck";

const RouteConfigs = {
  DecksDisplay: {
    screen: DecksDisplay,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },

  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },

  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? Color.Blue : Color.White,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? Color.White : Color.Blue,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs);

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null
    }
  }
});

const MainNavigatorContainer = createAppContainer(MainNavigator);

const StatusBarContainer = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default class NavigationBar extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarContainer backgroundColor={purple} barStyle="light-content" />
        <MainNavigatorContainer />
      </View>
    );
  }
}
