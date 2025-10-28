import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';
import { useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType ={
  id:number;
  // user_id:string;
  title:string;
  is_completed:boolean;
  // description:string;
  // created_at:string;
}

export default function Index() {

   useEffect(() => {
    const getTodos = async() => {
      try{
        const todos = await AsyncStorage.getItem("my-todo");
        if(todos !== null){
          setToDos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      }catch(error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  // const todoData = [
  //   {
  //     id:1, 
  //     // user_id:"",
  //     title:"Todo 1",
  //     // description:"this is about todo 1",
  //     is_completed:true,
  //     // created_at:"",
  //   },
  //   {
  //     id:2, 
  //     // user_id:"",
  //     title:"Todo 2",
  //     // description:"this is about todo 1",
  //     is_completed:false,
  //     // created_at:"",
  //   },
  //   {
  //     id:3, 
  //     // user_id:"",
  //     title:"Todo 3",
  //     // description:"this is about todo 1",
  //     is_completed:false,
  //     // created_at:"",
  //   },
  //   {
  //     id:4, 
  //     // user_id:"",
  //     title:"Todo 4",
  //     // description:"this is about todo 1",
  //     is_completed:false,
  //     // created_at:"",
  //   },
  //   {
  //     id:5, 
  //     // user_id:"",
  //     title:"Todo 5",
  //     // description:"this is about todo 1",
  //     is_completed:false,
  //     // created_at:"",
  //   },
  //   {
  //     id:6, 
  //     // user_id:"",
  //     title:"Todo 6",
  //     // description:"this is about todo 1",
  //     is_completed:false,
  //     // created_at:"",
  //   },
  //   {
  //     id:7, 
  //     // user_id:"",
  //     title:"Todo 7",
  //     // description:"this is about todo 1",
  //     is_completed:false,
  //     // created_at:"",
  //   },
  // ];

  const [todos, setToDos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);

    const addTodo = async () => {
    try{
      const newTodo = {
        id:Math.random(),
        title:todoText,
        is_completed:false
      };
      todos.push(newTodo);
      setToDos(todos);
      setOldTodos(todos);
      await AsyncStorage.setItem('my-todo', JSON.stringify(todos));
      setTodoText("");
      Keyboard.dismiss();
    } catch(error){
        console.log(error);
    }
  }

  const deleteTodo = async(id: number) => {
    try{
      const newTodos = todos.filter((todo) => todo.id !== id);
    await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
    setToDos(newTodos);
    setOldTodos(newTodos)
    }catch(error){
      console.log(error);
    }
  } 

  const handleDone = async (id: number) => {
    try{
      const newTodos=todos.map((todo) => {
        if(todo.id === id) {
          todo.is_completed = !todo.is_completed;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setToDos(newTodos);
      setOldTodos(newTodos);
    }catch(error){
      console.log(error);
    }
  };

  const onSearch = (query: string) => {
    if(query == ''){
      setToDos(oldTodos);
    }else{
      const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setToDos(filteredTodos)
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() =>{alert('Clicked!')}}>
          <Ionicons 
            name="menu" 
            size={24} 
            color={'#333'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Image 
          source={{uri: "https://xsgames.co/randomusers/avatar.php?g=male"}}
          style={{width:40, height:40, borderRadius:20}}
          />
        </TouchableOpacity>  

      </View>


      <View style={styles.searchBar}>

        <Ionicons
         name="search" 
         size={24} 
         color={'#333'}
        />
        <TextInput 
        placeholder="Search" 
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor='#888' 
        clearButtonMode="always" 
        style={styles.searchInput}
        />

      </View>


      <FlatList 
        data={todos} 
        keyExtractor={(item)=>item.id.toString()} 
        renderItem={({item})=>(
          <ToDoItem  
            todo={item} 
            deleteTodo={deleteTodo} 
            handleTodo={handleDone}
          />
        )}
      />


      <KeyboardAvoidingView 
        style={styles.footer} 
        behavior="padding" 
        keyboardVerticalOffset={10}>

        <TextInput 
          placeholder="Add New ToDo" 
          value={todoText} 
          placeholderTextColor='#888' 
          onChangeText={(text) => setTodoText(text)} 
          style={styles.newTodoInput} 
          autoCorrect={false}
        />

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => addTodo()}>
          <Ionicons 
            name="add" 
            size={34} 
            color={'#fff'}
          />
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const ToDoItem = ({todo, deleteTodo, handleTodo} : {todo:ToDoType, deleteTodo:(id:number, title:string) => void, handleTodo:(id:number) => void}) => (
  
  <View style={styles.todoContainer}>

          <View style={styles.todoInfoContainer}>

            <Checkbox 
              value={todo.is_completed}
              onValueChange={() => handleTodo(todo.id)}
              color={todo.is_completed?"#4d9bdbff":undefined}
            />
            <Text style={[styles.todoText, todo.is_completed && {textDecorationLine: 'line-through'}]}>{todo.title}</Text>
          </View>
          {/* <Text style={styles.description}>{item.description}</Text> */}
          <TouchableOpacity 
            onPress={() => {
              deleteTodo(todo.id, todo.title);
              // alert('Deleted '+ todo.title);
              }}>
            <Ionicons 
              name="trash" 
              size={24} 
              color={'red'}
            />
          </TouchableOpacity>
          
        </View>
)

const styles = StyleSheet.create({
  container:{
        flex: 1,
        paddingHorizontal:20,
        backgroundColor:'#f5f5f5'
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#c4dce057',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS=== 'ios'? 16 : 8,
    alignItems:'center',
    borderRadius: 10,
    gap: 10,
    marginBottom:20,
    justifyContent:'center'
  },
  searchInput:{
    flex:1,
    fontSize:16,
    tintColor:'#111',
    color: '#333'
  },
  todoContainer:{
    flexDirection:'row',
    backgroundColor:'#8dbad4ff',
    justifyContent:'space-between',
    padding:16,
    borderRadius:10,
    marginBottom:20
  },
  todoInfoContainer:{
    flexDirection:'row',
    gap:10,
    alignItems:'center'
  },
  description:{
    color:'#888'
  },
  todoText:{
    fontSize:16,
    color:'#333'
  },
  footer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  newTodoInput:{
    flex:1,
    backgroundColor: '#c4dce057',
    padding: 16,
    borderRadius: 10,
    fontSize:16,
    color:'#333',
  },
  addButton:{
    backgroundColor: '#4d9bdbff',
    padding:8,
    borderRadius:10,
    marginLeft:20,
  }

});