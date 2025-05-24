import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from '../api/axiosInstance';
import { removeToken } from '../utils/authStorage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants';

const MyPage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const userGender = user?.sex_cd === 'male' ? '남자' : '여자';

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/users/me');
      setUser(response.data);
    } catch (error) {
      console.error('사용자 정보 조회 실패', error);
      Alert.alert('에러', '사용자 정보를 불러올 수 없습니다.');
    }
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠어요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        onPress: async () => {
          try {
            await axios.post('/auth/logout');
            await removeToken();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (err) {
            console.error('로그아웃 실패', err);
            Alert.alert('에러', '로그아웃에 실패했습니다.');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>내 프로필</Text>

        {user ? (
          <View style={styles.profileBox}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>생일: {user.birthday}</Text>
            <Text style={styles.info}>성별: {userGender}</Text>
            <Text style={styles.info}>가입일: {user.registration}</Text>
          </View>
        ) : (
          <Text>불러오는 중...</Text>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>SE-14</Text>
        </View>
      </View>
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
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  logoutButton: {
    backgroundColor: colors.RED_500,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default MyPage;
