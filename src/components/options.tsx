import { Button, Center, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Options:FC<any> = ({
listSort,
todoFilter1,
todoFilter2,
todoFilter3,
resetTodoList,
todoList
}) => {
    return (
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
    )
}