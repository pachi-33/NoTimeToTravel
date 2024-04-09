import axios from "axios";
import { error, success } from "./message";

async function signInClicked(username: string, password: string) {
  try {
    console.log(`${process.env.NEXT_PUBLIC_HOST}`);
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.status === 200) {
            success("登陆成功");
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                username: username,
                permission: res.data.permission,
                userId: res.data.reviewerId,
              })
            );
            localStorage.setItem("Authorization", res.data.token);
            return "success";
          } else {
            error("登录失败！");
            if (res.data.status === 401) {
              console.log(res.data?.msg);
            }
          }
        }
      })
      .catch((err: any) => {
        console.log("signin: ", err);
        error("Signin Error: " + err);
      });
    return "failed";
  } catch (err: any) {
    console.log("signin: ", err);
    error("Signin Error: " + err);
  }
}

async function logoutClicked() {
  if (process.env.NEXT_PUBLIC_TEST !== "test") {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("Authorization");
  }
  window.location.href = "/";
}

export { logoutClicked, signInClicked };
