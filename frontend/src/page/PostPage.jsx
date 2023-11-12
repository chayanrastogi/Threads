import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import { useEffect, useState } from 'react'
import Comments from '../components/Comments'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import postsAtom from '../atoms/postsAtom'

function PostPage() {

  const port = "https://threads-server-zh1c.onrender.com";

  const { loading, user } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const currentPost = posts[0];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${port}/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    }
    getPost();
  }, []);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to Delete this post?")) return;

      const res = await fetch(`${port}/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post Deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  {
    !user && loading && (
      <Flex w={"full"} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    )
  }

  if (!currentPost) return null;

  return (
    <>
      <Flex>
        <Flex alignItems={"center"} gap={3} w={"full"}>
          <Avatar size='md' name='Mark Zuckerberg' src={user.profilePic} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src='/verified.png' w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} w={36} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <DeleteIcon size={20} onClick={handleDeletePost} />
          )}

        </Flex>
      </Flex>
      <Text my={"3"}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3} cursor={"pointer"}>
        <Actions post={currentPost} />
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

      {currentPost.replies.map(reply => (
        <Comments
          key={reply._id}
          reply={reply}
          lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
        />
      ))}

    </>
  )
}

export default PostPage
