import React, { useRef, useState } from 'react'
import { FaArrowLeft, FaLessThanEqual } from 'react-icons/fa6'
import { Apis, PostApi, profileImg } from '../services/Apis'
import { FaEdit } from 'react-icons/fa'
import { errorMessage, successMessage } from './utils/UtilNames'

const EditProfile = ({ setScreen, data, setSets, setSetsName }) => {

    const imageRef = useRef()

    const [loading,setLoading] = useState(false)
    const [userimg, setuserImg] = useState({
        img: `${profileImg}/profiles/${data?.image}` || null,
        image: null
    })
    const [forms, setForms] = useState({
        full_name: '',
        phone: '',
        username: '',
        phone: '',
        country: '',
    })


    const changeImage = (e) => {
        setuserImg({
            img: e.target.src,
            image: null
        })
    }
    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file.size >= 1000000) {
            imageRef.current.value = null
            return errorMessage('file too large')
        }
        if (!file.type.startsWith(`image/`)) {
            imageRef.current.value = null
            return errorMessage('Invalid file format detected, try with a different photo')
        }
        setuserImg({
            img: URL.createObjectURL(file),
            image: file
        })
        console.log(file)
    }





    const UploadImage = async () => {
        setLoading(true)
        const formdata = new FormData()
        formdata.append('image', userimg.image)
        formdata.append('email', data.email)
        formdata.append('username', profile.username)
        try {
            const response = await PostApi(Apis.auth.change_image, formdata)
            console.log(response)
            if (response.status === 200) {
                successMessage('profile image uploaded successfuly')
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }



    // const  = (e) => {
    //     e.preventDefault()
    //     console.log(forms, userimg.image)
    // }
    const submit = async (e) => {
        e.preventDefault()
        if (forms.full_name) {
            if (forms.full_name.length <= 3) return errorMessage('Please input a valid full name')
        }
        if (forms.username) {
            if (forms.username.length <= 4) return errorMessage('username must be up to at least 5 characters')
        }
        if (forms.phone) {
            if (forms.phone.length <= 7) return errorMessage('phone number must be up to at least 7')
        }
        if (forms.phone) {
            if (forms.phone.length <= 3) return errorMessage('Please input a valid country')
        }
        const formdata = new FormData()
        formdata.append('full_name', forms.full_name)
        formdata.append('username', forms.username)
        formdata.append('phone', forms.phone)
        formdata.append('country', forms.country)
        formdata.append('image', userimg.image)
        setLoading(true)
        try {
            const response = await PostApi(Apis.auth.update_profile, formdata)
            console.log(response)
            if (response.status === 200) {
                successMessage('Details updated successfully')
                setForms({
                    ...forms,
                    full_name: '',
                    username: '',
                    email: '',
                    phone: '',
                    country: '',
                })
                setScreen(1)
                setSets(prev => !prev)
                setSetsName('')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='mt-10 h-fit py-5 w-11/12 mx-auto'>
            <div onClick={() => { setScreen(1), setSets(false), setSetsName('') }} className="w-fit mr-auto cursor-pointer pt-10">
                <FaArrowLeft className='text-xl' />
            </div>
            <div className=" w-full">
                <div className="text-center text-xl  font-bold">Edit Profile Details</div>
                <div className="mt-5">
                    <div className="md:h-60 w-11/12 mx-auto h-1/2 items-center justify-center relative md:w-1/3">
                        <label>
                            <img src={userimg.img} className='w-60 h-60 mx-auto mb-5 md:mb-0 rounded-full object-cover' alt="" />
                            <input type="file" hidden ref={imageRef} onChange={handleImage} />
                            <div onClick={changeImage} className="absolute top-0 right-0 cursor-pointer">
                                <FaEdit className='text-2xl' />
                            </div>
                        </label>

                    </div>
                </div>
                <div className="mt-5 h-fit  border rounded-md text-sm bg-[white] py-5 px-4  shadow-lg">
                    <form onSubmit={submit} className="">
                        <div className="md:flex md:items-baseline gap-5 w-full md:h-40 justify-center">
                            <div className="md:w-1/2">
                                <div className="flex flex-col w-full  ">
                                    <h1>Full Name:</h1>
                                    <input type="text" name='full_name' value={forms.full_name} onChange={handleChange} className='w-full outline-none border-b h-8' />
                                </div>
                                <div className="flex flex-col w-full mt-3  ">
                                    <h1>Username:</h1>
                                    <input type="text" name='username' value={forms.username} onChange={handleChange} className='w-full outline-none border-b h-8' />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex flex-col w-full mt-3 ">
                                    <h1>Phone Number:</h1>
                                    <input type="text" name='phone' value={forms.phone} onChange={handleChange} className='w-full outline-none border-b h-8' />
                                </div>
                                <div className="flex flex-col w-full mt-3  ">
                                    <h1>Country:</h1>
                                    <input type="text" name='country' value={forms.country} onChange={handleChange} className='w-full outline-none border-b h-8' />
                                </div>
                            </div>

                        </div>
                        <div className="w-fit ml-auto">
                            <button className='px-8  rounded-full mainbg text-white py-2'>Update Details</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile