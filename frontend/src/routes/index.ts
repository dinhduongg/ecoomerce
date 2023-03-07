import { DefaultLayout, ProductLayout, SliderLayout } from '~/components/Layout'
import About from '~/pages/About'
import Blog from '~/pages/Blog'
import Cart from '~/pages/Cart'
import CheckOut from '~/pages/CheckOut'
import Contact from '~/pages/Contact'
import Favorite from '~/pages/Favorite'
import Home from '~/pages/Home'
import NoutFound from '~/pages/NotFound'
import ProductDetail from '~/pages/ProductDetail'
import Sale from '~/pages/Sale'
import Shop from '~/pages/Shop'
import SignIn from '~/pages/SignIn'
import SignUp from '~/pages/SignUp'

interface route {
  path: string
  component: React.FC | any
  layout?: any
}

const publicRoutes: route[] = [
  { path: '/', component: Home, layout: SliderLayout },
  { path: '/cua-hang', component: Shop, layout: ProductLayout },
  { path: '/giam-gia', component: Sale, layout: ProductLayout },
  { path: '/blog', component: Blog, layout: DefaultLayout },
  { path: '/gioi-thieu', component: About, layout: DefaultLayout },
  { path: '/lien-he', component: Contact, layout: DefaultLayout },
  { path: '/thanh-toan', component: CheckOut, layout: DefaultLayout },
  { path: '/san-pham/:id', component: ProductDetail, layout: DefaultLayout },
  { path: '/dang-nhap', component: SignIn, layout: null },
  { path: '/dang-ky', component: SignUp, layout: null },
  { path: '/*', component: NoutFound, layout: null }
]

const privateUserRoutes: route[] = [
  { path: '/gio-hang', component: Cart, layout: DefaultLayout },
  { path: '/yeu-thich', component: Favorite, layout: DefaultLayout }
]

const managerRoute: route[] = []

const adminRoute: route[] = []

export { publicRoutes, privateUserRoutes, managerRoute, adminRoute }
