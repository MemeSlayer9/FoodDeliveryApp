import React, { useContext } from "react";
import { View, Text, ScrollView, Image, StatusBar, Pressable, Button } from "react-native";
import { CircleButton,  } from "../components";
import { CartItems } from "../Context";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS, SIZES, assets, SHADOWS, FONTS, NFTData } from "../constants";

const CartScreen = ( {navigation}) => {
  const { cart, setCart } = useContext(CartItems);
  const total = cart
    .map((item) => Number(item.price * item.quantity))
    .reduce((prev, curr) => prev + curr, 0);
    const placeOrder = () => {
      navigation.navigate("Order")
  
      setCart([])
    }
  return (
    <View> 
            <ScrollView showsVerticalScrollIndicator={false}>

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
       
      top={StatusBar.currentHeight + -12}
    />
 
 <View style={{ marginTop: 80,}}> 
          {cart.map((item, key) => (
            <Pressable
              style={{
                backgroundColor: "#001F2D",
                padding: 10,
                margin: 10,
                borderRadius: 8,
                
              }}
              key={key}
            >  
                          <View style={{ flexDirection: "row", alignItems: "center" }}>

                <Image
                  style={{ width: 70, height: 70, borderRadius: 6 }}
                  source={    item.image } 
                />
               <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    ${item.price * item.quantity}
                  </Text>
                  </View>
                 </View>
            
                     </Pressable>
                   
          ))}
          </View>
          
      {total === 0 ? (
         <Pressable
         style={{
           marginBottom: "auto",
           marginTop: "auto",
           alignItems: "center",
           justifyContent: "center",
           height: "100%",
         }}
       >
         <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
           Cart is empty!
         </Text>
         <Image
           style={{
             width: 250,
             height: 600,
             resizeMode: "contain",
           }}
           source={{
             uri: "https://pizzaonline.dominos.co.in/static/assets/empty_cart@2x.png",
           }}
         />
       </Pressable>
      ) : (
        <View style={{ height: 200 }}>
        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Entypo name="location-pin" size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Delivering To Home
            </Text>
            <Text
              style={{ fontSize: 16, width: 200, marginTop: 3, color: "gray" }}
            >
              25/2 Rna Shopping arcade Lucknow complex
            </Text>
          </View>
        </View>

        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="amazon-pay" size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>${total}</Text>
            <Text
              style={{ fontSize: 16, width: 200, marginTop: 3, color: "gray" }}
            >
              Pay Via Cash
            </Text>
          </View>
        </View>
        <Pressable
        onPress={placeOrder}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#001F2D",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Place Order
          </Text>
        </Pressable>
      </View>
      )}  
              </ScrollView>
              
     </View>  
     
  )
}

export default CartScreen