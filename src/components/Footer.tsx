import React from 'react'
import styles from '../styles/Calendar.module.css'

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent pt-20 pb-12">
      <div className={styles.calendarContainer}>
        <div className="grid grid-cols-12 gap-8">
          {/* Left column - Acknowledgement first part */}
          <div className="col-span-12 md:col-span-4 ack-container-1">
            <p className="text-xs text-gray-400 leading-relaxed tracking-wide">
              We acknowledge the Wurundjeri Woi Wurrung and Bunurong peoples of
              the Eastern Kulin Nation as the Traditional Owners of the land on
              which we gather in Melbourne. We pay our respects to Elders past,
              present and emerging.
            </p>
          </div>

          {/* Middle column - Acknowledgement second part */}
          <div className="col-span-12 md:col-span-5 ack-container-2 md:mt-0 -mt-4">
            <p className="text-xs text-gray-400 leading-relaxed tracking-wide">
              As we come together through rhythm, bass, and collective movement,
              we honor the rich history of gathering and storytelling that has
              taken place on these lands for over 60,000 years. We acknowledge
              that long before amplified speakers resonated across these spaces,
              the vibrations of song, dance, and ceremony connected people to
              Country and to each other on this sacred ground.
            </p>
          </div>

          {/* Right column - Copyright */}
          <div className="col-span-12 md:col-span-3 flex flex-col items-end">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              © {new Date().getFullYear()} Sound Systems of Melbourne
            </p>
            <a
              href="https://www.instagram.com/meaty/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-gray-400 mt-10 border-b border-gray-400 hover:text-white hover:border-white transition-colors"
            >
              PHOTO: @MEATY
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
