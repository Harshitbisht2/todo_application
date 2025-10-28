import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todoData = [
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
    {
      id:1, 
      user_id:"",
      title:"Todo 1",
      description:"this is about todo 1",
      is_completed:false,
      created_at:"",
    },
  ]
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList data={todoData} keyExtractor={(item)=>item.id.toString()} renderItem={({item})=>(
        <View>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}/>
    </SafeAreaView>
  );
}
