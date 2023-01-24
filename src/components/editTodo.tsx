import { Button, ButtonGroup, Center, ChakraProvider, Flex, Input } from '@chakra-ui/react'
import React, { FC } from 'react'

export const EditTodos:FC<any> = ({
editTodo,
editText,
updateTodo,
setEdit
}) => {
  return (
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
  )
}
