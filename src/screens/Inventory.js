import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../constants';
import axios from '../api/axiosInstance';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AddProductModal from '../components/AddProductModal';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/buy/all');
      setProducts(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setProducts([]);
      } else {
        Alert.alert('에러', '식품 목록을 불러오지 못했습니다.');
      }
    }
  };

  const handleDelete = (id) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`/api/buy/delete/${id}`);
            Alert.alert('삭제 완료');
            fetchProducts();
          } catch (err) {
            console.error(err);
            Alert.alert('삭제 실패');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>내 식품 목록</Text>
        {products.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
            등록된 식품이 없습니다.
          </Text>
        )}
        <FlatList
          data={products}
          keyExtractor={(item) => item.buy_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.buy_name}</Text>
                <Text style={styles.itemDetail}>수량: {item.buy_cnt}</Text>
                <Text style={styles.itemDetail}>
                  유통기한: {item.expire_date}
                </Text>
                <Text style={styles.itemDetail}>
                  보관: {item.days_until_expiry <= 3 ? '⚠️ 임박' : '정상'}
                </Text>
              </View>
              <View style={styles.itemButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setEditData(item);
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.buy_id)}
                >
                  <Text
                    style={styles.buttonText}
                    onPress={() => handleDelete(item.buy_id)}
                  >
                    삭제
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
          onSubmitSuccess={fetchProducts}
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
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  itemButtons: {
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: colors.MINT,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: colors.RED_500,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.RED_500,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Inventory;
