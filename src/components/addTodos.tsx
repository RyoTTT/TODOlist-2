import { Button, Center, Flex, Input } from '@chakra-ui/react';
import React, { FC } from 'react'

export const AddTodos:FC<any> = ({
    todoText,
    textInput,
    addTodo
})  => {
  return (
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
  )
}
