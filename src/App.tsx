import React, { useState } from 'react';
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
  const [details,setDetails] = useState<any>([]);
  const [detailText,setDetailText] = useState<string>("");

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
const todoStateChange1 = (targetTodo: any) => {
  const newTodoList = todoList.map((todo: any) => {
    if (targetTodo.id === todo.id) {
      return { ...todo, state: 1 }
    } else {
      return todo
    }
  })
  setTodoList(newTodoList)
};

const todoStateChange2 = (targetTodo: any) => {
  const newTodoList = todoList.map((todo: any) => {
    if (targetTodo.id === todo.id) {
      return { ...todo, state: 2 }
    } else {
      return todo
    }
  })
  setTodoList(newTodoList)
};

const todoStateChange3 = (targetTodo: any) => {
  const newTodoList = todoList.map((todo: any) => {
    if (targetTodo.id === todo.id) {
      return { ...todo, state: 3 }
    } else {
      return todo
    }
  })
  setTodoList(newTodoList)
};

//セレクトした内容によって表示するものを変える
// const TodoState = (state: number) => {
//   useEffect(() => {
//     if (state === 1) {
//       return <p>未完了</p>;
//     }
//     if (state === 2) {
//       return <p>進行中</p>;
//     }
//     if (state === 3) {
//       return <p>完了</p>;
//     }
//   }, [state]);
// };

//完了状態によって並び替え
const listSort = (todoList: any) => {
  const copyTodoList = todoList
  copyTodoList.sort((a: any, b: any) => {
    console.log(a, b)
    if (a.state < b.state) {
      return 1;
    }
    if (a.state > b.state) {
      return -1;
    } else {
      return 0;
    }
  });
  console.log(copyTodoList)
  setTodoList(copyTodoList);
};

//詳細入力を受け取り
const detailInput=(e:React.ChangeEvent<HTMLInputElement>) => setDetailText(e.target.value);

//詳細をセット
const addDetail = () => {
  setDetails([...details,detailText]);
  setDetailText("");
}

//絞り込み機能
const todoFilter1 = (todolist:any) => {
  const todoList2 = todolist.slice();
  const fillter1TodoList = todolist.filter((todo:any)=> todo.state === 1)
  setTodoList(fillter1TodoList);
  resetTodoList(todoList2);

}
const todoFilter2 = (todolist:any) => {
  const fillter2TodoList = todolist.filter((todo:any)=> todo.state === 2)
  setTodoList(fillter2TodoList);
}
const todoFilter3 = (todolist:any) => {
  const fillter3TodoList = todolist.filter((todo:any)=> todo.state === 3)
  setTodoList(fillter3TodoList);
}
//絞り込み後から元に戻す
const resetTodoList = (todoList2:any) => {
  setTodoList(todoList2);
}



return (
  <>
    {edit ? (
      <ChakraProvider>
        <Flex>
          <Input size="sm" type="text" value={editTodo} onChange={editText}></Input>
          <Button onClick={updateTodo}>更新</Button>
          <Button onClick={() => setEdit(false)}>キャンセル</Button>
        </Flex>
      </ChakraProvider>
    ) : (
      <ChakraProvider>
        <h1>TODO LIST</h1>
        <form>
          <Flex display="flex" w="200px">
            <Input size="sm" type="text" placeholder="TODOを入力" onChange={textInput} value={todoText}></Input>
            <Button colorScheme="blue" onClick={addTodo}>
              作成
            </Button>
          </Flex>
        </form>
      </ChakraProvider>
    )}

    <div className="Todos">
      <ChakraProvider>
        <Stack>
          <Button onClick={() => listSort(todoList)}>並び替え</Button>
          <Menu>
                <MenuButton as={Button}>絞り込み</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => todoFilter1(todoList)}>未完了のTODO</MenuItem>
                  <MenuItem onClick={() => todoFilter2(todoList)}>進行中のTODO</MenuItem>
                  <MenuItem onClick={() => todoFilter3(todoList)}>完了したTODO</MenuItem>
                </MenuList>
          </Menu>
          <Button onClick={()=> resetTodoList(todoList)}>戻す</Button>
          {todoList.map((todo: any) => (
            <Flex key={todo.id}>
              {todo.text}
              <Button onClick={() => deleteTodo(todo.id)}>削除</Button>
              <Button onClick={() => editTodoContents(todo)}>編集</Button>
              <Menu>
                <MenuButton as={Button}>進行状況</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => todoStateChange1(todo)}>未完了</MenuItem>
                  <MenuItem onClick={() => todoStateChange2(todo)}>進行中</MenuItem>
                  <MenuItem onClick={() => todoStateChange3(todo)}>完了</MenuItem>
                </MenuList>
              </Menu>
              {/* {TodoState(todo.state)} */}
              <Box>{todo.state === 1 ? "未完了" : todo.state === 2 ? "進行中" : "完了"}</Box>
              <Box>
                {details.map((detail:any)=>(
                  <Box key={detail}>
                    {detail}
                  </Box>
                ))}
                <Input placeholder={"詳細を入力"} onChange={detailInput}></Input>
                <Button onClick={addDetail}>+</Button>
              </Box>
            </Flex>
          ))}
        </Stack>
      </ChakraProvider>
    </div>
  </>
);
}

export default App;
