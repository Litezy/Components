import React, { useState } from 'react'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { GiBoltEye } from "react-icons/gi";
import { LuEye } from "react-icons/lu";
import { errorMessage, successMessage } from './utils/UtilNames';
import { Apis, PostApi } from '../services/Apis';
import { CookieName } from './utils/UtilNames';
import Cookies from 'js-cookie'
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ setSets, setScreen, setSetsName }) => {

    const [seen, setSeen] = useState(false)
    const [seen1, setSeen1] = useState(false)
    const [seen2, setSeen2] = useState(false)
    const [loading, setLoading] = useState(false)
    const Icon = seen ? GiBoltEye : LuEye
    const Icon1 = seen1 ? GiBoltEye : LuEye
    const Icon2 = seen2 ? GiBoltEye : LuEye
    const navigate = useNavigate()

    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    })

    const handleChange =(e)=>{
        setPassword({
            ...password,
            [e.target.name]:e.target.value
        })
    }
    const ChangePassword = async (e) => {
        e.preventDefault()
        if (!password.old_password || !password.new_password || !password.confirm_password) return errorMessage('incomplete request to change password')
        if (password.new_password.length <= 4) return errorMessage("Password's character must be upto 5")
        if (password.new_password !== password.confirm_password) return errorMessage('Passwords do not match')

        const formdata = {
            old_password:password.old_password,
            new_password:password.new_password,
            confirm_password:password.confirm_password
        }
        setLoading(true);
        try {
            const response = await PostApi(Apis.auth.password_change,formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                Cookies.remove(CookieName)
                navigate('/login')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='mt-10 h-fit w-11/12 mx-auto'>
            <div onClick={() => { setScreen(1), setSets(false), setSetsName('') }} className="w-fit mr-auto cursor-pointer pt-10">
                <FaArrowLeft className='text-xl' />
            </div>
            <div className="md:w-3/4 mt-5 mx-auto h-96 bg-white rounded-xl shadow-lg">
                {loading && <Loading />}
                <div className="text-center pt-10 md:text-2xl main font-bold">Change Account Password</div>
                <form onSubmit={ChangePassword} className='md:w-3/4 h-3/4 mx-auto mt-5 px-3 md:px-0'>
                    <div className="flex flex-col w-full  ">
                        <h1>Old Password:</h1>
                        <div className="md:w-[60%] border flex items-center h-10 rounded-lg pl-1 px-2 md:px-0">
                            <input name='old_password' value={password.old_password} onChange={handleChange} type={seen === false ? 'password' : 'text'} placeholder='******' className='rounded-lg w-[90%] pl-2 flex items-stretch outline-none  h-9 ' />
                            <Icon onClick={() => setSeen(prev => !prev)} className='text-2xl cursor-pointer' />
                        </div>
                    </div>
                    <div className="flex flex-col w-full  mt-5">
                        <h1>New Password:</h1>
                        <div className="md:w-[60%] rounded-lg border flex items-center h-10  pl-1 px-2 md:px-0">
                            <input name='new_password' value={password.new_password} onChange={handleChange} type={seen1 === false ? 'password' : 'text'} placeholder='******' className='w-[90%] pl-2 flex items-stretch rounded-lg outline-none  h-9 ' />
                            <Icon1 onClick={() => setSeen1(prev => !prev)} className='text-2xl cursor-pointer' />
                        </div>
                    </div>
                    <div className="flex flex-col w-full  mt-5">
                        <h1>Confirm New Password:</h1>
                        <div className="md:w-[60%] border flex items-center h-10 rounded-lg pl-1 px-2 md:px-0">
                            <input name='confirm_password' value={password.confirm_password} onChange={handleChange} type={seen2 === false ? 'password' : 'text'} placeholder='******' className='w-[90%] pl-2 flex items-stretch outline-none rounded-lg  h-9 ' />
                            <Icon2 onClick={() => setSeen2(prev => !prev)} className='text-2xl cursor-pointer' />
                        </div>
                    </div>

                    <div className="w-fit ml-auto mt-5">
                        <button className='px-5 py-1 mainbg text-white rounded-full'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword