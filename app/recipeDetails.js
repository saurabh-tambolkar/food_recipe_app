import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar,Image, TouchableOpacity, Pressable } from 'react-native';
import tw from 'twrnc';
import { useRoute } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from 'expo-router';
import Wait from '../components/Wait';
import {ClockIcon,UserGroupIcon,FireIcon,Square3Stack3DIcon} from 'react-native-heroicons/solid'
// import { WebView } from 'react-native-webview';
import Animated,{FadeInUp,FadeInDown,FlipInEasyX,BounceIn} from 'react-native-reanimated';


function recipeDetails() {
  
  let route = useRoute();
  let recipe = route.params.recipe;

  let navigation = useNavigation();

  const [isFav,setIsFav] = useState(false);
  const [details,setDetails] = useState([]);
  const [loading,setLoading] = useState(true)
  const [numberOfLines,setNumberOfLines] = useState(5)
  const [showFullText, setShowFullText] = useState(false);

  useEffect(()=>{
    getRecipeData();
  },[])

  let getRecipeData = async ()=>{
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
      let data = await response.json();
      setDetails(data.meals[0]);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const IngredientsIndexes = (details)=>{
    if(!details) return [];
    let indexes = [];
    for(let i=1;i<15;i++){
      indexes.push(i)
    }
    return indexes;
  }

 
  const handleReadMore = () => {
    setShowFullText(!showFullText);
  };


  return (
    <ScrollView contentContainerStyle={[tw`flex `]} showsVerticalScrollIndicator={false} >
      <StatusBar style="light
      " barStyle="dark-content"/>
      <Animated.View style={[tw`flex-row justify-center `]} entering={FlipInEasyX.delay(100).springify()} >
        <Image source={{uri:recipe.strMealThumb}} style={{ width: wp(98), height: hp(50), borderRadius: 32,borderBottomRightRadius:32 ,marginTop:4}}/>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(400).duration(500).springify()} style={[tw`w-full flex-row justify-between items-center absolute pt-14 pl-1`]}>

        <TouchableOpacity style={[tw`p-2 rounded-full bg-white ml-5`]} onPress={()=>{navigation.goBack()}}>
          <ChevronLeftIcon size={hp(3)} strokeWidth={3.5} color={' rgb(245 158 11)'}/>
        </TouchableOpacity>

        <TouchableOpacity style={[tw`p-2 rounded-full bg-white mr-5`]} onPress={()=>{setIsFav(!isFav)}}>
          <HeartIcon size={hp(3)} strokeWidth={3.5} color={isFav ? "red" : 'gray'}/>
        </TouchableOpacity>

      </Animated.View>
      {
        loading ? <Wait/>:
        <View  style={[tw`px-4 pt-4`]}>
          <View style={[tw`flex-row items-center justify-between `]}>
          <Animated.View entering={FadeInDown.duration(100).springify()}>
            <Text style={[tw`font-semibold text-neutral-700`,{fontSize:hp(3)}]}>{details.strMeal}</Text>
            <Text style={[tw`font-medium text-neutral-500`,{fontSize:hp(2)}]}>{details.strArea}</Text>
          </Animated.View>
        </View>

        <Animated.View entering={BounceIn.duration(400).springify()} style={[tw`flex-row justify-around pt-4`]}>

          <View style={[tw`flex items-center justify-around rounded-full bg-amber-500 p-2`,{height:hp(15),width:hp(9)}]}>
            <View style={[tw`bg-white rounded-full flex items-center justify-center p-1`,{height:hp(6),width:hp(6)}]}> 
              <ClockIcon size={hp(4)} strokeWidth={hp(2.5)} color="gray"/>
            </View>
            <View style={[tw`flex items-center py-2 m-1`]}> 
              <Text style={{fontSize:hp(1.5)}}>35</Text>
              <Text style={{fontSize:hp(1.3)}}>Mins</Text>
            </View>
          </View>

          <View style={[tw`flex items-center justify-around rounded-full bg-amber-500 p-2`,{height:hp(15),width:hp(9)}]}>
            <View style={[tw`bg-white rounded-full flex items-center justify-center p-1`,{height:hp(6),width:hp(6)}]}> 
              <UserGroupIcon size={hp(4)} strokeWidth={hp(2.5)} color="gray"/>
            </View>
            <View style={[tw`flex items-center py-2 m-1`]}> 
              <Text style={{fontSize:hp(1.5)}}>3</Text>
              <Text style={{fontSize:hp(1.3)}}>Servings</Text>
            </View>
          </View>

          <View style={[tw`flex items-center justify-around rounded-full bg-amber-500 p-2`,{height:hp(15),width:hp(9)}]}>
            <View style={[tw`bg-white rounded-full flex items-center justify-center p-1`,{height:hp(6),width:hp(6)}]}> 
              <FireIcon size={hp(4)} strokeWidth={hp(2.5)} color="gray"/>
            </View>
            <View style={[tw`flex items-center py-2 m-1`]}> 
              <Text style={{fontSize:hp(1.5)}}>103</Text>
              <Text style={{fontSize:hp(1.3)}}>Calories</Text>
            </View>
          </View>

          <View style={[tw`flex items-center justify-around rounded-full bg-amber-500 p-2`,{height:hp(15),width:hp(9)}]}>
            <View style={[tw`bg-white rounded-full flex items-center justify-center p-1`,{height:hp(6),width:hp(6)}]}> 
              <Square3Stack3DIcon size={hp(4)} strokeWidth={hp(2.5)} color="gray"/>
            </View>
            <View style={[tw`flex items-center py-2 m-1`]}> 
              <Text style={{fontSize:hp(1.3)}}>Easy</Text>
            </View>
          </View>

          
        </Animated.View>

        <View style={[tw`p-2`]}>
          <Text style={[tw`font-semibold text-neutral-600 p-1`,{fontSize:hp(2.2)}]}>
            Ingredients
          </Text>
          <View>
            {
              IngredientsIndexes(details).map((i)=>{
                return(
                  <View key={i}  style={[tw`flex-row m-1 items-center`]}>
                    <View style={[tw`bg-amber-500 rounded-full`,{height:hp(1.5),width:hp(1.5)}]}>
                    </View>
                    <View style={[tw`flex-row m-2`]}>
                      <Text style={[tw`font-bold mx-1`,{fontSize:hp(1.5)}]}>{details['strMeasure'+i]}</Text>
                      <Text style={[tw`font-medium text-neutral-500`,{fontSize:hp(1.5)}]}>{details['strIngredient'+i]}</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View style={[tw`p-2`]}>
          <Text style={[tw`font-semibold text-neutral-600 p-1`,{fontSize:hp(2.2)}]}>
            Instructions
          </Text>
          <View>
              {showFullText ? (
                <Text style={[tw`text-neutral-600`, { fontSize: hp(1.6) }]}>
                  {details.strInstructions}
                </Text>
              ) : (
                <Text style={[tw`text-neutral-600`, { fontSize: hp(1.6) }]} numberOfLines={5} ellipsizeMode="tail">
                  {details.strInstructions}
                </Text>
              )}
              {!showFullText ? (
                <Pressable onPress={handleReadMore}>
                  <Text style={[tw`text-amber-500 mt-1`]}>Read more</Text>
                </Pressable>
              ): (
                <Pressable onPress={handleReadMore}>
                  <Text style={[tw`text-amber-500 mt-1`]}>Read less</Text>
                </Pressable>
              )}
            </View>
        </View>
        {/* {
          details.strYoutube ? (
            <View  style={[tw`p-2`]}>
        <Text style={[tw`font-semibold text-neutral-600 p-1`,{fontSize:hp(2.2)}]}>
            Recipe Video
          </Text>
          <View>
            <YoutubeIframe
              videoId={getVideoId(details.strYoutube)}
              height={hp(20)}
              width={wp(100)}    
            />
          </View>
        </View>
          ):null
        } */}
        {/* <View>
        <WebView
        style={{ height: 300, width: '100%' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: details.strYoutube }} // Replace with your YouTube video URL
      />
        </View> */}
        </View>
      }
    </ScrollView>
  );
}

export default recipeDetails;

