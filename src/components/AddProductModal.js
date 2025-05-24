import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { colors } from '../../constants';
import axios from '../api/axiosInstance';
import { formatDate } from '../utils/format';

const AddProductModal = ({
  visible,
  onClose,
  onSubmitSuccess,
  mode = 'add',
  initialData = {},
}) => {
  const [name, setName] = useState(initialData.buy_name || '');
  const [cnt, setCnt] = useState(initialData.buy_cnt?.toString() || '');
  const [buyDate, setBuyDate] = useState(
    initialData.buy_date ? new Date(initialData.buy_date) : null
  );
  const [expireDate, setExpireDate] = useState(
    initialData.expire_date ? new Date(initialData.expire_date) : null
  );
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialData) {
        setName(initialData.buy_name || '');
        setCnt(initialData.buy_cnt?.toString() || '');
        setBuyDate(
          initialData.buy_date ? new Date(initialData.buy_date) : null
        );
        setExpireDate(
          initialData.expire_date ? new Date(initialData.expire_date) : null
        );
      } else {
        setName('');
        setCnt('');
        setBuyDate(null);
        setExpireDate(null);
      }
    }
  }, [visible, mode, initialData]);

  const showDatePicker = (field) => {
    setTarget(field);
  };

  const hideDatePicker = () => {
    setTarget(null);
  };

  const handleConfirm = (date) => {
    if (target === 'buy') setBuyDate(date);
    else if (target === 'expire') setExpireDate(date);
    hideDatePicker();
  };

  const handleSubmit = async () => {
    if (!name || !cnt || !buyDate || !expireDate) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    const payload = {
      buy_name: name,
      buy_cnt: Number(cnt),
      buy_date: formatDate(buyDate),
      expire_date: formatDate(expireDate),
    };

    try {
      if (mode === 'edit') {
        await axios.put(`/api/buy/update/${initialData.buy_id}`, payload);
        Alert.alert('수정 완료');
      } else {
        await axios.post('/api/buy/add', payload);
        Alert.alert('추가 완료');
      }

      onSubmitSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert('요청 실패');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>
              {mode === 'add' ? '식품 추가' : '식품 수정'}
            </Text>

            <TextInput
              placeholder="식품 이름"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="수량"
              placeholderTextColor="#999"
              style={styles.input}
              value={cnt}
              onChangeText={setCnt}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                Keyboard.dismiss();
                showDatePicker('buy');
              }}
            >
              <Text style={{ color: buyDate ? '#000' : '#999' }}>
                {buyDate ? formatDate(buyDate) : '구매일'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                Keyboard.dismiss();
                showDatePicker('expire');
              }}
            >
              <Text style={{ color: expireDate ? '#000' : '#999' }}>
                {expireDate ? formatDate(expireDate) : '유통기한'}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={!!target}
              mode="date"
              display="spinner"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={new Date()}
              pickerContainerStyleIOS={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {mode === 'edit' ? '수정하기' : '추가하기'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={{ color: '#888' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.RED_500,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancel: {
    alignItems: 'center',
    marginTop: 5,
  },
});

export default AddProductModal;
