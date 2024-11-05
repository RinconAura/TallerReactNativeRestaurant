import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { CartProvider } from './CartContext'; 

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function MenuTabIcon({ color }: { color: string }) {
  return <MaterialCommunityIcons name="silverware-fork-knife" size={28} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider> 
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="MenuScreen" 
          options={{
            title: 'Menú',
            tabBarIcon: ({ color }) => <MenuTabIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="CartScreen" 
          options={{
            title: 'Carrito',
            tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="OrdenHistorialScreen" 
          options={{
            title: 'Historial de Pedidos',
            tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
          }}
        />
        <Tabs.Screen
          name="CategoriaScreen" 
          options={{
            title: 'Categoría',
            tabBarIcon: ({ color }) => <TabBarIcon name="th-list" color={color} />,
          }}
        />
        <Tabs.Screen
          name="OrdenScreen" 
          options={{
            title: 'Orden',
            tabBarIcon: ({ color }) => <TabBarIcon name="th-list" color={color} />,
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
