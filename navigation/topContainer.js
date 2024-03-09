import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { View } from 'react-native'
import HomeScreen from './screeens/homeScreen';
import TasksScreen from './screeens/TasksScreen';
import FinishedTasks from './screeens/finishedTasks';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createMaterialTopTabNavigator();

const homePage = 'Home';
const tasksPage = 'Tasks';
const finishedTasksPage = 'FinishedTasks'

function TopContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName={homePage}
            screenOptions={({route})=>({
                tabBarIcon: ({focused, color}) => {
                    let iconName;

                    let rn = route.name;

                    if(rn === homePage){
                        iconName = focused ? 'home' : 'home-outline';
                    } else if(rn === tasksPage){
                        iconName = focused ? 'clipboard' : 'clipboard-outline';
                    } else if(rn === finishedTasksPage){
                        iconName = focused ? 'checkmark-done' : 'checkmark-done-outline'
                    }

                    return <Ionicons name={iconName} size={24} color='#1E90FF' />
                },
                tabBarStyle: {
                    paddingTop: 30,
                    paddingBottom: 10
                },
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen name={homePage} component={HomeScreen}/>
            <Tab.Screen name={tasksPage} component={TasksScreen} />
            <Tab.Screen name={finishedTasksPage} component={FinishedTasks} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TopContainer