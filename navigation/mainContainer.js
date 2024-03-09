import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from './screeens/homeScreen'
import TasksScreen from './screeens/TasksScreen'
import FinishedTasks from './screeens/finishedTasks'

const Tab = createBottomTabNavigator();

// SCREENS
const homePage = 'Home';
const tasksPage = 'Tasks';
const finishedTasksPage = 'FinishedTasks'

function MainContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName={homePage}
            screenOptions={({route})=>({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    let rn = route.name;

                    if(rn === homePage){
                        iconName = focused ? 'home' : 'home-outline';
                    } else if(rn === tasksPage){
                        iconName = focused ? 'close' : 'close-outline';
                    } else if(rn === finishedTasksPage){
                        iconName = focused ? 'checkmark-done' : 'checkmark-done-outline'
                    }

                    return <Ionicons name={iconName} size={30} color={color} />
                },
                tabBarStyle: {
                    borderRadius: 45,
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    height: 90,
                    paddingVertical: 10,
                    backgroundColor: '#1e1e1e'
                },
                tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            <Tab.Screen name={homePage} component={HomeScreen}/>
            <Tab.Screen name={tasksPage} component={TasksScreen} />
            <Tab.Screen name={finishedTasksPage} component={FinishedTasks} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer