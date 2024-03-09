import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ToastAndroid,
} from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import { GreySubText, TitleText } from "../../Styles/Text";
import {
  addTodos,
  completeTodo,
  deleteAllTodo,
  deleteCompletedTodo,
  deleteTodo,
  fetchCompleteTodos,
  fetchTodos,
  unCompleteTodo,
} from "../../features/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import uuid from 'react-native-uuid';

const todoImg = require("../../assets/todo.png");

function TasksScreen() {
  // *************************************
  // TODO STATE LOADING
  // *************************************
  // const [data, setData] = useState([]);
  const { isSuccess, data: reduxData } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // ****************************************
  // USE-EFFECT HOOK FOR CALLING DATA FETCHING
  // ****************************************
  useEffect(() => {
    dispatch(fetchTodos());
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 40, marginHorizontal: 25 }}>
        <Heading />
        <Image
          source={todoImg}
          style={{ width: "100%", height: 200 }}
          resizeMode="contain"
        />
        <AddTask />
        <FlatList
          data={reduxData}
          keyExtractor={(item) => item.date}
          style={{ marginBottom: 430 }}
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

  const deleteAllTodos = () => {
    dispatch(deleteAllTodo());
    dispatch(fetchTodos());
    dispatch(fetchCompleteTodos());

    showToast("Clear all todos successfully 🐱‍🏍");
  };

  return (
    <View style={styles.heading}>
      <View>
        <TitleText>Tasks</TitleText>
        {/* <GreySubText>2/4 Tasks Completed</GreySubText> */}
      </View>
      <View>
        <TouchableOpacity onPress={deleteAllTodos}>
          <Text style={styles.headingClearAll}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Todo = ({ name, completed = false, date }) => {
  // *************************************
  // TODO STATE LOADING
  // *************************************
  const dispatch = useDispatch();

  // TODO FUNCTIONS
  const deleteTodoByDate = () => {
    if (!completed) {
      dispatch(deleteTodo(date));
    } else {
      dispatch(deleteCompletedTodo(date));
    }
    dispatch(fetchTodos());
    dispatch(fetchCompleteTodos());
    showToast("sucessfully deleted todo! 👍");
  };

  const addToCompleted = () => {
    if (!completed) {
      dispatch(completeTodo(date));

      showToast("Successfully completed todo! 😍🔥");
      setTimeout(() => {
        dispatch(fetchCompleteTodos());
      }, 1000);
    } else {
      dispatch(unCompleteTodo(date));
      showToast("Successfully reinstated todo!🤦‍♂️🤷‍♂️😂");
      setTimeout(() => {
        dispatch(fetchTodos());
      }, 1000);
    }
  };

  return (
    <View
      style={[styles.todo, completed ? { borderColor: "gray" } : undefined]}
    >
      <View style={styles.todoContainer}>
        <Text
          style={[
            styles.todoText,
            completed
              ? { color: "gray", textDecorationLine: "line-through" }
              : undefined,
          ]}
        >
          {name}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={deleteTodoByDate}>
            <Ionicon
              name="trash-outline"
              size={20}
              color="red"
              style={styles.todoTrashIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={addToCompleted}>
            <Ionicon
              name={completed ? "close-outline" : "checkmark-outline"}
              size={20}
              color="green"
              style={styles.todoCheckIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AddTask = () => {
  const [todo, setTodo] = useState("");
  const { isSuccess } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const addTodo = async () => {
    let newTodo = {
      id: uuid.v4(),
      name: todo,
      date: Date.now(),
      completed: false,
    };

    try {
      if (isSuccess) {
        dispatch(addTodos(newTodo));
        dispatch(fetchTodos());
        setTodo("");
        showToast("Successfully added new task! 😍");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.addTask}>
      <View>
        <TextInput
          multiline
          placeholder="Add new task"
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={[styles.textInput, todo ? "" : { borderColor: "#696969" }]}
        />
        <TouchableOpacity
          disabled={todo ? false : true}
          onPress={addTodo}
          style={[
            styles.addTaskButton,
            todo ? "" : { backgroundColor: "#696969" },
          ]}
        >
          <Text style={styles.addTaskText}>ADD TASK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const showToast = (mesasage) => {
  ToastAndroid.show(mesasage, ToastAndroid.SHORT);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  todo: {
    display: "flex",
    justifyContent: "center",
    borderColor: "#1E90FF9e",
    borderWidth: 3,
    minHeight: 70,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  todoText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#0c0909b0",
    paddingLeft: 5,
    maxWidth: 280,
  },
  todoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoTrashIcon: {
    padding: 5,
    marginRight: 10,
    backgroundColor: "#ff00001e",
    borderRadius: 30,
  },
  todoCheckIcon: {
    padding: 5,
    marginRight: 10,
    backgroundColor: "#ff00001e",
    borderRadius: 30,
  },

  heading: {
    paddingBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingClearAll: {
    color: "#1E90FF",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "bold",
  },
  headingRefreshTodo: {
    color: "gray",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15,
  },

  addTask: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // minHeight: 150,
    // borderColor: "gray",
    // borderWidth: 1,
    // paddingHorizontal: 5,
    paddingVertical: 25,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#1E90FF",
    fontWeight: "bold",
    color: "#0c0909b0",
  },
  addTaskButton: {
    width: "100%",
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addTaskText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default TasksScreen;
