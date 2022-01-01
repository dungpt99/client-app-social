import React from "react";
import SearchBar from "../../components/SearchBar";
import Tabs from "../../navigations/Tabs";
import Screen from "../BottomNavigation/Screen";

export default function MainScreen({ navigation }) {
  return (
    <Screen>
      <SearchBar />
      <Tabs />
    </Screen>
  );
}
