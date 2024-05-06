import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const FormInput = ({ formtype = 'text', placeholder,name,value, onchange,...props }) => {

    const [show, setShow] = useState(false)
    const Icon = show === true ?  FaEyeSlash:FaEye 
    return (
        <div  className='w-[100%]  '>
            {formtype === 'text' && <input type='text' onChange={onchange} name={name} value={value} className='h-10 w-full md:h-12 border-2  rounded-lg pl-3 text-sm outline-none text-black' placeholder={placeholder} />}
            {formtype === 'code' && 
            <input type='text' onChange={onchange} name={name} value={value} className='h-10 w-full flex items-center justify-center md:h-12  rounded-lg text-center text-sm outline-none text-black border' placeholder={placeholder} />}


            {formtype === 'email' && <input type='email' onChange={onchange} name={name} value={value}  className='h-10 md:h-12 w-full  border-2  rounded-lg pl-3 text-md text-md outline-none text-black' placeholder={placeholder} />}


            {formtype === 'number' && <input type='number' className='h-10 md:h-12 w-full border-2 rounded-lg pl-3 text-sm outline-none text-black' onChange={onchange} name={name} value={value}  placeholder={placeholder} />}
            {/* {formtype === 'textarea' && <textarea rows={4} cols={50} placeholder="Tell us about yourself"></textarea>}  */}

                {formtype === 'password' && 
                <div className="flex items-center w-full bg-white rounded-lg  md:h-12 border-2 ">
                <input type={show === true ? 'text': 'password'} onChange={onchange} name={name} value={value}  className={`h-10  w-3/4 rounded-lg pl-3  outline-none text-black ${show === true ? 'text-sm': 'text-sm'}`} placeholder={placeholder} />
               <div {...props} className="w-fit ml-auto mr-5  rounded-lg pl-3">
               <Icon onClick={()=> setShow(prev => !prev)} className='h-6 text-xl  outline-none main cursor-pointer' />
               </div>
            </div>
            }
        </div>
    )
}

export default FormInput