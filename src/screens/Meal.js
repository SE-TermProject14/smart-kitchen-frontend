import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import FoodSearchModal from '../components/FoodSearchModal';
import { formatDate } from '../utils/format';
import { colors } from '../../constants';
import {
  getMealsByDate,
  createMeal,
  addFood,
  deleteMealById,
  deleteMealFoodById,
  searchFood,
} from '../utils/api';
import MealSection from '../components/MealSection';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import debounce from 'lodash.debounce';

const Meal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [todayMeals, setTodayMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [mealIds, setMealIds] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
  });
  const [selectedMealCd, setSelectedMealCd] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchMeals(selectedDate);
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(async (text) => {
      if (!text.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        const results = await searchFood(text);
        setSearchResults(results);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      }
    }, 300);

    debouncedSearch(searchText);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText]);

  const fetchMeals = async (date) => {
    try {
      const data = await getMealsByDate(formatDate(date));
      const categorized = { breakfast: [], lunch: [], dinner: [] };
      const ids = { breakfast: null, lunch: null, dinner: null };

      data.forEach((item) => {
        const key = item.meal_cd;
        if (categorized[key]) {
          categorized[key].push(item);
          if (!ids[key]) ids[key] = item.meal_id;
        }
      });

      setTodayMeals(categorized);
      setMealIds(ids);
    } catch (err) {
      console.error(err);
      setTodayMeals({ breakfast: [], lunch: [], dinner: [] });
      setMealIds({ breakfast: null, lunch: null, dinner: null });
    }
  };

  const openMealModal = (mealCd) => {
    setSelectedMealCd(mealCd);
    setSelectedMealId(mealIds[mealCd]);
    setShowModal(true);
  };

  const closeMealModal = () => {
    setShowModal(false);
    setSearchText('');
    setSearchResults([]);
  };

  const addFoodToMeal = async (foodId) => {
    try {
      const mealId =
        selectedMealId ||
        (await createMeal({
          meal_date: formatDate(selectedDate),
          meal_cd: selectedMealCd,
        }));
      await addFood({ meal_id: mealId, food_id: foodId });
      Alert.alert('음식이 추가되었습니다!');
      fetchMeals(selectedDate);
    } catch (err) {
      console.error(err);
      Alert.alert('음식 추가 실패');
    }
  };

  const handleDeleteMeal = async (mealCd) => {
    const mealId = mealIds[mealCd];
    if (!mealId) return;

    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMealById(mealId);
            fetchMeals(selectedDate);
          } catch (err) {
            console.error(err);
          }
        },
      },
    ]);
  };

  const handleDeleteFoodItem = async (mealFoodId) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMealFoodById(mealFoodId);
            fetchMeals(selectedDate);
          } catch (err) {
            console.error(err);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.changeDateText}>날짜 변경</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={selectedDate}
            onConfirm={(date) => {
              setShowDatePicker(false);
              setSelectedDate(date);
              fetchMeals(date);
            }}
            display="spinner"
            onCancel={() => setShowDatePicker(false)}
            pickerContainerStyleIOS={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>

        <View style={styles.buttonRow}>
          {['breakfast', 'lunch', 'dinner'].map((meal) => (
            <TouchableOpacity
              key={meal}
              style={styles.mealButton}
              onPress={() => openMealModal(meal)}
            >
              <Text style={styles.mealButtonText}>
                {meal === 'breakfast'
                  ? '아침'
                  : meal === 'lunch'
                  ? '점심'
                  : '저녁'}{' '}
                기록
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {['breakfast', 'lunch', 'dinner'].map((meal) => (
          <MealSection
            key={meal}
            mealCd={meal}
            title={
              meal === 'breakfast' ? '아침' : meal === 'lunch' ? '점심' : '저녁'
            }
            meals={todayMeals[meal]}
            onDeleteMeal={handleDeleteMeal}
            onDeleteFoodItem={handleDeleteFoodItem}
          />
        ))}
      </ScrollView>

      <FoodSearchModal
        visible={showModal}
        onClose={closeMealModal}
        searchText={searchText}
        setSearchText={setSearchText}
        searchResults={searchResults}
        onAdd={addFoodToMeal}
        selectedMealCd={selectedMealCd}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, flex: 1 },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  dateText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginRight: 16,
  },
  changeDateText: { fontSize: 14, color: colors.RED_500, fontWeight: '600' },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  mealButton: {
    backgroundColor: colors.RED_500,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    flex: 1,
  },
  mealButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default Meal;
