import { useNavigate } from 'react-router-dom'

const Successmessage = () => {
    const router = useNavigate();

    const handleOk = () => {
        router("/")
    }

    return (
        <div className='flex flex-col justify-center items-start w-full'>
            <h1 className='w-full'>Account Activated Successfully</h1>
            <button
                className='rounded-md p-3 px-5 transition text-white bg-green-500 items-center mt-8' onClick={handleOk}>OK
            </button>
        </div>
    )
}

export default Successmessage
