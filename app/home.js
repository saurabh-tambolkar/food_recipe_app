import React, { useEffect, useState } from 'react'
import { Text, View,StatusBar, ScrollView ,Image, TextInput,ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import {BellAlertIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import Recipe from '../components/Recipe';
import Wait from '../components/Wait';

function home() {

  const [activeCat,setActiveCat] = useState("Beef");
  const [catData,setData] = useState([]);
  const [recipe,setRecipe] = useState([])

  useEffect(()=>{
    getCategories();
    getRecipe();
  },[])

  const handleChangeCategory=(category)=>{
    getRecipe(category);
    setActiveCat(category);
    setRecipe([])
  }

  let getCategories = async ()=>{
    try {
      let response = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
      let data = await response.json();
      setData(data.categories);
    } catch (error) {
      console.log(error)
    }
  }

  let getRecipe = async (category="Beef")=>{
    try {
      let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      let data = await response.json();
        setRecipe(data.meals);
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <View style={tw`flex-1  justify-center items-center bg-white`}>

      {/* statusbar */}
      <StatusBar style="dark" barStyle="dark-content" />
      {/* <StatusBar style="dark" barStyle="dark-content" backgroundColor=' rgb(245 158 11)'/> */}

      <ScrollView 
       showsVerticalScrollIndicator={true}
      //  contentContainerStyle={tw``}
      >
        <View style={[tw`mt-8 p-2 flex-row items-center justify-between`,{width:wp(100)}]}>
          <Image source={require(".././assets/images/avatar.webp")} style={{width:wp(10.5),height:hp(5),borderRadius:50}}/>
          <BellAlertIcon size={hp(3)} color='gray'/>
        </View>


        {/* greetings */}
        <View style={tw`m-3`}>
          <Text style={[tw`text-neutral-400 font-medium`,{fontSize:hp(1.7)}]}>Hello, Saurabh!</Text>
          <Text style={[tw`text-neutral-500 font-normal`,{fontSize:hp(2.5)}]}>Make your own food!</Text>
          <Text style={[tw`text-neutral-500  font-normal`,{fontSize:hp(2.5)}]}>stay at
            <Text style={tw`text-amber-500`}> Home</Text>
          </Text>
        </View>

        {/* search */}
        <View style={tw`m-3 p-2 flex-row items-center rounded-full bg-black/5`}>
          <TextInput placeholder='Search any recipe' style={tw`flex-1 text-sm `} />
        <View style={tw`bg-white rounded-full p-2`}>
          <MagnifyingGlassIcon size={hp(3)} color="gray"/>
        </View>
        </View>

        {/* categories */}
        <View>
          {
            catData.length > 0 && <Categories catData={catData} activeCat={activeCat} handleChangeCategory={handleChangeCategory}/>
          }
        </View>

          {/* recipe */}
        <View style={[tw`mt-4 p-2`]}>
          {
            recipe.length > 0 ?
            <Recipe categories={catData} recipe={recipe}/> :
            <Wait/>
          }
        </View>

      </ScrollView>
  </View>
  )
}

export default home
