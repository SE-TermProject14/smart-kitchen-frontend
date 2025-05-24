import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants';

const MealCard = ({ title, data, icon }) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </View>

    {data.length === 0 ? (
      <Text style={styles.empty}>기록 없음</Text>
    ) : (
      data.map((item, index) => (
        <Text key={index} style={styles.item}>
          • {item.food_name}
        </Text>
      ))
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GRAY_700,
  },
  item: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  empty: {
    fontSize: 14,
    color: '#888',
  },
});

export default MealCard;
