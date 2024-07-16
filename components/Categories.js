import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { categoryData } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc';
import Animated from 'react-native-reanimated';
import { FadeInUp, FadeOut } from 'react-native-reanimated';
import CachedImage from '../helpers/image';

function Categories({catData,activeCat,handleChangeCategory}) {

  return (
    <Animated.View entering={FadeInUp.duration(100).springify()} >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`p-2`}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {catData.map((cat) => {
          const isActive = cat.strCategory === activeCat;
          const activeBtnClass = isActive ? 'bg-amber-600' : 'bg-gray-200/10';
          const activeTextClass = isActive ? 'bg-amber-500' : null;

          return (
            <TouchableOpacity
              key={cat.idCategory}
              style={tw`flex items-center mr-3`}
              onPress={() => handleChangeCategory(cat.strCategory)}
            >
              <View style={tw`rounded-full px-1 ${activeBtnClass}`}>
                <Image
                  resizeMode="none"
                  source={{ uri: cat.strCategoryThumb }}
                  style={[tw`rounded-full`, { width: wp(16), height: hp(8) }]}
                />
                {/* <CachedImage 
                uri={ cat.strCategoryThumb }
                style={[tw`rounded-full`, { width: wp(16), height: hp(8) }]}
                /> */}
              </View>
              <Text style={[tw`text-black px-2 text-center  rounded-full ${activeTextClass} mt-1`, { fontSize: hp(1.3) }]}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

export default Categories;
