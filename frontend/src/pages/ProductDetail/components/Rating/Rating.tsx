import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { FC, useMemo, useState } from 'react'

interface Props {
  count?: number
  rating?: number
  onRating?: any
  disabled?: boolean
  isEdit?: boolean
}

const Rating: FC<Props> = ({ count = 5, rating = 0, onRating, disabled = false, isEdit = false }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const getColor = (index: number) => {
    // filled #f5eb3b
    // unfilled #DCDCDC
    if (hoverRating >= index) {
      return '#d26e4b'
    } else if (!hoverRating && rating >= index) {
      return '#d26e4b'
    }

    return '#DCDCDC'
  }

  const startRating = useMemo(() => {
    if (isEdit) {
      return Array(count)
        .fill(0)
        .map((_, i) => i + 1)
        .map((idx) => {
          return (
            <FontAwesomeIcon
              key={idx}
              className={classNames('cursor-pointer', {
                'pointer-events-none opacity-80': Boolean(disabled)
              })}
              style={{ color: getColor(idx) }}
              icon={faStar}
              onClick={() => onRating(idx)}
              onMouseEnter={() => setHoverRating(idx)}
              onMouseLeave={() => setHoverRating(0)}
            />
          )
        })
    } else {
      return Array(count)
        .fill(0)
        .map((_, i) => i + 1)
        .map((idx) => {
          return (
            <FontAwesomeIcon
              key={idx}
              className='pointer-events-none opacity-80'
              style={{ color: getColor(idx) }}
              icon={faStar}
              //   onClick={() => onRating(idx)}
              //   onMouseEnter={() => setHoverRating(idx)}
              //   onMouseLeave={() => setHoverRating(0)}
            />
          )
        })
    }
  }, [count, rating, hoverRating])

  return <div>{startRating}</div>
}

export default Rating
