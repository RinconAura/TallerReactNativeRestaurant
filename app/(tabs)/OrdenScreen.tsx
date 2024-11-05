import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Product } from './Types/Types';
import { RootStackParamList } from './Types/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCart } from './CartContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'OrdenScreen'>;

const OrdenScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addItem } = useCart();
  const route = useRoute<RouteProp<RootStackParamList, 'OrdenScreen'>>();

  
  const { product } = route.params || {};

  
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Producto no encontrado</Text>
      </View>
    );
  }


  const [quantity, setQuantity] = useState(1);

 
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  
  const totalPrice = (product.price * quantity).toFixed(2);

  const handleConfirmOrder = () => {
    addItem(product, quantity, parseFloat(totalPrice));

    Alert.alert(
      "Pedido agregado",
      `Se agregó su pedido al carrito: ${product.name} (Cantidad: ${quantity})`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('CartScreen', { product, quantity, totalPrice });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Precio unitario: ${product.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={decreaseQuantity} />
        <Text style={styles.quantityText}>{quantity.toString()}</Text> {/* Convierte cantidad a string */}
        <Button title="+" onPress={increaseQuantity} />
      </View>
      <Text style={styles.total}>Total: ${totalPrice}</Text>
      <Button title="Confirmar Orden" onPress={handleConfirmOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityText: { fontSize: 20, marginHorizontal: 10 },
  total: { fontSize: 18, fontWeight: 'bold' },
});

export default OrdenScreen;
