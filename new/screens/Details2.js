import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, Button } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, SubInfo, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";

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
 
const ListItem = ({ item, onSubtract, onAdd }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
      <Text>{item.name} - </Text>
      <Text>{item.price}</Text>
    </View>
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
      <Button title="Subtract" onPress={onSubtract} />
      <Text>{item.quantity}</Text>
      <Button title="Add" onPress={onAdd} />
    </View>
  </View>
);

const Details = ({ route, navigation }) => {
  const { data } = route.params;
  const [products, setProducts] = React.useState([
   data
   ]);

   const onSubtract = (item, index) => {
    const nextProducts = [...products];
    if (nextProducts[index].quantity > 0)
    nextProducts[index].quantity -= 1;
    setProducts(nextProducts);
  };

  const onAdd = (item, index) => {
    const nextProducts = [...products];
    nextProducts[index].quantity += 1;
    setProducts(nextProducts);
  };

  let totalQuantity = 0;
  let totalPrice = 0;
  products.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => <ListItem item={item} 
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
            <SubInfo />
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
                  Current Bid
                </Text>
              )}
              <Text>Total Quantity: {totalQuantity}</Text>
      <Text>Total Price: {totalPrice}</Text>
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
    
  );
};

export default Details;