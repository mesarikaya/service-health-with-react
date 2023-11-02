import { Category, Help, Home, MonetizationOn, MultilineChart } from '@mui/icons-material';
import { IRoute } from '../component/interfaces/interfaces';
import cost from '../pages/cost';
import dashboard from '../pages/dashboard';
import Helps from '../pages/help';
import Hierarchy from '../pages/hierarchy';
import reports from '../pages/reports';
import site from '../pages/site';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: dashboard,
    icon: Home,
    exact: true,
    permission: [
      "TechHealth_User_Read",
    ],
  },
  {
    path: '/configure',
    name: 'Configure',
    icon: Category,
    exact: true,
    permission: [
      "TechHealth_User_Admin",
    ],
    children: [
      {
        path: '/configure/hierarchies',
        name: 'Hierarchies',
        component: Hierarchy,
        exact: true,
      },
      {
        path: 'configure/site',
        name: 'Site',
        component: site,
        exact: true,
      },
    ]
  },
  {
    path: '/cost',
    name: 'Cost',
    component: cost,
    icon: MonetizationOn,
    exact: true,
    permission: [
      "TechHealth_User_Admin",
    ],
  },
  {
    path: '/helps',
    name: 'Help',
    component: Helps,
    icon: Help,
    exact: true,
  },
  // {
  //   path: '*',
  //   name: 'Help',
  //   component: help,
  //   icon: Help,
  //   exact: true,
  // },
  {
    path: '/reports',
    name: 'Reports',
    component: reports,
    icon: MultilineChart,
    exact: true,
    permission: [
      "TechHealth_User_Read",
    ],
  },
]

export default routes;