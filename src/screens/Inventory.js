import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { colors } from '../../constants';
import { useEffect, useState } from 'react';
import AddProductModal from '../components/AddProductModal';
import ProductItem from '../components/ProductItem';
import { fetchProducts, deleteProductById } from '../utils/api';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleDelete = (id) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          await deleteProductById(id);
          loadProducts();
        },
      },
    ]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>내 식품 목록</Text>

        {products.length === 0 && (
          <Text style={styles.emptyText}>등록된 식품이 없습니다.</Text>
        )}

        <FlatList
          data={products}
          keyExtractor={(item) => item.buy_id.toString()}
          renderItem={({ item }) => (
            <ProductItem
              item={item}
              onEdit={(item) => {
                setEditData(item);
                setModalVisible(true);
              }}
              onDelete={handleDelete}
            />
          )}
        />

        <AddProductModal
          visible={modalVisible}
          mode={editData ? 'edit' : 'add'}
          initialData={editData || {}}
          onClose={() => {
            setModalVisible(false);
            setEditData(null);
          }}
          onSubmitSuccess={loadProducts}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ 식품 추가</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: colors.RED_500,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Inventory;
