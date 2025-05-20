import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const dummyStats = [
  { date: '05/18', calories: 820, carbs: 100, protein: 55, fat: 20 },
  { date: '05/19', calories: 900, carbs: 110, protein: 60, fat: 22 },
  { date: '05/20', calories: 760, carbs: 90, protein: 50, fat: 18 },
];

const Stats = () => {
  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: dummyStats.map((item) => item.date),
    datasets: [
      {
        data: dummyStats.map((item) => item.calories),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={dummyStats}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>영양 통계</Text>

            <Text style={styles.sectionTitle}>최근 3일 칼로리 섭취</Text>
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              yAxisSuffix=" kcal"
              fromZero
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 107, 87, ${opacity})`,
                labelColor: () => '#555',
                style: {
                  borderRadius: 12,
                },
              }}
              style={{ borderRadius: 12, marginBottom: 20 }}
            />

            <Text style={styles.sectionTitle}>섭취 요약</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.itemText}>{item.calories} kcal</Text>
            <Text style={styles.itemText}>탄수화물: {item.carbs}g</Text>
            <Text style={styles.itemText}>단백질: {item.protein}g</Text>
            <Text style={styles.itemText}>지방: {item.fat}g</Text>
          </View>
        )}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  itemBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  itemText: {
    fontSize: 14,
    color: '#444',
  },
});

export default Stats;
