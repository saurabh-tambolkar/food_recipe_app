import React, { useEffect } from 'react';
import { StatusBar, Text, View, Image, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useFonts} from "expo-font";

function Index() {

    let router = useRouter();
    
    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    // let [fontsLoaded] = useFonts({
    //     'Pacifico': require('../assets/fonts/Pacifico.ttf'),
    //   });

    useEffect(() => {
        ring1Padding.value=0;
        ring2Padding.value=0;

        setTimeout(() => {
            ring1Padding.value = withSpring(ring1Padding.value + hp(4));
        }, 300);
        setTimeout(() => {
            ring2Padding.value = withSpring(ring2Padding.value + hp(5));
        }, 500);
        setTimeout(() => {
            router.push('home')
        }, 2500);
    }, []);

    return (
        <View style={[tw`flex-1 justify-center items-center bg-amber-500`]}>
            <StatusBar style="light-content" />

            <Animated.View style={[tw`bg-white/20 rounded-full`, { padding: ring1Padding }]}>
                <Animated.View style={[tw`bg-white/20 rounded-full`, { padding: ring2Padding }]}>
                    <Image source={require('../assets/images/welcome_food.png')} style={styles.img} />
                </Animated.View>
            </Animated.View>

            <View style={styles.text}>
                <Text style={[tw`text-white font-bold`,{fontSize:hp(5)}]}>
                    Foodie
                </Text>
                <Text style={[tw`text-white  font-medium m-3`,{fontSize:hp(1.5)}]}>
                    Cook for you !
                </Text>
            </View>
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    img: {
        width: wp('50%'),
        height: hp('23%'),
        borderRadius: 100,
    },
    text: {
        alignItems: "center",
        marginTop: 40,
    }
});
