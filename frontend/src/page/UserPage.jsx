import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

function UserPage() {

  const port = "https://threads-server-zh1c.onrender.com";

  const {loading, user} = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {

    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`${port}/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);

      }catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      }finally{
        setFetchingPosts(false);
      }
    };

    getPosts();

  }, [username, showToast, setPosts]);

  if (!user && loading) {
    return (
      <Flex w={"full"} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    )
  }

  if (!user && !loading) {
    return (
      <Flex w={"full"} justifyContent={"center"}>
        <h1>User not found</h1>
      </Flex>
    )
  }
  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has posts</h1>}
      {fetchingPosts && (
      <Flex w={"full"} justifyContent={"center"}>
        <Spinner size={"xl"} />
        </Flex>
        )}
        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
};

export default UserPage
