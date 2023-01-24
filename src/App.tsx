import React, { useState , useEffect } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { AddTodos } from "./components/addTodos";
import { EditTodos } from './components/editTodo';
import { Options } from './components/options';
import { TodoList } from './components/todoList';

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
  const [displayedTodoList, setDisplayedTodoList] = useState<any>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<any>([]);
  const [filterState, setFilterState] = useState<boolean>(false);
  

//入力文字をセット
  const textInput=(e:React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value);

  // 表示用のtodoリストの更新
useEffect(() => {
  if (filteredTodoList.length > 0) {
    setDisplayedTodoList([...filteredTodoList])
  } else if (filterState === true && filteredTodoList.length === 0) {
    setDisplayedTodoList([]);
  }
  else {
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
    setEditTargetTodo({id:todo.id,text:todo.text,state:todo.state});
  }

//編集したものを保持
  const editText = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
const addDetail = (todoId:number) => {
  setDetails([...details,{id:todoId,text:detailText}]);
  console.log(details);
  setDetailText("");

}

//絞り込み機能
const todoFilter1 = (todoList:any) => {
  const filterTodoList = todoList.filter((todo:any)=> todo.state === 1)
  setFilteredTodoList([...filterTodoList])
  if (todoList.length > 0) {
    setFilterState(true);
  } else {
    setFilterState(false);
  }
}

const todoFilter2 = (todoList:any) => {
  const filterTodoList = todoList.filter((todo:any)=> todo.state === 2)
  setFilteredTodoList([...filterTodoList])
  if (todoList.length > 0) {
    setFilterState(true);
  } else {
    setFilterState(false);
  };
}

const todoFilter3 = (todoList:any) => {
  const filterTodoList = todoList.filter((todo:any)=> todo.state === 3)
  setFilteredTodoList([...filterTodoList])
  if (todoList.length > 0) {
    setFilterState(true);
  } else {
    setFilterState(false);
  };
}

//絞り込み後から元に戻す
const resetTodoList = () => {
  setFilteredTodoList([])
  setFilterState(false);
}

//グーグルサインイン
  const signInWithGoogle = () => {
    signInWithPopup(auth,provider);
  }
//グーグルサインアウト
  const signOutWithGoogle = () => {
    auth.signOut();
  }
//user取得
const [user] = useAuthState(auth);



return (
  <>
  { user ? (<>
  <Box paddingTop="10px" paddingLeft="10px">
  <p>ユーザー名:{auth.currentUser?.displayName}</p>
  <Button type="button" onClick={signOutWithGoogle}>サインアウト</Button>
  </Box>
    {edit ? (
      <EditTodos
      editTodo={editTodo}
      editText={editText}
      updateTodo={updateTodo}
      setEdit={setEdit} />
    ) : (
      <ChakraProvider>
        <AddTodos
            todoText={todoText}
            textInput={textInput}
            addTodo={addTodo}>
        </AddTodos>
      </ChakraProvider>
    ) }
      <ChakraProvider>
        <Options
          listSort={listSort}
          todoFilter1={todoFilter1}
          todoFilter2={todoFilter2}
          todoFilter3={todoFilter3}
          resetTodoList={resetTodoList}
          todoList={todoList}>
          </Options>

        <TodoList
            displayedTodoList={displayedTodoList}
            deleteTodo={deleteTodo}
            editTodoContents={editTodoContents}
            todoStateChange1={todoStateChange1}
            todoStateChange2={todoStateChange2}
            todoStateChange3={todoStateChange3}
            detailInput={detailInput}
            addDetail={addDetail}
            details={details}
            />
      </ChakraProvider>
    </>
    ): (<Box display="flex" margin="0 auto">
      <Button onClick={signInWithGoogle}><p>グーグルでサインイン</p></Button>
      </Box>) }
  </>
  
      
);
}

export default App;