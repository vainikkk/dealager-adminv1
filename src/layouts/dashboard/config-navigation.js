import { useMemo } from 'react';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

const icon = name => <Iconify icon={name} />;

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        items: [
          {
            title: 'App',
            path: '/',
            icon: icon('zondicons:dashboard'),
          },
          {
            title: 'Product',
            path: '/product',
            icon: icon('zondicons:dashboard'),
          },
          {
            title: 'Product Category',
            path: '/product-category',
            icon: icon('zondicons:dashboard'),
          },
        ],
      },
    ],
    []
  );

  return data;
}
