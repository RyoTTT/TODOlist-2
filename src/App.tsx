import React, { useEffect, useState } from 'react';
import {Box, ChakraProvider, Menu, MenuButton, MenuItem, MenuList, Stack} from '@chakra-ui/react';
import {Button, Input, Flex } from '@chakra-ui/react';

function App()  {
  //type todos = {
    //id:number,
    //text:string,
    //state:boolean
  //}
  const [todoList,setTodoList] = useState<any>([{}]);
  const [todoText,setTodoText] = useState<string>("");
  const [edit,setEdit] = useState(false);
  const [editTodo,setEditTodo] = useState<string>("");
  const [todoId,setTodoId] = useState<number>(1);
  const [editTargetTodo,setEditTargetTodo] = useState<any>({});

//入力文字をセット
  const textInput=(e:React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

//配列に入力したものを入れる
  const addTodo = () =>{
    const newTodos:any = {
      id:todoId,
      text:todoText,
      state:1
    }
    setTodoList([...todoList,newTodos])
    setTodoId(todoId+1);
    setTodoText("");
  };

//TODO削除
  const deleteTodo = (id:number) =>{
    const removeTodo = todoList.filter((todo:any)=> todo.id !== id);
    setTodoList(removeTodo);
  }

//編集モードオン
  const editTodoContents = (todo:any) => {
    setEdit(true);
    setEditTodo(todo.text);
    setEditTargetTodo({id:todo.id,text:todo.text,state:todo.state});
  }

//編集したものを保持
  const editText = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
    setEditTargetTodo({...editTargetTodo,text:editTodo})

  }

//編集したものを更新
  const updateTodo = () => {
    const newTodo:any = todoList.map((todo:any)=> {
      if(todo.id === editTargetTodo.id) {
        return {id:todo.id,text:editTargetTodo.text,state:todo.state};
      } else {
        return {id:todo.id,text:todo.text,state:todo.state};
      }
    })
    setTodoList(newTodo);
  }

  //リストの進行状況変更
const todoStateChange1 = (state:number) =>{
  state = 1;
  return state;
}
const todoStateChange2 = (state:number) =>{
  state = 2;
  return state;
}
const todoStateChange3 = (state:number) =>{
  state = 3;
  return state;
}

//セレクトした内容によって表示するものを変える
const TodoState = (state:number) => {
  useEffect(() => {
if (state === 1) {
  return <p>未完了</p>
} if (state === 2) {
  return <p>進行中</p>
} if (state === 3) {
  return <p>完了</p>
}},[state]);
}

//完了状態によって並び替え
  const listSort = (todoList:any) =>{
    const sortedTodoList = todoList.sort((a:any,b:any)=>{
      if(a[state] < b[state]) {
        return +1;
      } if (a[state] > b[state]) {
        return -1;
      } else {
        return 0;
      }
    })
    setTodoList(sortedTodoList);
  }


  return (
  <>
  {edit ? (
    <ChakraProvider>
      <Flex>
        <Input size="sm" type="text" value={editTodo} onChange={editText}></Input>
        <Button onClick={updateTodo}>更新</Button>
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
        <Button onClick={()=>listSort(todoList)}>並び替え</Button>
        {todoList.map((todo:any)=>
          <Box key={todo.id}>{todo.text}
          <Button onClick={()=>deleteTodo(todo.id)}>削除</Button>
          <Button onClick={()=>editTodoContents(todo)}>編集</Button>
          <Menu>
  <MenuButton as={Button}>
    進行状況
  </MenuButton>
  <MenuList>
    <MenuItem onClick={()=>todoStateChange1(todo.state)}>未完了</MenuItem>
    <MenuItem onClick={()=>todoStateChange2(todo.state)}>進行中</MenuItem>
    <MenuItem onClick={()=>todoStateChange3(todo.state)}>完了</MenuItem>
  </MenuList>
</Menu>
{TodoState(todo.state)}
          </Box>
        )}
      </Stack>
    </ChakraProvider>
      </div>

  </>

  
    
  );
}

export default App;
