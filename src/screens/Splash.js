import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Splash = ({ navigation }) => {
  const handleTouch = () => {
    navigation.push('Login');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleTouch}
    >
      <Text style={styles.title}>Smart Kitchen</Text>
      <Text style={styles.tapText}>탭하여 시작하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  tapText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default Splash;
