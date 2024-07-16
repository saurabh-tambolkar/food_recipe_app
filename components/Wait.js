import React from 'react'
import { Text, View ,ActivityIndicator} from 'react-native'
import tw from 'twrnc'
import { heightPercentageToDP } from 'react-native-responsive-screen'

function Wait() {
  return (
    <View style={[tw`flex justify-center items-center `,{paddingTop:heightPercentageToDP(15)}]}>
        <ActivityIndicator size="large" color="rgb(245 158 11)" />
        <Text style={[tw`text-amber-500`,{fontSize:heightPercentageToDP(1.5)}]}>
            We are getting your recipes,kindly wait !
        </Text>
      
    </View>
  )
}

export default Wait
