import React from "react";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import tw from "twrnc";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { categoryData } from "../constants/index";
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import CachedImage from "../helpers/image";
// import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';

function Recipe({categories,recipe}) {

    const navigation = useNavigation();
    // const router = useRouter();

  return (
    <Animated.View style={[tw`px-2`]} entering={FadeInDown.duration(500).springify()}>
      <Text style={[tw`text-neutral-500 font-bold`, { fontSize: hp(2.5) }]}>
        Recipes
      </Text>
      {
        categories.length > 0 &&
      <FlatList
        data={recipe}
        keyExtractor={(item) => item.idMeal.toString()} // Ensure key is a string
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardItem item={item} navigation={navigation} />}
        onEndReachedThreshold={0.1}
      />
      }
    </Animated.View>
  );
}

export default Recipe;

const CardItem = ({ item,navigation }) => {
   
  return (
    <Pressable 
        style={[tw`bg-white rounded-xl`, { width: wp(50), marginBottom: hp(1),padding:wp(2) }]}
        onPress={()=>navigation.navigate('recipeDetails',{recipe:item})}
        >
      <Image
        source={{ uri: item.strMealThumb }}
        style={{ width: wp(40), height: hp(20), borderRadius: 20 }}
      />

      {/* <CachedImage
       uri={item.strMealThumb}
       style={{ width: wp(40), height: hp(20), borderRadius: 20 }}
       /> */}

      <Text
        style={[tw`font-semibold text-neutral-500`, { fontSize: hp(1.3), marginTop: hp(0.2) }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.strMeal}
      </Text>
    </Pressable>
  );
};
