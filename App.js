import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/productDetails';
import ProductCatalogueScreen from './src/productCatalogue';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: true }}>
				<Stack.Screen name="Products" component={ProductCatalogueScreen} />
				<Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};


export default App;
