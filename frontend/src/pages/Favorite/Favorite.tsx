import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import favoriteApi from '~/api/favorite.api'
import Button from '~/components/Button'
import Helmet from '~/components/Helmet'
import FavoriteItem from './components/favoriteItem'

const Favorite = () => {
  const { data: userFavorite } = useQuery({
    queryKey: ['userFavorite'],
    queryFn: () => favoriteApi.getUserFavorite({})
  })

  return (
    <Helmet title='Yêu thích'>
      <div className='max-w-7xl mx-auto py-2'>
        <div className='col-span-1 lg:col-span-3'>
          <div className='gtable grid grid-cols-2 lg:grid-cols-[45%_45%_10%] px-1 py-1'>
            <h6 className='pl-2 uppercase'>Sản phẩm</h6>
            <h6 className='pl-2 hidden lg:block uppercase'>Giá</h6>
            {/* <h6 className='pl-2 uppercase text-end lg:text-start'>Số lượng</h6> */}
            {/* <h6 className='pl-2 hidden lg:block uppercase'>Tổng</h6> */}
            <h6></h6>
            {userFavorite &&
              userFavorite.products.length !== 0 &&
              userFavorite.products.map((favorite, index) => {
                return <FavoriteItem favorite={favorite} key={index} />
              })}
          </div>
          {!userFavorite ||
            (userFavorite.products.length === 0 && (
              <div className='col-span-full w-full text-center border-x border-b border-[#ccc] text-xl py-4'>
                Danh sách yêu thích của bạn không có gì
              </div>
            ))}
          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-start space-x-0 lg:space-x-4 space-y-2 lg:space-y-0 pt-4'>
            <Button to='/' outline custom='w-auto'>
              <FontAwesomeIcon icon={faArrowLeftLong} />
              <span className='ml-2'>Tiếp tục xem sản phẩm</span>
            </Button>
            <Button to='/gio-hang' outline>
              Đến giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Favorite
