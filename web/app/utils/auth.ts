import axios from "axios";
import { error, success } from "./message";

async function signInClicked(username: string, password: string) {
  try {
    // login
    // success('登录成功')
    // error('登录失败')
    return "success";
  } catch (err: any) {
    console.log("signin: ", err);
    error("Signin Error: " + err);
  }
}

async function logoutClicked() {
  // localStorage.removeItem('userInfo');
  // await Session.signOut();
  // window.location.href = '/';
}

async function getUserInfo() {
  let isLogin = true;
  let userId = "None";
  let userName = "None";
  let permission = "admin";

  if (isLogin) {
    userId = ""; //get session
    try {
      const response = await axios.get(`...`, {
        headers: {
          Authorization: "Basic ZGV2OmRlY29kYQ==",
        },
      });

      if (response.data) {
        userName = response.data.userName;
        permission = response.data.permission;
      }
    } catch (err: any) {
      error(err);
    }
  }

  return { isLogin, userId, userName, permission };
}

export { logoutClicked, signInClicked, getUserInfo };
