import React from 'react'

const Formbutton = ({ name, onClick }) => {
    return (
        <div className='w-full' >
            <button onClick={onClick} className='bg-[#430a5d]  font-bold px-5 py-1  text-xl rounded-xl'>{name}</button>
        </div>
    )
}

export default Formbutton