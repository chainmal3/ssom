import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="swiss-container">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="logo-placeholder mr-8">LOGO</div>
          </div>
          <div className="space-x-8 uppercase tracking-wider text-sm">
            <Link
              href="/"
              className={`${
                router.pathname === '/'
                  ? 'text-white font-medium border-b-2 border-white pb-1'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`${
                router.pathname === '/events'
                  ? 'text-white font-medium border-b-2 border-white pb-1'
                  : 'text-gray-400 hover:text-white'
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
