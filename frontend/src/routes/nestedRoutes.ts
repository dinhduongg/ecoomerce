import Address from '~/pages/Account/components/Address'
import Password from '~/pages/Account/components/Password'
import Profile from '~/pages/Account/components/Profile'
import NoutFound from '~/pages/NotFound/NotFound'

const accountChildrenRoutes = [
  { path: 'thong-tin', component: Profile, layout: null },
  { path: 'dia-chi', component: Address, layout: null },
  { path: 'doi-mat-khau', component: Password, layout: null },
  { path: '*', component: NoutFound, layout: null }
]

export { accountChildrenRoutes }
