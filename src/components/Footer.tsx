import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="swiss-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">
              &copy; {new Date().getFullYear()} Sound Systems of Melbourne
            </p>
          </div>
          <div className="flex space-x-8 uppercase tracking-wider text-sm justify-start md:justify-end">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Events
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
