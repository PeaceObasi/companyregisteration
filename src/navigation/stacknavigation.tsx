import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Extra from "../Extra";
import Home from "../Home";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor:'lightblue',
            },
        headerTintColor:'black',
        headerBackTitle: "Black",
        }
        }
    //   initialRouteName='HomeScreen'
    //   mode='card'
    //   headerMode='screen'
    //   keyboardHandlingEnabled={true}
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: 'darkblue',
    //       height: 120
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //       paddingTop: 60,
    //       paddingBottom: 10
    //     },
    //     // headerRight: () => (
    //     //     <Image style={styles.logo}
    //     //         source={require('./src 2/img/PAU-Logo-Website.png')}
    //     //     />
    //     // ),
    //     headerTitleAlign: 'left',
    //     headerRightContainerStyle: {//there is also headerLeftContainerStyle if we want to use it
    //       paddingBottom: 33
    //     }
    //   }}
    >
      <Stack.Screen name="HomeScreen" component={Home} options={{ title: 'Home Screen' }} />
      <Stack.Screen name="ExtraScreen" component={Extra} options={{ }} />

    </Stack.Navigator>

    
  )
}

export default AppStack;