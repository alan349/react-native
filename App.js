import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [list, setList] = React.useState([]);
  const loadData = async () => {
    if (list.length > 0) return true;
    try {
      const response = await fetch("https://618c4ed9ded7fb0017bb950c.mockapi.io/food");
      const json = await response.json();
      setList(json);
    } catch (error) {
      console.error(error);
    }
  }
  loadData();

  const MainScreen = ({ navigation, route }) => {
    return (
      <View>
        <FlatList
          style={{ width: "100%", }}
          data={list}
          renderItem={({ item }) =>
            <View key={item.id}
              style={styles.itemList}>
              <Text onPress={() => (navigation.push("productDetail", { "product": item }))} style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text onPress={() => (navigation.push("productDetail", { "product": item }))} style={{ fontStyle: "italic", fontSize: 14 }}>
                R$ {item.price}
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  const ProductDetails = ({ navigation, route }) => {
    let product = route.params.product;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "contain" }}
          source={{ uri: product.img }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 16, padding: 10 }}>{product.name}</Text>
        <Text style={{ textAlign: "center", width: "100%", borderColor: "#ccc", borderWidth: 1, padding: 10 }}>{product.description}</Text>
        <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", padding: 10 }}>

          <Text style={{ fontWeight: "bold" }}>Preço:<Text style={{ fontWeight: "normal" }}> R$ {product.price}</Text></Text>
          <Text style={{ fontWeight: "bold" }}>Glúten:<Text style={{ fontWeight: "normal" }}> {!product.gluten ? "Não" : ""} Contém</Text></Text>
          <Text style={{ fontWeight: "bold" }}>Calorias:<Text style={{ fontWeight: "normal" }}> {product.calorie}</Text></Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{ title: 'Tela Principal' }}
        />
        <Stack.Screen
          name="productDetail"
          component={ProductDetails}
          options={{ title: 'Detalhes do Produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#fff"
  },
});
