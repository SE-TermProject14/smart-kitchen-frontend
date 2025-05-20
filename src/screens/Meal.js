import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../constants';

const dummySearchResults = [
  { id: '1', name: '김치찌개' },
  { id: '2', name: '샐러드' },
  { id: '3', name: '떡볶이' },
];

const dummyTodayMeals = [
  { id: '1', name: '바나나', amount: 100 },
  { id: '2', name: '현미밥', amount: 200 },
];

const Meal = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>식사 기록</Text>

        <TextInput
          style={styles.input}
          placeholder="음식 이름을 입력하세요"
          value={searchText}
          onChangeText={setSearchText}
        />

        <Text style={styles.sectionTitle}>검색 결과</Text>
        <FlatList
          data={dummySearchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.searchItem}>
              <Text>{item.name}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>추가</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>오늘의 식사</Text>
        <FlatList
          data={dummyTodayMeals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.mealItem}>
              • {item.name} ({item.amount}g)
            </Text>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: colors.RED_500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  mealItem: {
    fontSize: 15,
    marginVertical: 4,
  },
});

export default Meal;
