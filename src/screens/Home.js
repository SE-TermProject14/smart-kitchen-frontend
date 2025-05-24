import { useState, useCallback, useEffect } from 'react';
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
  fetchProducts,
} from '../utils/api';

import { getToday, formatToday } from '../utils/format';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Notifications from 'expo-notifications';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('알림 권한이 거부되었습니다.');
    }
  };

  const checkExpiringFoods = async () => {
    try {
      const data = await fetchProducts();
      const today = new Date();

      const expiringItems = data.filter((item) => {
        const expireDate = new Date(item.expire_date);
        const diffDays = Math.floor(
          (expireDate - today) / (1000 * 60 * 60 * 24)
        );
        return diffDays <= 3 && diffDays > 0;
      });

      if (expiringItems.length > 0) {
        const names = expiringItems.map((item) => item.buy_name).join(', ');
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '⚠️ 유통기한 주의',
            body: `${names} 유통기한이 얼마 안 남았어요!`,
          },
          trigger: null,
        });
      }
    } catch (err) {
      console.error('유통기한 알림 오류:', err);
    }
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

  useEffect(() => {
    setupNotifications();
    checkExpiringFoods();
  }, []);

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
