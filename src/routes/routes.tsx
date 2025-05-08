import Attendence from '../Attendence/Attendence.page';
import Invoice from '../Invoice/Invoice.page';
import Subscription from '../Subscription/Subscription.page';
import Users from '../Users/Users.page';
import Home from '../Home/Home.page';
import Auth from '../Auth/Auth.page';
import SideBarLayout from '../_shared/layout/SideBarLayout';
// Auto-generated routes file

const routes = [
  { name: 'Home', path: '/', element: <SideBarLayout children={<Home />} /> },
  { name: 'Attendence', path: '/attendence', element: <SideBarLayout children={<Attendence />} /> },
  { name: 'Users', path: '/users', element: <SideBarLayout children={<Users />} /> },
  { name: 'Subscription', path: '/subscription', element: <SideBarLayout children={<Subscription />} /> },
  { name: 'Invoice', path: '/invoice', element: <SideBarLayout children={<Invoice />} /> },
  { name: 'Auth', path: '/auth', element: <SideBarLayout children={<Auth />} /> },
];

export default routes;
