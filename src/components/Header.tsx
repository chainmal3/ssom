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
            <img src="/images/SSOM Logos_-02.png" />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
