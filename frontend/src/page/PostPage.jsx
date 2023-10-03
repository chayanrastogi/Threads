import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import { useState } from 'react'
import Comments from '../components/Comments'

function PostPage() {

  const[liked, setLiked] = useState(false)


  return (
    <>
      <Flex>
        <Flex alignItems={"center"} gap={3} w={"full"}>
          <Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png' />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>Mark Zuckerberg</Text>
            <Image src='/verified.png' w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={"3"}>Lets talk about threads.</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src='/post1.png' w={"full"} />
      </Box>
      <Flex gap={3} my={3} cursor={"pointer"}>
        <Actions liked={liked} setLiked={setLiked}/>
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize='sm'>
          281 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize='sm'>
          {200 + (liked? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={"4"} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={'2xl'}>👋</Text>
          <Text color={"gray.light"}>Get app to post, like and reply.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={"4"} />
      <Comments
      comment='Looks really good!'
      createdAt='2d'
      likes={21}
      username='johndoe'
      userAvatar='https://bit.ly/dan-abramov'
      />
      <Comments
      comment='Looks good!'
      createdAt='1d'
      likes={11}
      username='gwen'
      userAvatar='https://bit.ly/sage-adebayo'
      />
      <Comments
      comment='Amazing'
      createdAt='2d'
      likes={31}
      username='benjamin'
      userAvatar='https://bit.ly/prosper-baba'
      />
    </>
  )
}

export default PostPage
