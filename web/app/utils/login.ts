import axios from 'axios';
import { error, success } from './message';

async function signInClicked(username: string, password: string) {
  try{
    // login
    // success('登录成功')
    // error('登录失败')
  } catch (err: any) {
    console.log('signin: ', err);
    error('Signin Error: '+err);
  }
}

async function logoutClicked() {
  // localStorage.removeItem('userInfo');
  // await Session.signOut();
  // window.location.href = '/';
}

export {
  logoutClicked,
  signInClicked,
};
