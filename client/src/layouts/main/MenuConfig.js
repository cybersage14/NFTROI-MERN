/* eslint-disable */
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/home'
  },
  {
    title: 'Portfolio',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/portfolio',
    children: [
      {
        title: 'Portfolio',
        path: '/portfolio'
       }
      // {
      //   title: 'Merged Portfolio',
      //   path: '/portfolio/merge'
      // },
      // {
      //   title: 'Compare wallets',
      //   path: '/portfolio/compare'
      // }
    ]
  },
  {
    title: 'Collections',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/collections'
  },
  {
    title: 'More',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    children: [
      {
        title: 'Converter',
        path: '/converter'
       }
      // {
      //   title: 'Merged Portfolio',
      //   path: '/portfolio/merge'
      // },
      // {
      //   title: 'Compare wallets',
      //   path: '/portfolio/compare'
      // }
    ]
  },
];

export default menuConfig;
