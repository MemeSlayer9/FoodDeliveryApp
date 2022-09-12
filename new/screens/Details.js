import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, Button } from "react-native";
import { useState, useContext } from "react";
import { COLORS, SIZES, assets, SHADOWS, FONTS, NFTData } from "../constants";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import { addToBasket, selectBasketItems } from '../features/basketSlice';
import { useDispatch, useSelector} from 'react-redux';
import { CartItems } from "../Context";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const DetailsHeader = ({ data, navigation }) => (
  
  
  <View style={{ width: "100%", height: 373 }}>
    <Image
      source={data.image}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);
  
const Details = ({ route, navigation, item}) => {
   
   
  const { data } = route.params;
   const [products, setProducts] = useState([data]);
   const { cart, setCart } = useContext(CartItems);

   const total = cart
    .map((item) => Number(item.price * item.quantity))
    .reduce((prev, curr) => prev + curr, 0);
  console.log(cart, "cart items added");
  console.log(total, "total price");
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 1,
        }}
      >
    {total === 0 ? (
              null
             ):(
              <Pressable   
              onPress={() => navigation.navigate("Cart")}
              style={{
            backgroundColor: "#001F2D",
            padding: 10,
            position: "absolute",
            bottom: 10,
            left: 150,
            borderRadius: 6,
          }} >
                <Text  style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
              
            }}>Go TO CART</Text>
              </Pressable>
             )}
             </View>
      <FlatList
        data={data.bids}
        renderItem={({ item, index }) => <DetailsBid bid={item} 
             onSubtract={() => onSubtract(item, index)}
            onAdd={() => onAdd(item, index)}
          />
          }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
          
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} />

              {data.bids.length > 0 && (
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}
                >
                  Current Meals
                </Text>
              )}
            
            </View>
          </React.Fragment>
        )}
      />
     </SafeAreaView>
    
  );
};

export default Details;