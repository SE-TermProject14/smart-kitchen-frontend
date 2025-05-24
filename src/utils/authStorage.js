import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.error('토큰 저장 실패', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    console.error('토큰 불러오기 실패', e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.error('토큰 제거 실패', e);
  }
};
