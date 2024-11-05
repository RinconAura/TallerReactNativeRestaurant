import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Product } from './Types/Types';
import { RootStackParamList } from './Types/Types';
import { StackNavigationProp } from '@react-navigation/stack';

export default function CategoriaScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  //const { categoriaId, categoriaName } = useLocalSearchParams();
  const { categoriaId, categoriaName } = useLocalSearchParams<{ categoriaId: string; categoriaName: string }>();

  const allProducts: Record<string,Product[]> = {
    'cold-drinks': [
      { id: '1', name: 'Limonada', description: 'Limonada fresca con hielo', price: 3.0, image: 'url_imagen_limonada' },
      { id: '2', name: 'Té Helado', description: 'Té helado con limón', price: 2.5, image: 'url_imagen_te_helado' },
    ],
    'hot-drinks': [
      { id: '3', name: 'Café', description: 'Café caliente', price: 1.5, image: 'url_imagen_cafe' },
      { id: '4', name: 'Té', description: 'Té caliente', price: 1.2, image: 'url_imagen_te_caliente' },
    ],
    'soups': [
      { id: '5', name: 'Sopa', description: 'Sopa del día', price: 2.0, image: 'url_imagen_sopa' },
      { id: '6', name: 'Sopa de Pollo', description: 'Sopa caliente con pollo', price: 2.5, image: 'url_imagen_sopa_pollo' },
    ],
    'plates': [
      { id: '7', name: 'Plato del Día', description: 'Plato diario', price: 5.0, image: 'url_imagen_plato_dia' },
      { id: '8', name: 'Plato a la Carta', description: 'Platos a la carta', price: 6.0, image: 'url_imagen_plato_carta' },
    ],
    'a-la-carta': [
      { id: '9', name: 'Pasta Alfredo', description: 'Pasta con salsa Alfredo', price: 7.5, image: 'url_imagen_pasta_alfredo' },
      { id: '10', name: 'Pizza Margarita', description: 'Pizza clásica con queso', price: 8.0, image: 'url_imagen_pizza' },
    ],
    'kids-menu': [
      { id: '11', name: 'Menú Infantil', description: 'Menú especial para niños', price: 4.0, image: 'url_imagen_menu_infantil' },
    ],
  };

  // Verifica que categoriaId exista en allProducts
  const items = typeof categoriaId === 'string' ? allProducts[categoriaId] || [] : [];

  const handleOrderPress = (product: Product) => {
    if (product) {
      navigation.navigate('OrdenScreen', { product });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoriaName}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <Button title="Ordenar" onPress={() => handleOrderPress(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  itemContainer: { flexDirection: 'row', marginBottom: 20 },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 16 },
  infoContainer: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemDescription: { fontSize: 14, color: '#555' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 5 },
});