import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (arg, { rejectWithValue }) => {
    try {
      const todo = await AsyncStorage.getItem("todos");
      
      if(todo === undefined || todo === null){
        await AsyncStorage.setItem("todos", JSON.stringify([]));
        return [];
      }else {
        return JSON.parse(todo);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchCompleteTodos = createAsyncThunk(
  "todo/fetchCompleteTodos",
  async (arg, { rejectWithValue }) => {
    try {
      const todo = await AsyncStorage.getItem("completedTodos");
      
      if(todo === undefined || todo === null){
        await AsyncStorage.setItem("completedTodos", JSON.stringify([]));
        return [];
      }else {
        return JSON.parse(todo);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const addTodos = createAsyncThunk(
  "todo/addTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      let updatedTodos = JSON.parse(todos);
      updatedTodos.push(todo)
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
      // await AsyncStorage.setItem("completedTodos", JSON.stringify([]));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (date, { rejectWithValue }) => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      let updatedTodos = JSON.parse(todos);
      let index = updatedTodos.findIndex(item=> item.date === date);
      updatedTodos.splice(index, 1);
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteCompletedTodo = createAsyncThunk(
  "todo/deleteCcompletedTodo",
  async (date, { rejectWithValue }) => {
    try {
      const todos = await AsyncStorage.getItem("completedTodos");
      let updatedTodos = JSON.parse(todos);
      let index = updatedTodos.findIndex(item=> item.date === date);
      updatedTodos.splice(index, 1);
      await AsyncStorage.setItem("completedTodos", JSON.stringify(updatedTodos));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteAllTodo = createAsyncThunk(
  "todo/deleteAllTodo",
  async (args, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify([]));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteAllCompletedTodo = createAsyncThunk(
  "todo/deleteAllCompletedTodo",
  async (args, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem("completedTodos", JSON.stringify([]));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


export const completeTodo = createAsyncThunk(
  "todo/completeTodo",
  async (date, { rejectWithValue }) => {
    try {
      // remove it from todos
      const todos = await AsyncStorage.getItem("todos");
      let updatedTodos = JSON.parse(todos);
      
      let index = updatedTodos.findIndex(item=> item.date === date);
      
      
      // // save the todo that was removed
      let completedTodo = updatedTodos[index];

      completedTodo["completed"] = true;

      updatedTodos.splice(index, 1); 
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
      
      //get completed todos from async-storage and add this new todo
      const completeTodos = await AsyncStorage.getItem("completedTodos");
      let updatedCompleteTodos = JSON.parse(completeTodos);
      updatedCompleteTodos.push(completedTodo)
      
      await AsyncStorage.setItem("completedTodos", JSON.stringify(updatedCompleteTodos));   
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const unCompleteTodo = createAsyncThunk(
  "todo/unCompleteTodo",
  async (date, { rejectWithValue }) => {
    try {
      // remove it from todos
      const todos = await AsyncStorage.getItem("completedTodos");
      let updatedTodos = JSON.parse(todos);

      let index = updatedTodos.findIndex(item=> item.date === date);
      
      // // save the todo that was removed
      let completedTodo = updatedTodos[index];

      completedTodo["completed"] = false;

      updatedTodos.splice(index, 1); 
      await AsyncStorage.setItem("completedTodos", JSON.stringify(updatedTodos));
      
      //get completed todos from async-storage and add this new todo
      const completeTodos = await AsyncStorage.getItem("todos");

      let updatedCompleteTodos = JSON.parse(completeTodos);
      updatedCompleteTodos.push(completedTodo)
      
      await AsyncStorage.setItem("todos", JSON.stringify(updatedCompleteTodos));   
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: true,
    isSuccess: false,
    data: [],
    completeTodos: [],
    message: "",
    refresh: false
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    builder.addCase(fetchCompleteTodos.fulfilled, (state, action) => {
      state.completeTodos = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(fetchCompleteTodos.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchCompleteTodos.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    // DELETING TODO

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    // DELETING TODO

    builder.addCase(deleteCompletedTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(deleteCompletedTodo.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(deleteCompletedTodo.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    // DELETING ALL TODO

    builder.addCase(deleteAllTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(deleteAllTodo.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(deleteAllTodo.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    // DELETING ALL COMPLETED TODO

    builder.addCase(deleteAllCompletedTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(deleteAllCompletedTodo.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(deleteAllCompletedTodo.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    // ADDING TODO

    builder.addCase(addTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(addTodos.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(addTodos.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    }),

    // COMPLETING TODO

    builder.addCase(completeTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(completeTodo.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(completeTodo.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    })

    // COMPLETING TODO

    builder.addCase(unCompleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    }),
    builder.addCase(unCompleteTodo.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    }),
    builder.addCase(unCompleteTodo.rejected, (state, action) => {
      state.message = "failed to retrive data";
      state.isLoading = false;
      state.isSuccess = false;
    })
  },
});

export default todoSlice.reducer;
