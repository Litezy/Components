import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";

const FAQs = () => {

    const questions = [
        {
            title: 'What is Blaize Finance?',
            ans: 'Blaize Finance is a cryptocurrency investment platform that offers a variety of investment opportunities in the crypto space, including buying, staking, lending, and other crypto-based financial products.',
            id: 1
        },
        {
            title: 'How Do I Start Investing with Blaize Finance?',
            ans: 'To start investing with Blaize Finance, create an account on the platform, complete the required identity verification (KYC), deposit funds (cryptocurrencies), and choose your preferred investment options/plans.',
            id: 2
        },
        {
            title: 'What Types of Investments Does Blaize Finance Offer?',
            ans: 'Blaize Finance provides several investment options, explore the different plans to learn more.',
            id: 3
        },
        {
            title: 'Is Investing with Blaize Finance Safe?',
            ans: "Blaize Finance implements a range of security measures to protect users' assets, such as encryption, two-factor authentication (2FA), and cold storage for digital assets. However, investing in cryptocurrencies carries inherent risks due to market volatility and potential regulatory changes.",
            id: 4
        },
        {
            title: 'Does Blaize Finance Support Multiple Cryptocurrencies?',
            ans: "Yes, Blaize Finance supports a variety of cryptocurrencies, including Bitcoin, Ethereum, and other popular altcoins. The platform may also offer support for newer or emerging tokens as the crypto market evolves.",
            id: 5
        },
        {
            title: 'What Fees Does Blaize Finance Charge?',
            ans: "Blaize Finance charges fees for various services, such as transaction fees, withdrawal fees, or staking fees. Check the platform's fee schedule to understand the exact costs associated with your investments.",
            id: 6
        },
        {
            title: 'Can I Withdraw My Investments from Blaize Finance at Any Time?',
            ans: "In most cases, you can withdraw your investments from Blaize Finance, but there may be conditions, such as minimum withdrawal amounts, fees, or lock-up periods for specific investments.",
            id: 7
        },
        {
            title: "How Can I Contact Blaize Finance's Customer Support?",
            ans: "Blaize Finance offers customer support through multiple channels, such as email, live chat, or a support ticket system.",
            id: 8
        },
        {
            title: "What Are the Risks of Investing with Blaize Finance?",
            ans: "Investing in cryptocurrencies through Blaize Finance carries risks, including market volatility, security breaches, and regulatory uncertainty. Before investing, ensure you understand these risks and consider your risk tolerance and investment goals. Always conduct due diligence and never invest more than you can afford to lose.",
            id: 9
        }
    ]


    const [ques, setQues] = useState(1 || false)
    const UpdateQuestion = (id) => {
        setQues(id)
        if (ques === id) {
            setQues(false)
        }
    }

    return (
        <div className='w-full'>
            <div className="text-2xl font-bold">Frequently Asked Questions</div>

            <div className="mt-4  w-full h-fit">
                {questions.map((item, i) => (
                    <div className={`w-full mb-5 mainbg rounded-md text-white ${ques === item.id ? 'h-fit pb-2 transition-height ease-in-out duration-300 ' : 'h-14 md:h-12 transition-height ease-in-out duration-300'} relative px-3`} key={i}>
                        <div className={`${ques === false && 'h-full'} flex cursor-pointer items-center justify-between pt-2`} onClick={() => UpdateQuestion(item.id)}>
                            <h1 className='text-[15.3px] md:text-xl font-bold '>{item.title}</h1>
                            <FaPlus
                                className={`plus md:text-xl cursor-pointer ${ques === item.id ? 'rotate transition-height ease-in-out duration-300' : 'transition-height ease-in-out duration-300'}`}
                            />
                        </div>
                        <h1 className={`${ques === item.id ? ' mt-1' : 'mt-5'}`}>{item.ans}</h1>
                    </div>
                ))}
            </div>

            <div className=""></div>
        </div>
    )
}

export default FAQs
//CSS
// .plus {
//     transform: rotate(0deg);
//  }
//  .rotate {
//    transform: rotate(45deg); 
//  }