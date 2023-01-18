import React, { useState } from 'react';
import {Box, ChakraProvider, Checkbox, Stack} from '@chakra-ui/react';
import {Button, Input, Flex  } from '@chakra-ui/react';

function App()  {
  type todos = {
    id:number,
    text:string,
    state:boolean
  }
  const [todoList,setTodoList] = useState<todos[]>([]);
  const [todoText,setTodoText] = useState<string>("");
  const [edit,setEdit] = useState(false);
  const [editTodo,setEditTodo] = useState<string>("");
  const [todoId,setTodoId] = useState<number>(1);


  const textInput=(e:React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  const addTodo = () =>{
    const newTodos:todos = {
      id:todoId,
      text:todoText,
      state:false
    }
    setTodoList([...todoList,newTodos])
    setTodoId(todoId+1);
    setTodoText("");
    console.log(todoList);
  };

  const deleteTodo = (id:number) =>{
    const removeTodo = todoList.filter((todo)=> todo.id !== id);
    setTodoList(removeTodo);
  }

  const editTodoContents = (text:string,id:number) => {
    setEdit(true);
    setEditTodo(text);
    updateTodo(text,id)
  }

  const editText = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  }

  const updateTodo = (text:string,id:number) => {
    const newTodo = todoList.map((todo)=> {
      if(id === todoList.id) {
        return ;
      } else {
        return todoList.text;
      }
      
    }
  }

  const completeTodo = (todo:todos) => {
    console.log(todo);
  }







  return (
  
    
  <>
  {edit ? (
    <ChakraProvider>
      <Flex>
        <Input size="sm" type="text" value={editTodo} onChange={editText}></Input>
        <Button onClick={}>更新</Button>
        <Button onClick={()=>setEdit(false)}>キャンセル</Button>
      </Flex>
    </ChakraProvider>
  ) : (
    <ChakraProvider>
        <h1>TODO LIST</h1>
        <form>
          <Flex display="flex" w="200px">
          <Input size="sm" type="text" placeholder='TODOを入力' onChange={textInput} value={todoText}></Input>
          <Button colorScheme='blue' onClick={addTodo}>作成</Button>
          </Flex>
        </form>    
    </ChakraProvider>
  )}

      <div className="Todos">
    <ChakraProvider>
      <Stack>
        {todoList.map((todo)=>
          <Box key={todo.id}>{todo.text}
          <Checkbox onChange={()=>completeTodo(todo)}>完了</Checkbox>
          <Button onClick={()=>deleteTodo(todo.id)}>削除</Button>
          <Button onClick={()=>editTodoContents(todo.text,todo.id)}>編集</Button>
          </Box>
        )}
      </Stack>
    </ChakraProvider>
      </div>

  </>

  
    
  );
}

export default App;
