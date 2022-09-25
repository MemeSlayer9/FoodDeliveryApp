import { useState } from 'react'
import { View, SafeAreaView, FlatList, Text } from 'react-native'

import { COLORS, NFTData} from '../constants';
import { NFTCard, HomeHeader, FocusedStatusBar } from '../components';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Home = ({navigation}) => {
  const [nftData, setNftData] = useState(NFTData);

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
        
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
            
          
    </SafeAreaView>
 
  )
}

export default Home
