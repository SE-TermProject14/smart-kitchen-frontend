import axios from '../api/axiosInstance';
import { Alert } from 'react-native';

export const fetchUserInfo = async () => {
  const res = await axios.get('/api/users/me');
  return res.data;
};

export const fetchMealsByDate = async (date) => {
  try {
    const res = await axios.get(`/api/meals/consumed?date=${date}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

export const fetchNutritionByDate = async (date) => {
  try {
    const res = await axios.get(`/api/meals/nutrition/date?date=${date}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) return null;
    throw err;
  }
};

export const getMealsByDate = async (dateStr) => {
  const res = await axios.get(`/api/meals/consumed?date=${dateStr}`);
  return res.data;
};

export const createMeal = async ({ meal_date, meal_cd }) => {
  const res = await axios.post('/api/meals/add', { meal_date, meal_cd });
  return res.data.meal_id;
};

export const addFood = async ({ meal_id, food_id }) => {
  await axios.post('/api/meals/add-food', { meal_id, food_id, quantity: 100 });
};

export const deleteMealById = async (mealId) => {
  await axios.delete(`/api/meals/delete/${mealId}`);
};

export const deleteMealFoodById = async (mealFoodId) => {
  await axios.delete(`/api/meals/delete-food/${mealFoodId}`);
};

export const searchFood = async (keyword) => {
  const res = await axios.get(`/api/meals/search?keyword=${keyword}`);
  return res.data;
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/buy/all');
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    } else {
      Alert.alert('에러', '식품 목록을 불러오지 못했습니다.');
      throw error;
    }
  }
};

export const deleteProductById = async (id) => {
  try {
    await axios.delete(`/api/buy/delete/${id}`);
    Alert.alert('삭제 완료');
  } catch (err) {
    console.error(err);
    Alert.alert('삭제 실패');
    throw err;
  }
};

export const fetchStatsInRange = async (startDate, endDate) => {
  const res = await axios.get(
    `/api/meals/consumed?start_date=${startDate}&end_date=${endDate}`
  );
  return res.data;
};
