const routes = {
  default: '/',
  home: '/home',
  events: '/events',
  scholarships: '/scholarships',
  about: '/about',
  signin: '/signin',
  signup: '/signup',
  forgotPassword: 'pw-forget',
  donate: '/donate'
}

const noRoute = {
  admin: '/admin',
  mymsu: '/mymsu',
  edit: '/edit',
  editMemberInfo: '/editMemberInfo',
  payMembershipDues: '/payMembershipDues',
}
const signedInUserNoRoutes = {
  admin: noRoute.admin,
}

const signedInUserRoutes = {
  ...routes,
  mymsu: noRoute.mymsu
}

const signedInAdminRoutes = {
  ...routes,
  ...noRoute
}

const unknownPath = '/unknownPath';

const routesArr = Object.values(routes)
const noRouteArr = Object.values(noRoute)
const signedInUserNoRoutesArr = Object.values(signedInUserNoRoutes)
const signedInUserRoutesArr = Object.values(signedInUserRoutes)
const home = routes.home.substring(1)

export default routes;
export {
  noRoute,
  routesArr,
  unknownPath,
  noRouteArr,
  home,
  signedInUserRoutes,
  signedInUserRoutesArr,
  signedInUserNoRoutes,
  signedInUserNoRoutesArr,
  signedInAdminRoutes,
};
