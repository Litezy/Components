import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { errorMessage, successMessage } from './utils/UtilNames'
import { Apis, PostApi } from '../services/Apis'
import Cookies from 'js-cookie'
import { CookieName } from './utils/UtilNames'
import { useNavigate } from 'react-router-dom'

const ChangeEmail = ({ setScreen, setSets, setSetsName }) => {

    const [email, setEmail] = useState({
        new_email: '',
        old_email: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const subtmitEmail = async (e) => {
        e.preventDefault()
        if (!email.old_email || !email.new_email) return errorMessage("Incomplete request to change email")
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        const isValid = isValidEmail(email.new_email);
        if (!isValid) return errorMessage("Invalid email")
        const formdata = {
            old_email: email.old_email,
            new_email: email.new_email
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.auth.email_change,formdata)
            if(response.status === 200){
                setScreen(1)
                setSets(false)
                setSetsName('')
                successMessage(response.msg)
                Cookies.remove(CookieName)
                navigate('/login')
            }else{
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }

    return (
        <div className='mt-10 h-fit w-11/12 mx-auto'>
            <div onClick={() => { setScreen(1), setSets(false), setSetsName('') }} className="w-fit mr-auto cursor-pointer pt-10">
                <FaArrowLeft className='text-xl' />
            </div>
            <div className="md:w-3/4 mt-5 mx-auto h-fit pb-2 bg-white rounded-xl shadow-lg">
                <div className="text-center pt-10 md:text-2xl main font-bold">Change Account Email</div>
                <form onSubmit={subtmitEmail} className='md:w-3/4 h-3/4 mx-auto mt-5 px-3 md:px-0'>
                    <div className="flex flex-col w-full  mt-5">
                        <h1>Old Email:</h1>
                        <input name='old_email' value={email.old_email} onChange={handleChange} type='email' placeholder='enter old email address' className='md:w-3/4 pl-2 flex items-stretch rounded-lg outline-none border  h-12 ' />
                    </div>
                    <div className="flex flex-col w-full  mt-5">
                        <h1>New Email:</h1>
                        <input name='new_email' value={email.new_email} onChange={handleChange} type='email' placeholder='enter new email address' className='md:w-3/4 pl-2 flex items-stretch outline-none rounded-lg border  h-12 ' />

                    </div>
                    <div className="mt-5">
                        <p>Reason For Change:</p>
                        <textarea className="border pl-2 outline-none py-2" rows="4" cols="50" placeholder="Enter text here..."></textarea>
                    </div>
                    <div className="w-fit ml-auto mt-5">
                        <button className='px-5 py-1  mainbg text-white rounded-full'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeEmail