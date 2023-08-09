/* eslint-disable react/jsx-props-no-spreading */
import './login.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import loginSchema from '../validators/auth';
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
import { email_prompt, password_prompt } from '../assets/language/en/common';

type LoginInput = z.infer<typeof loginSchema>;

function Login() {
  const [showpass, setShowpass] = useState(false);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // console.log(form.watch());

  function onSubmit(data: LoginInput) {
    alert('Login successfully');
    console.log(data);
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={email_prompt} {...field} />
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
                          placeholder={password_prompt}
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
