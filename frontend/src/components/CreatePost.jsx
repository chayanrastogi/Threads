import { AddIcon } from '@chakra-ui/icons';
import { CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { BsFillImageFill } from 'react-icons/bs';
import usePreviewImg from '../hooks/usePreviewImg';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

const MAX_CHAR = 500;

const CreatePost = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState("");
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const imageRef = useRef(null);
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const user = useRecoilValue(userAtom);
    const  showToast  = useShowToast();
    const[loading, setLoading] = useState(false);

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);
        } else {
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }
    };

    const handleCreatePost = async () => {
        setLoading(true);
        try {
			const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
			});

			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post created successfully", "success");
			onClose();
            setPostText("");
            setImgUrl("");
		} catch (error) {
			showToast("Error", error, "error");
		}finally{
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                position={'fixed'}
                right={10}
                bottom={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue('gray.300', 'gray.dark')}
                onClick={onOpen}
            >
                Post
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={useColorModeValue('white', '#101010')}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                placeholder='Post content goes here ...'
                                onChange={handleTextChange}
                                value={postText}
                            />
                            <Text
                                size={"xs"}
                                fontWeight={"bold"}
                                textAlign={"right"}
                                color={"gray.600"}
                                m={1}
                            >
                                {remainingChar}/{MAX_CHAR}
                            </Text>

                            <Input hidden type='file' onChange={handleImageChange} ref={imageRef} />

                            <BsFillImageFill
                                style={{ marginLeft: "5px" }}
                                cursor={"pointer"}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />

                        </FormControl>

                        {imgUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>
                                <Image src={imgUrl} alt="preview"/>
                                <CloseButton
                                    onClick={() => setImgUrl("")}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    bg={"gray.800"}
                                />
                            </Flex>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button bg={useColorModeValue('gray.300', 'gray.dark')} mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default CreatePost
