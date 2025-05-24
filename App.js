import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Meal from './src/screens/Meal';
import Inventory from './src/screens/Inventory';
import Stats from './src/screens/Stats';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './constants';
import Profile from './src/screens/Profile';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          height: 80,
        },
        tabBarActiveTintColor: colors.RED_500,
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor = focused ? '#FF5F5F' : '#999';

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Meal') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: '홈' }}
      />
      <Tab.Screen
        name="Meal"
        component={Meal}
        options={{ tabBarLabel: '식사 기록' }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{ tabBarLabel: '내 식품' }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{ tabBarLabel: '통계' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: '프로필' }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
