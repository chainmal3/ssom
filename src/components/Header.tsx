import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Sound Systems of Melbourne
          </Link>
          <div className="space-x-6">
            <Link 
              href="/" 
              className={`${
                router.pathname === '/' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className={`${
                router.pathname === '/events' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Events
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header