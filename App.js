import Routes from "./src/navigations/Routes";
import FlashMessage from "react-native-flash-message";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="top" statusBarHeight={30} />
    </Provider>
  );
}
