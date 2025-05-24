import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants';

const MealSection = ({
  mealCd,
  title,
  meals,
  onDeleteMeal,
  onDeleteFoodItem,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {meals.length > 0 && (
          <TouchableOpacity onPress={() => onDeleteMeal(mealCd)}>
            <Text style={styles.deleteButtonText}>전체 삭제</Text>
          </TouchableOpacity>
        )}
      </View>
      {meals.length === 0 ? (
        <Text style={{ color: '#888' }}>기록 없음</Text>
      ) : (
        meals.map((item) => (
          <View key={item.meal_food_id} style={styles.foodRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mealItem}>
                {item.food_name} ({item.quantity}g)
              </Text>
              <Text style={styles.nutritionText}>
                {item.calorie_total} kcal | 탄: {item.carb_total}g 단:{' '}
                {item.protein_total}g 지: {item.fat_total}g
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onDeleteFoodItem(item.meal_food_id)}
            >
              <Text style={styles.foodDeleteText}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  deleteButtonText: { color: colors.RED_500, fontWeight: '600' },
  foodRow: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  mealItem: { fontSize: 15, color: '#333' },
  nutritionText: { fontSize: 12, color: '#666', marginTop: 4 },
  foodDeleteText: { color: '#ff4d4f', fontSize: 14, fontWeight: '500' },
});

export default MealSection;
