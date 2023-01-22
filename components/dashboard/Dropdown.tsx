import { RefObject } from 'react'
import { useState, useRef, useEffect } from 'react'
import { BiCaretDownCircle } from "react-icons/bi"

const useClickOutside = (ref:RefObject<HTMLElement>, handler:(e:any)=>void) => {
    useEffect(() => {
        const listener = (e:any) => {
        // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler(e);
        }
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler])
}
export default function Dropdown() {
    const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
    useClickOutside(ref, closeHandler)

  function setSelectedOptionHandler(e:any, option:string) {
    setSelectedOption(option)
  }
  function isOpenHandler(e:any) {
    e.preventDefault()
    setIsOpen(prev => !prev)
  }
  function closeHandler(e:any) {
    e.preventDefault()
    setIsOpen(false)
  }
  return (
    <div className="flex my-5 h-auto w-full">
      <button
        className={`font-body text-lg flex justify-evenly text-slate-50 bg-blue-400 rounded-full items-center py-2 min-w-max px-4 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none ${selectedOption ? 'text-blue-500' : ''}`}
        onClick={(e) => isOpenHandler(e)}
      >
        {selectedOption || 'Select an option'}
        <BiCaretDownCircle className="ml-2 text-slate-50"/>
      </button>
      <div
      ref={ref}
        className={`absolute z-40 w-full bg-slate-200 rounded-b-lg shadow-lg py-2 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {options.map((option) => (
          <button
            key={option}
            className={`w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 focus:outline-none ${
              option === selectedOption ? 'text-blue-500' : ''
            }`}
            onClick={(e) => {
              setSelectedOptionHandler(e, option)
              isOpenHandler(e)
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
