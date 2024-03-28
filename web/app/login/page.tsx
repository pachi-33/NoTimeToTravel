'use client';

import {
  signInClicked,
} from '@/app/utils/auth';
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EyeFilledIcon } from './components/EyeFilledIcon';
import { EyeSlashFilledIcon } from './components/EyeSlashFilledIcon';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [selected, setSelected] = useState<string | number>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const router = useRouter();

  useEffect(() => {
  }, []);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = useMemo(() => {
    if (email === '') return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (value: string) =>
    value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

  const isInvalidPassword = useMemo(() => {
    if (password === '') return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const login = useCallback(async () => {
    if (!email || !password) {
      console.log('Email or password is empty.');
      return;
    }
    try {
      setIsLoading(true);
      let response=await signInClicked(email, password);
      setIsLoading(false);
      if(response==='success'){
        router.push('/main')
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  return (
    <div className="flex w-full flex-col">
      <Card className="w-full self-center rounded-lg bg-opacity-50 p-8 sm:max-w-md lg:w-2/5">
        <CardBody className="gap-5 overflow-hidden">
          
            <div key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  isInvalid={isInvalidEmail}
                  errorMessage={isInvalidEmail && 'Please enter a valid email'}
                  onValueChange={setEmail}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type={isVisible ? 'text' : 'password'}
                  onValueChange={setPassword}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    fullWidth
                    color="danger"
                    onClick={login}
                    isLoading={isLoading}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
            
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
