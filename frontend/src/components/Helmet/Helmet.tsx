import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'

interface Props {
  title: string
  children: React.ReactNode
}

const Helmet: FC<Props> = ({ title, children }) => {
  const [st, setSt] = useState<number>(0)

  useEffect(() => {
    document.title = 'Watch - ' + title
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [title])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSt(window.scrollY)
    })

    return () => {
      window.removeEventListener('scroll', () => {
        setSt(0)
      })
    }
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      <div
        className={classNames(
          'fixed bottom-10 right-10 w-10 h-10 border-2 bg-black flex items-center justify-center rounded-md transition-all duration-500 text-white cursor-pointer hover:bg-button-hover hover:opacity-100',
          {
            'opacity-50 z-[9999]': Boolean(st >= 300),
            'opacity-0 -z-10': !Boolean(st >= 300)
          }
        )}
        onClick={handleScrollTop}
      >
        <FontAwesomeIcon icon={faAnglesUp} />
      </div>
      {children}
    </div>
  )
}

export default Helmet
