import React from 'react';
import { StyleSheet, Button, SafeAreaView, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack'
import { Icon } from 'react-native-elements/dist/icons/Icon';

type Props = {
    navigation: HomeScreenNavigationProp;
};

type HomeScreenStackParamList = {
    HomeScreen: undefined; //no parameters expected to be passed to route when called
    ExtraScreen: { demoParam: {} };

};

type HomeScreenNavigationProp = StackNavigationProp<HomeScreenStackParamList, 'HomeScreen'>;

const Success: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Text style={{ color: "cornflowerblue", fontSize: 40, alignItems: 'center', justifyContent: 'center' }}> Company Properties </Text>
            </View>

            <View style={{ padding: 10 }}></View>

            <Text style={{ color: 'white', fontSize: 25, paddingBottom: 20 }}>1). Artificial person</Text>
            <Text style={{ color: 'white', fontSize: 25, paddingBottom: 20  }}>2). Separate Legal Entity</Text>
            <Text style={{ color: 'white', fontSize: 25, paddingBottom: 20  }}>3). Incorporated Association</Text>
            <Text style={{ color: 'white', fontSize: 25, paddingBottom: 20  }}>4). Limited Liability</Text>
            <Text style={{ color: 'white', fontSize: 25, paddingBottom: 20  }}>5). Common Seal</Text>
            <Button
                icon={
                    <Icon
                        name='arrow-right'
                        color='darkblue'
                    />
                }
                title='Back'
                onPress={() => navigation.navigate('HomeScreen')} />



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Success;