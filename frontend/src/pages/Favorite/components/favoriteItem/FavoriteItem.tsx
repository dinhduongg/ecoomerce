import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import favoriteApi from '~/api/favorite.api'
import Button from '~/components/Button'
import { ProductFavorite } from '~/shared/favorite.interface'
import { vietnameseCurrency } from '~/utils/utils'

interface Props {
  favorite: ProductFavorite
}

const FavoriteItem: FC<Props> = ({ favorite }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: remove } = useMutation({
    mutationFn: (id: string) => {
      return favoriteApi.removeFavorite(id, {})
    }
  })

  const handleRemoveFavorite = (id: string) => {
    remove(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userFavorite'], exact: true })
      }
    })
  }

  return (
    <>
      <div className='text-start space-x-2 flex items-center'>
        <NavLink to={`/san-pham/${favorite.product_id}`} className='block w-16 h-16 lg:w-20 lg:h-20 overflow-hidden'>
          <img className='w-full h-full' src={favorite.product_image} />
        </NavLink>
        <div>
          <NavLink to={`/san-pham/${favorite.product_id}`} className='text-xs lg:text-base hover:text-button-hover'>
            {favorite.product_name}
          </NavLink>
          <p className='block lg:hidden'>
            {/* <span>{favorite.quantity}</span> */}
            {/* <span className='space-x-1'>*</span> */}
            <span>{vietnameseCurrency(favorite.discounted_price)}</span>
          </p>
        </div>
      </div>
      <div>
        <span>{vietnameseCurrency(favorite.discounted_price)}</span>
      </div>
      <div className='flex justify-center'>
        <div
          className='cursor-pointer hover:opacity-60 duration-150 h-fit'
          onClick={() => handleRemoveFavorite(favorite.product_id)}
        >
          <FontAwesomeIcon className='text-lg' icon={faXmarkCircle} />
        </div>
      </div>
    </>
  )
}

export default FavoriteItem
