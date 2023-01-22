import { GoSettings } from 'react-icons/go'
import { useState } from 'react'
import Dropdown from "./Dropdown"
type Props = {
  setSearchSettings: Function
}
export default function SearchSettings<Props>(props:Props) {
  const [isOpen, setIsOpen] = useState(false)

  function isOpenHandler(e:any) {
    e.preventDefault()
    setIsOpen(prev => !prev)
  }

  return (   
    <>
        <GoSettings onClick={(e) => isOpenHandler(e)} className="text-slate-400 font-extrabold text-2xl mr-3 hover:text-gray-800 cursor-pointer" />
        {isOpen &&
          <div
        className={`bg-blue-200 flex-col items-start justify-start gap-x-4  px-7 pt-7 absolute left-0 top-0 bottom-0 max-w-min z-40 transition-all duration-400 ease-in-out`}
      >
       <div className='font-body text-2xl font-bold text-slate-600 pb-4 self-center'>Settings</div>
       <div className='flex-col content-between w-full gap-x-4 h-5/5'>
        <Dropdown/>
        <Dropdown/>
        <Dropdown/>
       </div>

        <button 
        onClick={isOpenHandler}
        className='font-body text-lg text-slate-50 bg-blue-400 rounded-full mt-10 mb-auto py-2 px-4 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none'>
          Save
        </button>
      </div> 
        }
      
    </>
  )
}
