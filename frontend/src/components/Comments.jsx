import { useState } from 'react';
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import Actions from "./Actions";
import { BsThreeDots } from 'react-icons/bs';

const Comments = ({comment,likes,username,userAvatar,createdAt}) => {

    const [liked, setLiked] = useState(false);

    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={userAvatar} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {username}
                        </Text>
                    </Flex>
                    <Text >{comment}</Text>
                    <Flex gap={3}  cursor={"pointer"}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>
                    <Text color={"gray.light"}>{likes + (liked? 1 : 0)} likes</Text>
                </Flex>
                <Flex gap={2} alignItems={"start"}>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>
                            {createdAt}
                        </Text>
                        <BsThreeDots />
                    </Flex>
                </Flex>
            </Flex>
            <Divider/>
        </>
    );
};

export default Comments;