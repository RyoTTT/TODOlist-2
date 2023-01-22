import React, { useState , useEffect } from 'react';
import {Box, ButtonGroup, Center, ChakraProvider, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import {Button, Input, Flex } from '@chakra-ui/react';

function App()  {
  //type todos = {
    //id:number,
    //text:string,
    //state:boolean
  //}
  const [todoList,setTodoList] = useState<any>([]);
  const [todoText,setTodoText] = useState<string>("");
  const [edit,setEdit] = useState(false);
  const [editTodo,setEditTodo] = useState<string>("");
  const [todoId,setTodoId] = useState<number>(1);
  const [editTargetTodo,setEditTargetTodo] = useState<any>({});
  const [details,setDetails] = useState<any>([]);
  const [detailText,setDetailText] = useState<string>("");
    // 表示用のtodoリスト
    const [displayedTodoList, setDisplayedTodoList] = useState<any>([])
    // 絞り込み用todoリスト
    const [filteredTodoList, setFilteredTodoList] = useState<any>([])

//入力文字をセット
  const textInput=(e:React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  // 表示用のtodoリストの更新
useEffect(() => {
  if (filteredTodoList.length > 0) {
    setDisplayedTodoList([...filteredTodoList])
  } if (filteredTodoList.length = 0) {
    setDisplayedTodoList([{}])
  } else {
    setDisplayedTodoList(todoList);
  }
}, [todoList, filteredTodoList])

//配列に入力したものを入れる
  const addTodo = () =>{
    const newTodos:any = {
      id:todoId,
      text:todoText,
      state:1,
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


//完了状態によって並び替え
const listSort = (todos: any) => {
  const copyTodoList = [...todos];
  copyTodoList.sort((a: any, b: any) => {
    if (a.state < b.state) {
      return -1;
    }
    if (a.state > b.state) {
      return 1;
    }
    return 0;
  });
  setTodoList(copyTodoList)
};

//詳細入力を受け取り
const detailInput=(e:React.ChangeEvent<HTMLInputElement>) => setDetailText(e.target.value);

//詳細をセット
const addDetail = () => {
  setDetails([...details,detailText]);
  setDetailText("");
}

//絞り込み機能
const todoFilter1 = (todoList:any) => {
  const filterTodoList = todoList.filter((todo:any)=> todo.state === 1)
  setFilteredTodoList([...filterTodoList])
}

const todoFilter2 = (todoList:any) => {
  const filterTodoList = todoList.filter((todo:any)=> todo.state === 2)
  setFilteredTodoList([...filterTodoList])
}

const todoFilter3 = (todoList:any) => {
  const filterTodoList = todoList.filter((todo:any)=> todo.state === 3)
  setFilteredTodoList([...filterTodoList])
}

//絞り込み後から元に戻す
const resetTodoList = () => {
  setFilteredTodoList([])
}



return (
  <>
    {edit ? (
      <ChakraProvider>
        <Center paddingTop="20px" paddingBottom="20px">
        <Flex  width='520px' >
          <Input size="sm" type="text" value={editTodo} onChange={editText} p="10px 5px"></Input>
          <ButtonGroup gap="2" paddingLeft="10px">
          <Button onClick={updateTodo}>更新</Button>
          <Button onClick={() => setEdit(false)}>キャンセル</Button>
          </ButtonGroup>
        </Flex>
        </Center>
      </ChakraProvider>
    ) : (
      <ChakraProvider>
        <h1>TODO LIST</h1>
        <Center paddingTop="20px" paddingBottom="20px">
        <form>
          <Flex display="flex" w="520px" bg="">
            <Input size="sm" type="text" placeholder="TODOを入力" onChange={textInput} value={todoText}></Input>
            <Button colorScheme="blue" onClick={addTodo} marginLeft="10px">
              作成
            </Button>
          </Flex>
        </form>
        </Center>
      </ChakraProvider>
    )}


      <ChakraProvider>
          <Center>
          <Button onClick={() => listSort(todoList)} size="sm" marginRight="10px">並び替え</Button>
          <Menu>
                <MenuButton as={Button} size="sm" marginRight="10px">絞り込み</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => todoFilter1(todoList)}>未完了のTODO</MenuItem>
                  <MenuItem onClick={() => todoFilter2(todoList)}>進行中のTODO</MenuItem>
                  <MenuItem onClick={() => todoFilter3(todoList)}>完了したTODO</MenuItem>
                </MenuList>
          </Menu>
          <Button onClick={resetTodoList} size="sm">戻す</Button>
          </Center>
          <Box bg="#ccffff" w="900px" h="fit-content"  margin="30px auto" justifyContent="space-between">
          {displayedTodoList.map((todo: any) => (
            <Center >
            <Flex key={todo.id} align="center" >
              <Box paddingRight="7px" fontSize="20px">{todo.text}</Box>
              <Button onClick={() => deleteTodo(todo.id)} marginRight="10px">削除</Button>
              <Button onClick={() => editTodoContents(todo)}marginRight="10px">編集</Button>
              <Menu>
                <MenuButton as={Button} marginRight="10px">進行状況</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => todoStateChange1(todo)}>未完了</MenuItem>
                  <MenuItem onClick={() => todoStateChange2(todo)}>進行中</MenuItem>
                  <MenuItem onClick={() => todoStateChange3(todo)}>完了</MenuItem>
                </MenuList>
              </Menu>
              {/* {TodoState(todo.state)} */}
              <Box fontWeight="bold">{todo.state === 1 ? "未完了" : todo.state === 2 ? "進行中" : "完了"}</Box>
              <Box display="flex" paddingLeft="10px">
                {details.map((detail:any)=>(
                  <Box key={detail}>
                    {detail}
                  </Box>
                ))}
                <Input placeholder={"詳細を入力"} onChange={detailInput} marginRight="5px"></Input>
                <Button onClick={addDetail}>+</Button>
              </Box>
            </Flex>
            </Center>
            
          ))}
          </Box>
        
      </ChakraProvider>
  </>
);
}

export default App;
