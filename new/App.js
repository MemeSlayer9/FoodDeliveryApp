import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Home from "./screens/Home";
import Details from "./screens/Details";
import CartScreen from "./screens/CartScreen";
import OrderData from "./screens/OrderData";
import OnBoardScreen from "./screens/OnBoardScreen";

import { Provider } from 'react-redux';
import { store } from './store';
import ViewCart from "./screens/ViewCart";
import { BasketContext } from "./Context";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
               <BasketContext> 

               <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        
      >
               <Stack.Screen name="BoardScreen" component={OnBoardScreen} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="ViewCart" component={ViewCart} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Order" component={OrderData} options={{headerShown:false}}/>

      </Stack.Navigator>
     </BasketContext>
    </NavigationContainer>
  );
};

export default App;
