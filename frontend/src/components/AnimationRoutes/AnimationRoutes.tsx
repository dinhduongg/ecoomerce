import { AnimatePresence } from 'framer-motion'
import { FC, Fragment } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { publicRoutes, privateUserRoutes, adminRoute } from '~/routes'
import { DefaultLayout } from '../Layout'
import RequireAuth from '~/components/RequireAuth'
import { AuthorityRole } from '~/shared/enum'
import PersistLogin from '~/components/PersistLogin'

const AnimationRoutes: FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* public route */}
        <Route element={<PersistLogin />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page path={route.path} />
                  </Layout>
                }
              />
            )
          })}
        </Route>

        {/* auth route */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowRoles={[AuthorityRole.ADMIN, AuthorityRole.MANAGER, AuthorityRole.USER]} />}
          >
            {privateUserRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout

              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Route>
        </Route>

        {/* <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowRoles={[AuthorityRole.ADMIN]} />}>
            {adminRoute.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout

              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Route>
        </Route> */}
      </Routes>
    </AnimatePresence>
  )
}

export default AnimationRoutes
