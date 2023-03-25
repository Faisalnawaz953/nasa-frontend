
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import IconButton from '../components/IconButton'
import Input from '../components/Input';
import Google from '../assets/Google.svg';
import axios from 'axios';
import { useFormik } from 'formik';
import { errorToaster, successToaster } from '../utils/toasts';
import { loginSchema } from '../utils/yupValidations';
import { userLogin } from '../api/login';

export default function Signin() {

const loginUser = userLogin();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // loginUser.mutate(
      //   {
      //     values:values
      //   },
      //   {
      //     onSuccess: ()=>{
      //       console.log('Login Successfully', result)
      //       successToaster('Successfully login !')
             
      //          setTimeout(() => window.location='/', 3000);
      //   },
      //   onError :()=>{
      //     errorToaster('Invalid Credentials!')
      //   }
       

      //   }
      // )
      axios.post('http://localhost:5000/api/login', values,
      {
        withCredentials: true,
      })
        
        .then(result => {
            console.log('Login Successfully', result)
          successToaster('Successfully login !')
           
             setTimeout(() => window.location='/', 3000);
        }).catch(e=>{
          console.log(e)
       errorToaster('Invalid Credentials!')
        
        }
        )
    
  
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
                      isInvalid={
                        'email' in formik.errors && formik.touched.email
                      }
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
                  <a
                    href='#'
                    className='font-medium  hover:text-gray-500'
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>

              <div className='mt-6'>
                <div className='mt-6 '>
                  <IconButton icon={Google} label={'Sign in with Google'} />

                 
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