import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../constants';

const FoodSearchModal = ({
  visible,
  onClose,
  searchText,
  setSearchText,
  searchResults,
  onAdd,
  selectedMealCd,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={[styles.title, { marginBottom: 20 }]}>
          음식 검색 ({selectedMealCd})
        </Text>
        <TextInput
          style={styles.input}
          placeholder="음식 이름을 입력하세요"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.food_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.searchItem}>
              <Text>{item.food_name}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAdd(item.food_id)}
              >
                <Text style={styles.addButtonText}>추가</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.buttonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8 },
  searchItem: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.RED_500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: { color: 'white', fontWeight: '600' },
  cancelButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.RED_500,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default FoodSearchModal;
