import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../../constants';

const dummyMeals = [
  { id: '1', food_name: '김밥', amount: 200 },
  { id: '2', food_name: '닭가슴살', amount: 150 },
  { id: '3', food_name: '바나나', amount: 100 },
];

const dummyNutrition = {
  calories: 850,
  carbs: 95,
  protein: 60,
  fat: 25,
};

const HomeScreen = () => {
  const username = '박성재';

  const renderMealItem = ({ item }) => (
    <Text style={styles.mealItem}>
      • {item.food_name} ({item.amount}g)
    </Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={dummyMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>안녕하세요, {username}님 🙂</Text>

            <Text style={styles.sectionTitle}>오늘의 섭취 음식</Text>
            {dummyMeals.length === 0 && (
              <Text style={styles.emptyText}>아직 식사 기록이 없습니다.</Text>
            )}

            <Text style={styles.sectionTitle}>오늘의 영양 통계</Text>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionText}>
                🔥 열량: {dummyNutrition.calories} kcal
              </Text>
              <Text style={styles.nutritionText}>
                🍚 탄수화물: {dummyNutrition.carbs} g
              </Text>
              <Text style={styles.nutritionText}>
                🥩 단백질: {dummyNutrition.protein} g
              </Text>
              <Text style={styles.nutritionText}>
                🥑 지방: {dummyNutrition.fat} g
              </Text>
            </View>

            <Text style={styles.sectionTitle}>오늘의 식사 목록</Text>
          </View>
        }
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  mealItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  nutritionBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  nutritionText: {
    fontSize: 15,
    marginVertical: 2,
  },
});

export default HomeScreen;
