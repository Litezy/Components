import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from 'react-icons/fa';
import kycpassed from '../assets/kycpassed.png'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Apis, GetApi, PostApi } from '../services/Apis';
import pendingkyc from '../assets/gif/pendingkyc.gif'
import { errorMessage, successMessage } from './utils/UtilNames';
import Loader from './utils/Loader';
import Loading from './Loading';

const Kyc = ({ setScreen, setSetsName, setSets }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const fetchUser = useCallback(async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.auth.profile)
            if (response.status === 200) {
                setData(response.data)
            } else {
                errorMessage(error.message)
            }

        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchUser()
    }, [])


    const frontRef = useRef()
    const backRef = useRef()
    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        marital: '',
        address: '',
        city: '',
        country: '',
        dob: '',
        id_type: '',
        zip: '',
        id_number: ''
    })
    const [frontimg, setfrontImg] = useState({
        img: null,
        image: null
    })
    const [backimg, setbackImg] = useState({
        img: null,
        image: null
    })

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const checkdob = () => {
        console.log(
            forms.dob
        )
    }

    const handleImageFront = (e) => {
        const file = e.target.files[0]
        setfrontImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }
    const handleImageBack = (e) => {
        const file = e.target.files[0]
        setbackImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const changeImageback = (e) => {
        setbackImg({
            img: e.target.src,
            image: null
        })
    }
    const changeImagefront = (e) => {
        setfrontImg({
            img: e.target.src,
            image: null
        })
    }

    const submitForm = async (e) => {
        e.preventDefault()
        console.log(forms, frontimg.image, backimg.image)
        if (!forms.firstname) return errorMessage("Firstname field can't be empty")
        if (!forms.lastname) return errorMessage("Lastname field is required")
        if (!forms.gender) return errorMessage("Gender field can't be empty")
        if (!forms.marital) return errorMessage("Marital status is required")
        if (!forms.dob) return errorMessage("Date of birth is required")
        if (!forms.address) return errorMessage("Adress is required")
        if (!forms.city) return errorMessage("Adress status is required")
        if (!forms.zip) return errorMessage("Zip code is required")
        if (!forms.country) return errorMessage("Country  is required")
        if (!forms.id_type) return errorMessage("ID card type is required")
        if (!forms.id_number) return errorMessage("ID card number is required")


        if (frontimg.image === null) return errorMessage('ID front image is required')
        if (backimg.image === null) return errorMessage('ID back image is required')

        const formdata = new FormData()
        formdata.append('frontimg', frontimg.image)
        formdata.append('backimg', backimg.image)
        formdata.append('firstname', forms.firstname)
        formdata.append('lastname', forms.lastname)
        formdata.append('dob', forms.dob)
        formdata.append('marital', forms.marital)
        formdata.append('gender', forms.gender)
        formdata.append('zip', forms.zip)
        formdata.append('address', forms.address)
        formdata.append('city', forms.city)
        formdata.append('country', forms.country)
        formdata.append('id_number', forms.id_number)
        formdata.append('id_type', forms.id_type)

        setLoading(true)
        try {
            const response = await PostApi(Apis.kyc, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setScreen(1)
                setSets(false)
                setSetsName('')
                await fetchUser()
            } else {
                errorMessage(`${response.msg}`)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }


    const [width, setWidth] = useState('10%');

    useEffect(() => {
        if (data.kyc_status === 'verified') {
            setWidth('100%');
        }
        if (data.kyc_status === 'submitted') {
            setWidth('50%');
        }
        if(data.kyc_status === 'unverified'){
            setWidth('10%');
        }
    }, [data.kyc_status]);
    return (
        <div className=' h-fit mt-5 px-4 py-5 '>
            <div onClick={() => { setScreen(1), setSets(false), setSetsName('') }} className="w-fit mr-auto cursor-pointer pt-10">
                <FaArrowLeft className='text-xl' />
            </div>
            <div className="w-11/12 mx-auto ">
                <h1 className='mb-2 capitalize text-2xl font-bold'>{data.kyc_status === 'unverified'?'Upload KYC Information' :data.kyc_status === 'submitted' ?'Track Your KYC review progress':'KYC Approved'}</h1>
                <div className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 
                ${data.kyc_status !== 'verified' ?' animate-pulse':''}`}>
                    <div className={`${data.kyc_status === 'verified' ? 'bg-green-500' : "mainbg"}  h-2.5 rounded-full`} style={{ width }}></div>
                </div>
                <div className="flex w-full items-center justify-between mt-2 text-sm">
                    <p className={`${data.kyc_status === 'unverified' ? 'main font-bold' : "text-[#e5e7eb]"}`}>Not Submitted</p>
                    <p className={`${data.kyc_status === 'submitted' ? 'main font-bold' : "text-[#e5e7eb]"}`}>Submitted</p>
                    <p className={`${data.kyc_status === 'verified' ? 'text-green-500 font-bold' : "text-[#e5e7eb]"}`}>Approved</p>
                </div>
            </div>
            {data?.kyc_status === 'unverified' &&
                <>
                    <div className=" ">
                        {loading && <Loading />}
                        <div className="mt-5 h-fit  border rounded-md text-sm bg-[white] py-5 px-4">
                            <form onSubmit={submitForm} className="md:flex md:items-baseline gap-5 w-full ">
                                <div className="md:w-1/2">
                                    <div className="flex flex-col w-full  ">
                                        <h1>First Name:</h1>
                                        <input name='firstname' value={forms.firstname} onChange={handleChange} type="text" className='w-full outline-none border-b h-8' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Last Name:</h1>
                                        <input name='lastname' value={forms.lastname} onChange={handleChange} type="text" className='w-full outline-none border-b h-8' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3 ">
                                        <h1 className='mb-2'>Gender:</h1>
                                        <select name="gender" onChange={handleChange} value={forms.gender} id="" className='border-b w-1/2 outline-none' >
                                            <option >--select--</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full mt-5 ">
                                        <h1 className='mb-2'>Marital Status:</h1>
                                        <select name="marital" onChange={handleChange} value={forms.marital} id="" className='border-b w-1/2 outline-none'>
                                            <option >--select--</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full mt-5  ">
                                        <h1 onClick={checkdob}>Date of Birth</h1>
                                        <div class="relative max-w-sm w-1/2">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>
                                            <input name='dob' value={forms.dob} onChange={handleChange} datepicker datepicker-buttons datepicker-autoselect-today type="date" class="bg-white mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Address:</h1>
                                        <input name='address' value={forms.address} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>City:</h1>
                                        <input name='city' value={forms.city} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Zip Code:</h1>
                                        <input name='zip' value={forms.zip} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Country:</h1>
                                        <input name='country' value={forms.country} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                </div>
                                <div className="md:w-1/2  h-full">
                                    <div className="flex flex-col w-full  ">
                                        <h1 className="">Government Issued ID:</h1>
                                        <select name="id_type" onChange={handleChange} value={forms.id_type} className='border-b w-full outline-none mt-3'>
                                            <option >--select--</option>
                                            <option value="driver's license/state ID">Driver's License/State ID</option>
                                            <option value="Passport">Passport/Passport ID</option>
                                            <option value="social security card">Social Security Card</option>
                                            <option value="national id">National ID</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>ID Number:</h1>
                                        <input name='id_number' value={forms.id_number} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="mt-5 ">
                                        <h1 className='text-center text-lg font-bold'>Upload Front ID Image</h1>

                                        <div className="md:h-60 h-48  w-11/12 mx-auto relative">
                                            <label className={`${frontimg.img ? '' : 'border-2 border-black'} mt-5 w-full  h-full border-dashed flex cursor-pointer items-center justify-center `}>
                                                {frontimg.img ? <div className="">
                                                    <div onChange={changeImagefront} className="absolute top-0 right-3 main font-bold ">
                                                        <FaEdit className='text-2xl' />
                                                    </div>
                                                    <img src={frontimg.img} className='w-full h-48' />
                                                </div> : <FaPlus className='text-2xl' />}
                                                <input type="file" onChange={handleImageFront} hidden ref={frontRef} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <h1 className='text-center text-lg font-bold'>Upload Back ID Image</h1>

                                        <div className="md:h-60 h-48 w-11/12 mx-auto relative ">
                                            <label className={`${backimg.img ? '' : 'border-2 border-black border-dashed'} mt-5 w-full h-full  flex cursor-pointer items-center justify-center `}>
                                                {backimg.img ? <div className="">
                                                    <div onChange={changeImageback} className="absolute top-0 right-3 main font-bold ">
                                                        <FaEdit className='text-2xl' />
                                                    </div>
                                                    <img src={backimg.img} className='w-full h-48' />
                                                </div> : <FaPlus className='text-2xl' />}
                                                <input type="file" onChange={handleImageBack} hidden ref={backRef} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-5 w-fit ml-auto"><button className='px-5 py-2 mainbg text-white rounded-full'>Submit details</button></div>
                                </div>
                            </form>

                        </div>
                    </div>
                </>}
            {data.kyc_status === 'verified' &&
                <>
                    <div className="h-screen">
                        <div className="flex mt-5 md:mt-0 items-center justify-center h-3/4 shadow-lg bg-white w-11/12 mx-auto rounded-md">
                            <div className="px-4 flex flex-col">
                                <h1 className='text-center md:text-xl'>Congratulations, You have passed your KYC.</h1>
                                <img src={kycpassed} className='w-96 mx-auto' alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }
            {data.kyc_status === 'submitted' &&
                <>
                    <div className="h-screen mt-8">
                        <div className="flex mt-5 md:mt-0 items-center justify-center h-3/4 shadow-lg bg-white w-11/12 mx-auto rounded-md">
                            <div className="px-4 flex flex-col">
                                <h1 className='md:text-center md:text-xl'>Kindly wait for your KYC submission to be approved.</h1>
                                <p className='md:text-center text-sm'>This usually takes about 3-5 working days.</p>
                                <img src={pendingkyc} className='w-96 mx-auto' alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default Kyc