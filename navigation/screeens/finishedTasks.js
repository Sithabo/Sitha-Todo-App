import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { TitleText } from "../../Styles/Text";
import { Todo } from "./TasksScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllCompletedTodo,
  fetchCompleteTodos,
} from "../../features/todoSlice";
import { showToast } from "./TasksScreen";

const completedImg = require('../../assets/completed.png')

function FinishedTasks({ navigation }) {
  const dispatch = useDispatch();
  const { isSuccess, completeTodos } = useSelector(
    (state) => state.todo
  );

  useEffect(() => {
    dispatch(fetchCompleteTodos());
  }, [isSuccess]);


  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, marginHorizontal: 25 }}>
        <Heading />

        <Image
        source={completedImg}
        style={{ width: "100%", height: 200}}
        resizeMode="contain"/>

        <FlatList
          data={completeTodos}
          keyExtractor={(item) => item.date}
          style={{ marginBottom: 210 }}
          renderItem={({ item }) => (
            <Todo
              name={item.name}
              key={item.date}
              completed={item.completed}
              date={item.date}
            />
          )}
        />
      </View>
    </View>
  );
}

const Heading = () => {
  const dispatch = useDispatch();

  const deleteAll = () => {
    dispatch(deleteAllCompletedTodo());
    dispatch(fetchCompleteTodos());
    showToast('Successfully cleared all completed todos 😍🔥')
  };

  return (
    <View style={styles.heading}>
      <View>
        <TitleText>Completed</TitleText>
        {/* <GreySubText>5 Task Completed</GreySubText> */}
      </View>
      <View>
        <TouchableOpacity onPress={deleteAll}>
          <Text style={styles.headingClearAll}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  heading: {
    paddingBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingClearAll: {
    color: "#ff0000df",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default FinishedTasks;
