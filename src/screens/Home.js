import { useState, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { colors } from '../../constants';
import { useFocusEffect } from '@react-navigation/native';
import MealCard from '../components/MealCard';
import NutritionCard from '../components/NutritionCard';
import {
  fetchUserInfo,
  fetchMealsByDate,
  fetchNutritionByDate,
} from '../utils/api';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToday = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatToday = () => {
    const date = new Date();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const today = getToday();

          const [user, meals, nutritionData] = await Promise.all([
            fetchUserInfo(),
            fetchMealsByDate(today),
            fetchNutritionByDate(today),
          ]);

          setUsername(user.name);
          setMeals({
            breakfast: meals.filter((m) => m.meal_cd === 'breakfast'),
            lunch: meals.filter((m) => m.meal_cd === 'lunch'),
            dinner: meals.filter((m) => m.meal_cd === 'dinner'),
          });
          setNutrition(nutritionData);
        } catch (error) {
          console.error('홈 데이터 불러오기 실패:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color={colors.RED_500}
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateText}>{formatToday()}</Text>

        <Text style={styles.header}>안녕하세요, {username}님 🙂</Text>

        <Text style={styles.sectionTitle}>오늘의 영양 통계</Text>
        <NutritionCard nutrition={nutrition} />

        <Text style={styles.sectionTitle}>오늘의 식사 목록</Text>

        <MealCard
          title="아침"
          data={meals.breakfast}
          icon={
            <Ionicons name="sunny-sharp" size={24} color={colors.RED_500} />
          }
        />
        <MealCard
          title="점심"
          data={meals.lunch}
          icon={
            <Ionicons name="partly-sunny-sharp" size={24} color="#FFB884" />
          }
        />
        <MealCard
          title="저녁"
          data={meals.dinner}
          icon={
            <Ionicons name="moon-sharp" size={24} color={colors.GRAY_700} />
          }
        />
      </ScrollView>
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 26,
    marginBottom: 12,
    color: '#222',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default HomeScreen;
