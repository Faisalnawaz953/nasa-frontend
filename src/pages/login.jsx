import { Link } from 'react-router-dom';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Input from '../components/Input';
import Google from '../assets/Google.svg';
import { GET_USER } from '../contants/query-contant';
import { useFormik } from 'formik';
import { errorToaster, successToaster } from '../utils/toasts';
import { loginSchema } from '../utils/yupValidations';
import { useUserLogin } from '../hooks/mutations/login-user';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useGoogleLogin } from '@react-oauth/google';

import axios from 'axios';
import { BASE_URL } from '../contants/constants';
import getUser from '../hooks/queries/get-user';
import { useEffect } from 'react';

export default function Signin() {
  const { data: user, isLoading } = getUser();
  const { mutate: loginMutate } = useUserLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/');
    }
  }, [isLoading, user]);
  const loginWithGoogle = useGoogleLogin({
    ux_mode: 'popup',
    onSuccess: (codeResponse) => {
      handleGoogleLogin(codeResponse);
    },
    flow: 'auth-code',
    onError: (error) => console.log('Login Failed:', error)
  });

  const handleGoogleLogin = async (data) => {
    const res = await axios.post(
      `${BASE_URL}/api/google-login`,
      {
        code: data?.code
      },
      {
        withCredentials: true
      }
    );

    if (res?.status === 200) {
      successToaster('Successfully login !');
      queryClient.refetchQueries([GET_USER]).then(() => {
        navigate('/');
      });
    } else {
      errorToaster('Fail To Login');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      //
      loginMutate(
        { values: values },
        {
          onSuccess: () => {
            successToaster('Successfully login !');
            queryClient.refetchQueries([GET_USER]).then(() => {
              navigate('/');
            });
          },
          onError: () => {
            errorToaster('Invalid Credentials!');
          }
        }
      );
    }
  });
  return (
    <>
      <div className='flex min-h-full  flex-col justify-center bg-gray-300 mx-auto px-6  py-12 sm:px-6 lg:px-8'>
        <div className='mt-12 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className=' py-8  shadow rounded-lg px-6 sm:px-10 bg-white'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 text-center text-2xl font-bold tracking-tight '>
                Sign in
              </h2>
            </div>
            <form className='space-y-6 ' onSubmit={formik.handleSubmit}>
              <div>
                <div className='mt-10'>
                  <Input
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='Enter your email'
                    isInvalid={'email' in formik.errors && formik.touched.email}
                    errorMessage={formik.errors.email}
                  />
                </div>
              </div>

              <div>
                <div className='mt-8'>
                  <Input
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Enter your password'
                    isInvalid={
                      'password' in formik.errors && formik.touched.password
                    }
                    errorMessage={formik.errors.password}
                  />
                </div>
              </div>

              <div>
                <Button title={'Login'} className='w-full' />
              </div>
              <div className='text-sm flex justify-end'>
                <a href='#' className='font-medium  hover:text-gray-500'>
                  Forgot your password?
                </a>
              </div>
            </form>

            <div className='mt-6'>
              <div className='mt-6 '>
                <IconButton
                  onClick={loginWithGoogle}
                  icon={Google}
                  label={'Sign in with Google'}
                />

                {/* <LoginWithGoogle/> */}
              </div>
            </div>
            <div className='mt-4 text-sm flex justify-center'>
              <a href='#' className='font-normal  '>
                Don't have account ?
                <Link to='/register'>
                  {' '}
                  <span className='text-dark-purple hover:text-light-purple'>
                    {' '}
                    Sign up
                  </span>{' '}
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
