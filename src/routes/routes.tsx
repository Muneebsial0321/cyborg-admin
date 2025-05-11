import Attendence from '../Attendence/Attendence.page';
import Invoice from '../Invoice/Invoice.page';
import Users from '../Users/Users.page';
import Home from '../Home/Home.page';
import Auth from '../Auth/Auth.page';
import SideBarLayout from '../_shared/layout/SideBarLayout';
import { AttachEmail, HomeFilled, Person, ReceiptSharp } from '@mui/icons-material';
// Auto-generated routes file

const routes = [
  { icon:<HomeFilled/>,name: 'Home', path: '/', element: <SideBarLayout children={<Home />} /> },
  { icon:<Person/>,name: 'Users', path: '/users', element: <SideBarLayout children={<Users />} /> },
  { icon:<AttachEmail/>,name: 'Attendence', path: '/attendence', element: <SideBarLayout children={<Attendence />} /> },
  { icon:<ReceiptSharp/>,name: 'Invoice', path: '/invoice', element: <SideBarLayout children={<Invoice />} /> },
  // { icon:<HomeFilled/>,name: 'Auth', path: '/auth', element: <SideBarLayout children={<Auth />} /> },
];

export default routes;
