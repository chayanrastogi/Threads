import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from "./page/UserPage"
import PostPage from "./page/PostPage"
import Header from "./components/Header"
import AuthPage from "./page/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import HomePage from "./page/HomePage"
import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./page/UpdateProfilePage"
import CreatePost from "./components/CreatePost"

function App() {

  const user = useRecoilValue(userAtom);

  return (
    <>
      <Container maxW="620px">
        <Header/>
        <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/update' element={user ? <UpdateProfilePage/> : <Navigate to='/auth' />} />
        <Route path="/:username" element={<UserPage/>} />
        <Route path="/:username/post/:pid" element={<PostPage/>} />
        </Routes>
        {user && <LogoutButton/>}
        {user && <CreatePost/>}
      </Container>
    </>
  )
}

export default App
