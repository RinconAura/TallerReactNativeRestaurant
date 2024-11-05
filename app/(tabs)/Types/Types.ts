export interface Product {
  id: string;
  name: string; 
  description: string;
  price: number;
  image: string;
  }
 
export type RootStackParamList = {
  MenuScreen: undefined;
    CartScreen: { product: Product; quantity: number; totalPrice: string };
  CategoriaScreen: { categoriaId: string; categoriaName: string };
  OrdenScreen: { product: Product }; 
};
