import React, { useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'


export default function Header() {
  const {user} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Ro</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-lg flex items-center w-24 sm:w-64'>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...'
            className='bg-transparent focus:outline-none' />
            <button>
              <FaSearch className='text-slate-600' />
            </button>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
            {user ? (
              <img src={user.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover' />
            ) : <li className='text-slate-700 hover:underline'>Sign in</li>
            } 
            </Link>
        </ul>
    </div>
    </header>
  )
}