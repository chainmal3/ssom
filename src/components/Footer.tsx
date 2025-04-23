import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Sound Systems of Melbourne. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-white">
              Events
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer