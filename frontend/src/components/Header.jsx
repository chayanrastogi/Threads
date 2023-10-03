import { useRecoilValue } from 'recoil';
import { Flex, useColorMode, Image } from '@chakra-ui/react'
import { Link, Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import userAtom from '../atoms/userAtom';

function Header() {

  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    <>
      {user && (
        <Flex justifyContent={'space-between'} mt={6} mb={12}>

          <Link as={RouterLink} to="/">
            <AiFillHome size={24} />
          </Link>

          <Image
            cursor={'pointer'}
            alt="logo"
            w={6}
            src={colorMode === 'dark' ? '/light-logo.svg' : 'dark-logo.svg'}
            onClick={toggleColorMode}
          />

          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>

        </Flex>
      )}

      {!user && (
        <Flex justifyContent={'center'} mt={6} mb={12}>

          <Image
            cursor={'pointer'}
            alt="logo"
            w={6}
            src={colorMode === 'dark' ? '/light-logo.svg' : 'dark-logo.svg'}
            onClick={toggleColorMode}
          />

        </Flex>
      )}
    </>
  )
}

export default Header;