import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const CaloriesBarChart = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 32,
        }}
      >
        최근 5일 통계
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 20}
        height={220}
        yAxisSuffix=" kcal"
        fromZero
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 107, 87, ${opacity})`,
          labelColor: () => '#555',
          propsForLabels: {
            fontSize: 10,
          },
        }}
        style={{ marginBottom: 20 }}
      />
    </View>
  );
};

export default CaloriesBarChart;
