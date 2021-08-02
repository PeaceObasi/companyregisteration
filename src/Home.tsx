import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Button, Image, Tile } from 'react-native-elements';
/**
 * Import StackNavigationProp and RouteProp  which will be used to create the types.
 * See the use below in our type Props definition
 */

import { StackNavigationProp } from '@react-navigation/stack';
//import { RouteProp } from '@react-navigation/native';//Not in use here

/**
 * Next, let us set up the Prop types that we shall use in our HomeScreen Component
 * Here we enlist screen names to be displayed as routes along with the respective parameter types to be passed.
 */
type HomeScreenStackParamList = {
    HomeScreen: undefined; //no parameters expected to be passed to route when called
    ExtraScreen: { demoParam: {} };

};

type HomeScreenNavigationProp = StackNavigationProp<HomeScreenStackParamList, 'HomeScreen'>;

//if we are using route as well, make below available
//type HomeScreenRouteProp = RouteProp<HomeScreenStackParamList, 'HomeScreen'>;

type Props = {
    //route: HomeScreenRouteProp; //if using route
    navigation: HomeScreenNavigationProp;
};

/*Let's create a Home component that App will display as Home Screen. It can be whatever name you want*/
const Home: React.FC<Props> = ({ navigation }) => { //We are not using route here at all; so we can as well pass only navigation
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
            <Text style={{fontSize: 50, color: 'cornflowerblue', paddingBottom: 20}}>REGISTER YOUR </Text>
                
                <Tile imageSrc={require('./img/logo.png')}
                    featured>
                </Tile>
                

                <Button
                    buttonStyle={{ width: 240 }}
                    title="Get Started"
                    onPress={() => navigation.navigate('ExtraScreen', {
                        demoParam: {}
                    }
                    )} />


            </View>



            {/* <Text style={{ fontSize: 16, fontStyle: "italic", paddingTop: 10 }}>Copyright: Peace Obasi-Kalu</Text> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'stretch',
        justifyContent: 'center',
        fontSize: 18
    },
    logo: {
        width: 133,
        height: 55,
        paddingBottom: 50
    }
});

export default Home;