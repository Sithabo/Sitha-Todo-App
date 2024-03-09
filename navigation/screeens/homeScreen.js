import { ShadowView } from "@dotmind/rn-shadow-generator";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodos,
  fetchCompleteTodos,
  fetchTodos,
} from "../../features/todoSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { showToast } from "./TasksScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const welcomeImg = require("../../assets/welcome.png");
const termsImg = require("../../assets/Terms.png");

function HomeScreen() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.todo);
  
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCompleteTodos());
  }, [isSuccess]);

  // *************************************************
  // ADDING OUR TODOS TO ASYNC STORAGE ++WORKS++
  // *************************************************

  const addTodo = async () => {
    let newTodo = {
      name: todo,
      date: Date.now(),
      completed: false,
    };

    try {
      if (isSuccess) {
        dispatch(addTodos(newTodo));
        dispatch(fetchTodos());
        setTodo("");
        showToast("Successfully added todo! 😎🔥");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image
          source={welcomeImg}
          style={{ width: "100%", height: 200 }}
          resizeMode="contain"
        />

        <View
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            marginTop: 60,
          }}
        >
          <Image
            source={termsImg}
            style={{ width: "100%", height: 200 }}
            resizeMode="contain"
            alt="How to use"
          />
          <View style={{ display: "flex", alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <Ionicons name="barbell-outline" size={20} color="#1E90FF" />
              <Text
                style={{
                  maxWidth: 300,
                  paddingHorizontal: 15,
                  paddingBottom: 5,
                  fontWeight: "500",
                  color: "#0c0909bf",
                }}
              >
                Click on the button "ADD TASK" below to add your todo😎
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <Ionicons name="barbell-outline" size={20} color="#1E90FF" />
              <Text
                style={{
                  maxWidth: 300,
                  paddingHorizontal: 15,
                  fontWeight: "500",
                  color: "#0c0909bf",
                }}
              >
                Swipe left and start working!😁👍
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ShadowView level={10} style={styles.addTask}>
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
      </ShadowView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  container2: {
    marginVertical: 40,
    marginHorizontal: 25,
  },

  addTask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 170,
    borderColor: "gray",
    paddingHorizontal: 25,
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

export default HomeScreen;
