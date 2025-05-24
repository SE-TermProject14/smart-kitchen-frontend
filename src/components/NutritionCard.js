import { View, Text, StyleSheet } from 'react-native';

const NutritionCard = ({ nutrition }) => {
  if (!nutrition) return <Text style={styles.empty}>통계 정보 없음</Text>;

  const items = [
    {
      label: '열량',
      value: `${nutrition.total_calorie} kcal`,
      backgroundColor: '#FFE1E1',
    },
    {
      label: '탄수화물',
      value: `${nutrition.total_carb} g`,
      backgroundColor: '#FFF4D4',
    },
    {
      label: '단백질',
      value: `${nutrition.total_protein} g`,
      backgroundColor: '#DFF5FF',
    },
    {
      label: '지방',
      value: `${nutrition.total_fat} g`,
      backgroundColor: '#E3FFE1',
    },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.nutrientBox,
              { backgroundColor: item.backgroundColor },
            ]}
          >
            <Text style={styles.nutrientLabel}>{item.label}</Text>
            <Text style={styles.nutrientValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutrientBox: {
    width: '48%',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  empty: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
});

export default NutritionCard;
