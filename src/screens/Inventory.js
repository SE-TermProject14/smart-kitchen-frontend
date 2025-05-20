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

const dummyProducts = [
  {
    id: '1',
    name: '우유',
    quantity: 2,
    expiryDate: '2025-05-25',
    storage: '냉장',
  },
  {
    id: '2',
    name: '계란',
    quantity: 10,
    expiryDate: '2025-05-22',
    storage: '냉장',
  },
  {
    id: '3',
    name: '라면',
    quantity: 5,
    expiryDate: '2025-08-01',
    storage: '실온',
  },
];

const Inventory = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>내 식품 목록</Text>

        <FlatList
          data={dummyProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetail}>수량: {item.quantity}</Text>
                <Text style={styles.itemDetail}>
                  유통기한: {item.expiryDate}
                </Text>
                <Text style={styles.itemDetail}>보관: {item.storage}</Text>
              </View>
              <View style={styles.itemButtons}>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.buttonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.buttonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity style={styles.addButton}>
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
