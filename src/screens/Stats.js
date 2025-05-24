import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { formatStatsDate, getDateRange } from '../utils/format';
import { fetchStatsInRange } from '../utils/api';
import CaloriesBarChart from '../components/CaloriesBarChart';
import StatsSummaryItem from '../components/StatsSummaryItem';

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchStats = async () => {
        try {
          setLoading(true);
          const dates = getDateRange(5);
          const startDate = dates[0].toISOString().split('T')[0];
          const endDate = dates[dates.length - 1].toISOString().split('T')[0];

          const data = await fetchStatsInRange(startDate, endDate);

          const grouped = {};
          data.forEach((item) => {
            const dateKey = item.consumed_date;
            if (!grouped[dateKey]) {
              grouped[dateKey] = { calories: 0, carbs: 0, protein: 0, fat: 0 };
            }
            grouped[dateKey].calories += Number(item.calorie_total || 0);
            grouped[dateKey].carbs += Number(item.carb_total || 0);
            grouped[dateKey].protein += Number(item.protein_total || 0);
            grouped[dateKey].fat += Number(item.fat_total || 0);
          });

          const finalStats = dates.map((d) => {
            const key = d.toISOString().split('T')[0];
            return {
              date: formatStatsDate(d),
              calories: grouped[key]?.calories || 0,
              carbs: grouped[key]?.carbs || 0,
              protein: grouped[key]?.protein || 0,
              fat: grouped[key]?.fat || 0,
            };
          });

          setStats(finalStats);
        } catch (err) {
          console.error('통계 데이터 불러오기 실패:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }, [])
  );

  const chartData = {
    labels: stats.map((item) => item.date),
    datasets: [
      {
        data: stats.map((item) => item.calories),
      },
    ],
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#ff6b57"
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={stats}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={
          <View>
            <CaloriesBarChart data={chartData} />
            <Text style={styles.sectionTitle}>섭취 요약</Text>
          </View>
        }
        renderItem={({ item }) => <StatsSummaryItem item={item} />}
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});

export default Stats;
