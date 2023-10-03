import { atom } from "recoil";

const authScreenState = atom({
    key: "authScreensState",
    default: "login"
});

export default authScreenState;