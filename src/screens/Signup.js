import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from '../api/axiosInstance';
import { colors } from '../../constants';

const Signup = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [sexCd, setSexCd] = useState('male');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthday(date);
    hideDatePicker();
  };

  const handleSignup = async () => {
    if (!username.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!password || password.length < 4) {
      alert('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    if (!birthday) {
      alert('생일을 선택해주세요.');
      return;
    }

    if (!['male', 'female'].includes(sexCd)) {
      alert('성별을 선택해주세요.');
      return;
    }

    try {
      await axios.post('/auth/signup', {
        name: username,
        password,
        birthday: birthday.toISOString().split('T')[0],
        sex_cd: sexCd,
      });
      alert('회원가입 성공!');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
      alert('회원가입 실패');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        <TextInput
          style={styles.input}
          placeholder="이름"
          value={username}
          onChangeText={setUsername}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={showDatePicker}
          activeOpacity={0.8}
        >
          <Text style={{ color: birthday ? '#000' : '#999' }}>
            {birthday ? birthday.toISOString().split('T')[0] : '생일'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={birthday || new Date()}
          pickerContainerStyleIOS={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              sexCd === 'male' && styles.genderButtonSelected,
            ]}
            onPress={() => setSexCd('male')}
          >
            <Text
              style={[
                styles.genderText,
                sexCd === 'male' && styles.genderTextSelected,
              ]}
            >
              남성
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              sexCd === 'female' && styles.genderButtonSelected,
            ]}
            onPress={() => setSexCd('female')}
          >
            <Text
              style={[
                styles.genderText,
                sexCd === 'female' && styles.genderTextSelected,
              ]}
            >
              여성
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>로그인으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  genderButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  genderButtonSelected: {
    backgroundColor: colors.MINT,
    borderColor: colors.MINT,
  },
  genderText: {
    color: '#555',
    fontWeight: '600',
  },
  genderTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: colors.MINT,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Signup;
