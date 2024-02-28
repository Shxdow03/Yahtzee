import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ScoreboardScreen from './components/Scoreboard';
import GameboardScreen from "./components/Gameboard";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ScoreboardContext } from "./contexts/Context";
import { useState } from "react";
import style from "./styles/style";
import { moderateScale } from "./metrics/Metrics";
import { useFonts } from "expo-font";
import Home from "./components/Home";

const Tab = createBottomTabNavigator();

export default function App() {

  const [scoreboard, setScoreboard] = useState([]);
  const [loaded] = useFonts({
    LatoRegular : require('./fonts/Lato-Regular.ttf')
  });

  if(!loaded) {
    return null;
  }
  
  return(
          <NavigationContainer>
            <ScoreboardContext.Provider value={{scoreboard, setScoreboard}}>
              <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({route}) => ({
                  tabBarIcon: ({focused}) => {
                    let iconName;
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'home'
                        : 'home-outline'
                        return <MaterialCommunityIcons name={iconName} size={moderateScale(20)} color={'maroon'}/>
                    }
                    else if (route.name === 'Gameboard') {
                      iconName = focused 
                        ? 'dice'
                        : 'dice-outline'
                        return <Ionicons name={iconName} size={moderateScale(20)} color={'maroon'}/>
                    }
                    else if (route.name === 'Scoreboard') {
                      iconName = focused 
                        ? 'trophy'
                        : 'trophy-outline'
                        return <MaterialCommunityIcons name={iconName} size={moderateScale(20)} color={'maroon'}/>
                    }
                    
                  },
                  tabBarActiveTintColor: 'maroon',
                  tabBarInactiveTintColor: '#80000085',
                  headerTintColor: 'maroon',
                  headerStyle: style.outline,
                  headerTitleStyle: style.headerTitle,
                  tabBarStyle: style.outline,
                  tabBarLabelStyle: style.tabBarLabel,
                  tabBarBadgeStyle: style.tabBarBadge
                })}
              >
                  <Tab.Screen 
                    name='Home' 
                    component={Home}
                    options={{
                      tabBarStyle: {display: 'none'}
                    }}
                  />
                  <Tab.Screen 
                    name='Gameboard' 
                    component={GameboardScreen}
                  />
                  <Tab.Screen 
                    name='Scoreboard' 
                    component={ScoreboardScreen}
                    options={{
                      lazy: false,
                      tabBarBadge: scoreboard.length}}
                  />
              </Tab.Navigator>
            </ScoreboardContext.Provider>
          </NavigationContainer>
  );
}


