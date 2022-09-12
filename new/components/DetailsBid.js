import { useState, useContext } from "react";
import { View, Text, Image , Button, Pressable} from "react-native";
import React from "react";

import Toast from "react-native-root-toast";
import { COLORS, SIZES, FONTS } from "../constants";

 import { CartItems } from "../Context";
import { TouchableOpacity } from "react-native-gesture-handler";

const DetailsBid = ({ bid,  item  }) => {
 
   const { cart, setCart } = useContext(CartItems);
   const options = ["regular", "medium", "large"];

   const [selected, setSelected] = useState(false);
   const [size,setSize] = useState('Medium')
   const [additems, setAddItems] = useState(0);
 
    const addtoCart = ()=>{
      setSelected(true);

      if (additems === 0) {
        setAddItems(1);
      }
  
      const ItemPresent = cart.find((item) => item.id === bid.id);
      if (ItemPresent) {
        setCart(
          cart.map((x) =>
            x.id === bid.id
              ? { ...ItemPresent, quantity: ItemPresent.quantity + 1 }
              : x
          )
        );
      } else {
        setCart([...cart, { ...bid,quantity: 1,size:size }]);
      }
      let toast = Toast.show("Added to Cart", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      setTimeout(function () {
        Toast.hide(toast);
      }, 2500);
      setAddItems(additems + 1);
    };
   
  
  const removeFromCart = () => {
    const ItemPresent = cart.find((item) => item.id === bid.id);
    if (additems === 1) {
      setSelected(false);

      setCart(cart.filter((x) => x.id !== bid.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === bid.id
            ? { ...ItemPresent, quantity: ItemPresent.quantity - 1 }
            : x
            )
            );
          }
          setAddItems(Math.max(0, additems - 1));
          let toast = Toast.show("Removed from Cart", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          setTimeout(function () {
            Toast.hide(toast);
          }, 2500);
      
        };
  
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={bid.id}
    >
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
    <Image
        source={bid.image}
         style={{ width: 48, height: 48 }}
      />
      <Text  style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
            marginLeft: 20
          }}
        > {bid.name} - </Text>
      <Text>{bid.price}</Text>
    </View>
 
    <View style={{ flexDirection: 'row', flex: 0, alignItems: 'center' }}>
    <TouchableOpacity  onPress={removeFromCart}> 
    <View style={{ borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    backgroundColor: "#001F2D",
    height: 35,}}>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: '#fff'}} >-</Text>
              </View>
              </TouchableOpacity>
      
      <Text  style={{
                  fontSize: 15,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
             }}>{additems}</Text>
      <TouchableOpacity  onPress={addtoCart}> 
    <View style={{ borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    backgroundColor: "#001F2D",
    height: 35,}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}} >+</Text>
              </View>
              </TouchableOpacity>
      </View>
      </View>
    );
};

export default DetailsBid;