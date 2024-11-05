import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext';

const CartScreen = () => {
  const { items, updateItemQuantity, removeItem, getTotalAmount } = useCart();


  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalAmount = getTotalAmount();

  const deliveryFee = totalAmount > 90000 ? 0 : totalAmount > 70000 ? 3000 : 5000;

  const finalTotal = totalAmount + deliveryFee;

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateItemQuantity(productId, newQuantity);
    } else {
      removeItem(productId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text>Precio unitario: ${item.product.price ? item.product.price.toFixed(2) : '0.00'}</Text>
                <Text>Cantidad: {item.quantity}</Text>
                <Text>Total: ${item.totalPrice ? item.totalPrice.toFixed(2) : '0.00'}</Text>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpdateQuantity(Number(item.product.id), item.quantity + 1)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpdateQuantity(Number(item.product.id), item.quantity - 1)}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.removeButton]}
                    onPress={() => handleRemoveItem(Number(item.product.id))}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Cantidad de productos: {totalQuantity}</Text>
            <Text style={styles.summaryText}>Valor total de productos: ${totalAmount.toFixed(2)}</Text>
            <Text style={styles.summaryText}>Valor del domicilio: ${deliveryFee.toFixed(2)}</Text>
            <Text style={styles.finalTotalText}>Total final: ${finalTotal.toFixed(2)}</Text>
          </View>
        </>
      ) : (
        <Text>No hay productos en el carrito.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  productName: { fontSize: 20, fontWeight: 'bold' },
  itemContainer: { padding: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  buttonsContainer: { flexDirection: 'row', marginTop: 10 },
  button: { marginHorizontal: 5, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  removeButton: { backgroundColor: '#ff4d4d' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  summaryContainer: { marginTop: 20, padding: 10, borderTopWidth: 1, borderColor: '#ccc' },
  summaryText: { fontSize: 16, marginVertical: 2 },
  finalTotalText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
});

export default CartScreen;
