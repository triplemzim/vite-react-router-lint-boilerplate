import './css/login.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from '../lib/cookieParser';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Button } from '../components/ui/button';
import { EMAIL_PROMPT, PASSWORD_PROMPT } from '../assets/language/en/common';
import { LOGIN_URL } from '@/lib/constants';

function Login() {
  const [showpass, setShowpass] = useState(false);
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    const options = {
      url: LOGIN_URL,
      data,
    };
    try {
      const response = await axios.post(options.url, options.data);
      setCookie('authToken', response.data.key);
      navigate('/');
      console.log('response', response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex justify-center items-center fixed min-w-full min-h-full bg-cover bg-slate-800">
      <div>
        <h1 className="text-6xl font-bold text-center mb-20 login-title">
          PCL Plastics
        </h1>
        <Card className="w-[350px] border-zinc-900 border-2 bg-slate-900 login-box">
          <CardHeader>
            <CardTitle className=" text-purple-500 text-center font-bold text-4xl mb-2">
              Login
            </CardTitle>
            <CardDescription className="text-center font-semibold text-gray-200">
              Please login to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold text-white">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={EMAIL_PROMPT} {...field} />
                      </FormControl>
                      <FormDescription className=" text-gray-300">
                        This is your public display email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className=" relative">
                      <FormLabel className="text-lg font-bold text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={PASSWORD_PROMPT}
                          {...field}
                          type={showpass ? 'text' : 'password'}
                        />
                      </FormControl>
                      <button
                        className="p-1 absolute top-9 right-6"
                        onClick={() => setShowpass(!showpass)}
                      >
                        {showpass ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>{' '}
                      <FormMessage />
                      <div className=" flex justify-between items-center">
                        <div className="flex gap-1 text-sm">
                          <input type="checkbox" />
                          <p className="text-gray-300">Remember password </p>
                        </div>
                        <div>
                          <Link
                            to="/"
                            className=" text-sm hover:text-red-600 hover:underline text-gray-300"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className=" w-full bg-purple-500 text-white text-xl"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
