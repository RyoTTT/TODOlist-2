import { Box, Button, Center, Flex, Input, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { FC } from 'react'

export const TodoList:FC<any> = ({
    displayedTodoList,
    deleteTodo,
    editTodoContents,
    todoStateChange1,
    todoStateChange2,
    todoStateChange3,
    detailInput,
    addDetail,
    details
}) => {
return (
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
        <Box fontWeight="bold">{todo.state === 1 ? "未完了" : todo.state === 2 ? "進行中" : "完了"}</Box>
        <Box display="flex" paddingLeft="10px">
        <Input placeholder={"詳細を入力"} onChange={detailInput} marginRight="5px"></Input>
        <Button onClick={()=>addDetail(todo.id)}>+</Button>
        {details.map((detail:any)=>(
            <Box key={todo.id} paddingRight="5px" w="100px">
            {todo.id === detail.id ? detail.text : "なし"}
            </Box>
        ))}
        </Box>
    </Flex>
    </Center>
    ))}
    </Box>
  )
}
