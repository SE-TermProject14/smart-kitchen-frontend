import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants';

const formatKoreanDate = (dateStr) => {
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    if (!isNaN(month) && !isNaN(day)) {
      return `${month}월 ${day}일`;
    }
  }
  return dateStr;
};

const StatsSummaryItem = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.date}>{formatKoreanDate(item.date)}</Text>
      <Text style={styles.calories}>{item.calories.toFixed(2)} kcal</Text>
    </View>
    <View style={styles.nutrientRow}>
      <View style={styles.nutrientBox}>
        <Text style={styles.nutrientLabel}>탄수화물</Text>
        <Text style={styles.nutrientValue}>{item.carbs.toFixed(2)}g</Text>
      </View>
      <View style={styles.nutrientBox}>
        <Text style={styles.nutrientLabel}>단백질</Text>
        <Text style={styles.nutrientValue}>{item.protein.toFixed(2)}g</Text>
      </View>
      <View style={styles.nutrientBox}>
        <Text style={styles.nutrientLabel}>지방</Text>
        <Text style={styles.nutrientValue}>{item.fat.toFixed(2)}g</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 24,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.RED_500,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientBox: {
    alignItems: 'center',
    flex: 1,
  },
  nutrientLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default StatsSummaryItem;
