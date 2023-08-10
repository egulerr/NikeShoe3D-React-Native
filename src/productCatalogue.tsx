import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { products } from './data/products';

const { width } = Dimensions.get('window');
const itemSize = width / 2;

const isURL = (str) => {
  return typeof str === 'string' && (str.startsWith('http://') || str.startsWith('https://'));
};

const renderItem = ({ item, navigation }) => {
  let imageSource;
  if (isURL(item.image)) {
    imageSource = { uri: item.image };
  } else {
    imageSource = item.image;
  }

  return (
    <View style={styles.item}>
      <Pressable onPress={() => navigation.navigate('ProductDetails')}>
        <Image source={imageSource} style={styles.image} />
      </Pressable>
    </View>
  );
};

const ProductCatalogueScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => renderItem({ item, navigation })}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    width: itemSize,
    height: itemSize,
    margin: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProductCatalogueScreen;
