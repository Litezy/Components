import React, { useState } from 'react'
import { errorMessage, successMessage } from './utils/UtilNames'
import { Apis, ClientPostApi } from '../services/Apis'
import FormInput from './FormInput'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = ({data}) => {

    const profile = useSelector(state => state.data.profile)
    const [loading,setLoading] = useState(false)
    const [screen, setScreen] = useState(1)


    const navigate = useNavigate()

    const [code,setCode] = useState({
        reset_code:''
    })


    const handleChange = (e) =>{
        setCode({
            ...code,
            [e.target.name]:e.target.value
        })
    }

    const redirectEmailVerify = async ()=>{
        const formdata = {
            email:profile.email
        }
        try {
            const response = await ClientPostApi(Apis.non_auth.find_acc, formdata)
            console.log(response)
            if (response.status === 200) {
              setScreen(2)
            } else {
              return errorMessage(response.msg)
            }
          } catch (error) {
            errorMessage(error.mesage)
          } finally {
            setLoading(false)
          }
    }


    const verifyEmail = async (e) => {
        e.preventDefault()
        const formdata = {
          email: profile.email,
          reset_code: code.reset_code
        }
        setLoading(true)
        try {
          const response = await ClientPostApi(Apis.non_auth.validate_acc, formdata)
          if (response.status === 200) {
            successMessage('email verified successfully')
            setCode({
              ...code,
              reset_code: ''
            })
           navigate('/login')
          } else {
            errorMessage(response.msg)
          }
        } catch (error) {
          errorMessage(error.message)
        } finally {
          setLoading(false)
        }
    
      }

      const ResendOtp = async () => {
        const formdata = {
          email: profile?.email
        }
        setLoading(true)
        try {
          const response = await ClientPostApi(Apis.non_auth.reset_code, formdata)
          if (response.status === 200) {
            successMessage('Otp sent successfully')
          }
        } catch (error) {
          errorMessage(error.message)
        }
      }
    return (
        <div className="h-full flex items-center justify-center w-full ">
           {screen ===1 && 
            <div className="md:w-[40%] rounded-md w-[90%]  flex items-center flex-col
           justify-center h-20 mx-auto  bg-white ">
                <div className="">Verify your email</div>
                <div className="">Click <span onClick={redirectEmailVerify} className='main font-bold underline cursor-pointer'>here </span> to begin your email verification</div>
            </div>}
            {screen === 2 &&
        <div className='w-full mx-auto full'>
          <form className='md:w-[50%] rounded-e-md w-[90%]  flex items-center flex-col
           justify-center h-96 mx-auto  bg-white' onSubmit={verifyEmail}>
            <div className=" main font-bold text-4xl flex items-center justify-center mb-10"><h1> Email Verification</h1></div>
            <div className="flex items-center   gap-10 w-full">
              <div className="md:w-11/12  w-3/4 mx-auto">
                <div className=""><h1>A verification code has been sent to your email <span className='main font-bold'>{profile?.email?.slice(0, 4)}*****{profile?.email.slice(-10)}</span>,  Paste the code below to verify your email.</h1></div>
                <div className="mb-5 w-11/12 mx-auto  flex items-center flex-col ">
                  <h1 className='text-xl font-bold mt-3'>verification code:</h1>
                  <div className="w-fit flex items-center justify-center">
                    <FormInput formtype='code' onchange={handleChange} placeholder={`******`} name={`reset_code`} value={code.reset_code} />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <p>Didn't receive code?</p>
                    <button onClick={ResendOtp} type='button' className='main font-bold underline'>resend</button></div>
                  <div className="w-fit ml-auto">
                    <button className='mainbg md:px-5 py-2 rounded-full text-white font-bold'>Verify Email</button>
                  </div>
                </div>
                <div className="w-fit"><button onClick={() => setScreen(1)} className='main font-bold underline'>change email</button></div>
              </div>
            </div>
          </form>
        </div>}
        </div>
    )
}

export default VerifyEmail