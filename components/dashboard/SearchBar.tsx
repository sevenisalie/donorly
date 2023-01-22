import React, {useState, useEffect} from 'react'
import {FaTimes} from "react-icons/fa"
import {RxMagnifyingGlass, RxCaretRight} from "react-icons/rx"
import SearchSettings from "./SearchSettings"
import { AvatarGenerator } from 'random-avatar-generator'
type Props = {}
const generator=new AvatarGenerator()
const SearchBar = (props: Props) => {
  const [searchState, setSearchState] = useState<"loading" | "failed" | "success" | "static">("static")
  const [searchToggle, useSearchToggle] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [searchSettings, setSearchSettings] = useState({
    state: "NE",
    sortByDate: false,
    sortByRelevance: true,
    sortByState: false
  })
  const [avatar, setAvatar] = useState(() => generator.generateRandomAvatar("nolan"))

  useEffect( () => {
    const filter = async (e:any) => {
      if (e.keyCode !== 13) {
        return
      }
    
      return handleSearch(e, searchString)
    }
    document.addEventListener("keypress", e => filter(e))

    return document.removeEventListener("keypress", e => filter(e))
  }, [searchString])

  const fetchSearchResults = async (_searchString:string) => {
    if (_searchString == "") {return}
    const response = await (await fetch(`https://lobbyapi.onrender.com/clients/search?query=${_searchString}`)).json()
    return {...response.data}
  }

  const handleSearchToggle = (e:any) => {
    e.preventDefault()
    useSearchToggle(prev => !prev)
    return true
  }
  const handleSearch = async (e:any, _searchString:string) => {
    await setSearchState("loading")
    e.preventDefault()
    const _searchResults = await fetchSearchResults(_searchString)
    setSearchResults(_searchResults)
    if (searchResults) {
      await setSearchState("success")
      return
    } 
  }
  const searchFilter = (e:any) => {
    e.preventDefault()
    setSearchString(e.target.value)
  }
  return (
    <>
<div className="bg-slate-500 relative mt-8 border-2 border-slate-400 flex mr-auto ml-auto justify-around items-center w-full sm:w-1/2 p-3 rounded-full shadow-sm">

    
    <div className="flex items-center w-full h-full">
    <SearchSettings setSearchSettings={setSearchSettings}/>
    <div className="relative rounded-lg w-full">
    <input placeholder="search" onChange={searchFilter} defaultValue={searchString} type="text" className="bg-slate-400 text-slate-100 p-2 font-body rounded-full w-full pl-4 pr-4 text-gray-800"/>
    <button onClick={e => handleSearch(e, searchString)} className="font-body absolute right-0 top-0 bottom-0 p-2 rounded-r-full bg-blue-500 text-white">
      <RxMagnifyingGlass className='font-extrabold text-blue-200' />
    </button>
    </div>
    </div>
 
</div>


{/* loading */}
{
  searchState==='loading' &&
  <div className="bg-slate-500 relative mt-4 border-2 border-slate-400 flex mr-auto ml-auto justify-around items-center w-full sm:w-1/2 p-3 rounded-full shadow-sm">
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>

  </div>
}
{/* //results */}
{
  searchState === "success" &&
<div className="bg-slate-500 rounded-2xl shadow-sm relative border-2 border-t-0 border-slate-400 flex mr-auto ml-auto justify-around items-center w-full sm:w-1/2">

  <div className='flex-col p-2 w-full h-full'>
    <ul className='flex-col w-full h-full justify-start content-center'>
      <li className='flex justify-start content-center hover:bg-slate-400 hover:rounded-xl'>
        <img src={avatar} className='w-12 h-12 ml-3 rounded-full pr-2'></img>
        <p className='font-body text-slate-200 mx-3 mt-auto mb-auto font-bold'>
          Boys' Town
        </p>
        <p className='font-body text-sm text-slate-300 mx-3 mt-auto mb-auto font-bold'>
          Rodney Dangerfield
        </p>
        <RxCaretRight className='self-center w-2/3 h-2/3 p-0 text-slate-600 cursor-pointer hover:text-slate-300 hover:rounded-full' />
      </li>
      <li className='flex justify-start content-center hover:bg-slate-400 hover:rounded-xl'>
        <img src={avatar} className='w-12 h-12 ml-3 rounded-full pr-2'></img>
        <p className='font-body text-slate-200 mx-3 mt-auto mb-auto font-bold'>
          Boys' Town
        </p>
        <p className='font-body text-sm text-slate-300 mx-3 mt-auto mb-auto font-bold'>
          Rodney Dangerfield
        </p>
        <RxCaretRight className='self-center w-2/3 h-2/3 p-0 text-slate-600 cursor-pointer hover:text-slate-300 hover:rounded-full' />
      </li>
      <li className='flex justify-start content-center hover:bg-slate-400 hover:rounded-xl'>
        <img src={avatar} className='w-12 h-12 ml-3 rounded-full pr-2'></img>
        <p className='font-body text-slate-200 mx-3 mt-auto mb-auto font-bold'>
          Boys' Town
        </p>
        <p className='font-body text-sm text-slate-300 mx-3 mt-auto mb-auto font-bold'>
          Rodney Dangerfield
        </p>
        <RxCaretRight className='self-center w-2/3 h-2/3 p-0 text-slate-600 cursor-pointer hover:text-slate-300 hover:rounded-full' />
      </li>
      <li className='flex justify-start content-center hover:bg-slate-400 hover:rounded-xl'>
        <img src={avatar} className='w-12 h-12 ml-3 rounded-full pr-2'></img>
        <p className='font-body text-slate-200 mx-3 mt-auto mb-auto font-bold'>
          Boys' Town
        </p>
        <p className='font-body text-sm text-slate-300 mx-3 mt-auto mb-auto font-bold'>
          Rodney Dangerfield
        </p>
        <RxCaretRight className='self-center w-2/3 h-2/3 p-0 text-slate-600 cursor-pointer hover:text-slate-300 hover:rounded-full' />
      </li>
    </ul>
  </div>

  <div className='flex-col w-full h-full'>
  <ul className='flex w-full h-full justify-center content-center'>
      <li className='flex justify-start content-start'>
        <img src={avatar} className='w-12 h-12 ml-3 rounded-full pr-2'></img>
        <p className='font-body text-slate-200 mx-3 mt-auto mb-auto font-bold'>
          Boys' Town
        </p>

      </li>
    </ul>
  </div>
</div>
}
    </>
  )
}

export default SearchBar
