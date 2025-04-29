import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <header className="bg-black">
      <div className="swiss-container">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="logo-placeholder mr-8">LOGO</div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
