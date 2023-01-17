import React, { useState } from 'react';
import {Box, ChakraProvider, Checkbox, Stack} from '@chakra-ui/react';
import {Button, Input, Flex } from '@chakra-ui/react';

function App()  {
  type todos = {
    id:number,
    text:string,
    state:boolean
  }
  const [todoList,setTodoList] = useState<todos[]>([]);
  const [todoText,setTodoText] = useState<string>("");
  var todoId:number = 1;

  const textInput=(e:React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  const addTodo = () =>{
    const newTodos:todos = {
      id:todoId,
      text:todoText,
      state:false
    }
    setTodoList([...todoList,newTodos])
    todoId++;
    console.log(todoList);
  };







  return (
  
    <div className="App">
    <ChakraProvider>
      <div className="inputForm">
        <h1>TODO LIST</h1>
        <form>
          <Flex display="flex" w="200px">
          <Input size="sm" type="text" placeholder='TODOを入力' onChange={textInput} value={todoText}></Input>
          <Button colorScheme='blue' onClick={addTodo}>作成</Button>
          </Flex>
        </form>
      </div>
    </ChakraProvider>

      <div className="Todos">
    <ChakraProvider>
      <Stack>
        {todoList.map((todo)=>
          <Box key={todo.id}>{todo.text}<Checkbox>完了</Checkbox><Button>削除</Button><Button>編集</Button></Box>
        )}
      </Stack>
    </ChakraProvider>
      </div>

    </div>
    
  );
}

export default App;
