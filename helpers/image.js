import React, { useEffect ,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

function CachedImage(props) {

    const [cachedSource,setCachedSource]=useState(null);
    const {uri} = props;

    useEffect(()=>{
        const getCachedImage=async()=>{
            try {
                const CachedImageData=await AsyncStorage.getItem(uri);
                if(CachedImageData){
                    setCachedSource({uri:CachedImageData});
                }
                else{
                    const response=await fetch(uri);
                    const imageBlob = await response.blob();
                    let base64Data;
                    base64Data = await new Promise((resolve,reject)=>{
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => resolve(reader.result);
                    });
                    await AsyncStorage.setItem(uri,base64Data);
                    setCachedSource({uri:base64Data});
                }
            } catch (error) {
                console.log(error)
                setCachedSource({uri:base64Data})
            }
        }
        getCachedImage();
    },[])

  return (
    <Animated.Image source={cachedSource} {...props}/>
  )
}

export default CachedImage
