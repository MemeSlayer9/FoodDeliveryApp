import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import DetailsBid from './DetailsBid'
import { CartItems } from "../Context";
import { useNavigation } from '@react-navigation/native';


const ViewCart = ({navigation ,data}) => {
    const { bid } = route.params;
    const navigation = useNavigation();
    const { cart, setCart } = useContext(CartItems);
    console.log(cart,"cart item added");
   
  return (

    
        <SafeAreaView>
            <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={bid}
        renderItem={({ item }) => <DetailsBid bid={item}/>}
      />
        </SafeAreaView>
    )
}

export default ViewCart