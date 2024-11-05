import React from 'react';
import { StyleSheet, Button, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';


const categories = [
  { id: 'cold-drinks', name: 'Bebidas Frías', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4Eg8m5mYUFoqWAx6SZnOzbJes_e5apoNjQ&s' },
  { id: 'hot-drinks', name: 'Bebidas Calientes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9WL9IiUEdygAnX7qlc5m4cYXsM1NNxyqwA&s' },
  { id: 'soups', name: 'Sopas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4Eg8m5mYUFoqWAx6SZnOzbJes_e5apoNjQ&s' },
  { id: 'plates', name: 'Platos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4Eg8m5mYUFoqWAx6SZnOzbJes_e5apoNjQ&s'},
  { id: 'a-la-carta', name: 'Platos a la Carta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4Eg8m5mYUFoqWAx6SZnOzbJes_e5apoNjQ&s' },
  { id: 'kids-menu', name: 'Menú Infantil', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4Eg8m5mYUFoqWAx6SZnOzbJes_e5apoNjQ&s' },
];

export default function MenuScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleCategoryPress = (categoriaId: string, categoriaName: string) => {
    navigation.navigate('CategoriaScreen', { categoriaId, categoriaName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <View key={category.id} style={styles.itemContainer}>
            <Image source={{ uri: category.image }} style={styles.image} />
            <Button
              title={`Ir a ${category.name}`}
              onPress={() => handleCategoryPress(category.id, category.name)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '45%',
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
});
