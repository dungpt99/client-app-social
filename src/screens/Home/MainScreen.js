import React from "react";
import Tabs from "../../navigations/Tabs";
import Screen from "../BottomNavigation/Screen";
import SearchBar from "../../components/SearchBar"

export default function MainScreen({ navigation }) {
  return (
    <Screen>
      <SearchBar />
      <Tabs />
    </Screen>
  );
}
