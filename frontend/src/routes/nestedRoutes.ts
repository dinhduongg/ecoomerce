import Address from '~/pages/Account/components/Address'
import Password from '~/pages/Account/components/Password'
import Profile from '~/pages/Account/components/Profile'

interface route {
  path: string
  component: React.FC | any
  layout?: any
}

const accountChildrenRoutes: route[] = [
  { path: 'thong-tin', component: Profile, layout: null },
  { path: 'dia-chi', component: Address, layout: null },
  { path: 'doi-mat-khau', component: Password, layout: null },
]

export { accountChildrenRoutes }
