import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/home/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'user',
    path: '/home/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'team',
    path: '/home/teams',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'role',
    path: '/home/roles',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'vehicle',
    path: '/home/vehicles',
    icon: getIcon(personAddFill)
  },
  {
    title: 'report',
    path: '/home/reports',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
