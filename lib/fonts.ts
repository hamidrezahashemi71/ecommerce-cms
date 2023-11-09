import localFont from 'next/font/local'

export const sahel = localFont({
  src: [{
    path: '../public/fonts/Sahel-Bold-FD.ttf',
    weight: '500',
    style:"bold"
  },
    {
      path: '../public/fonts/Sahel-FD.ttf',
      weight: '400',
      style:"normal"
    },
  ],
  variable: '--font-sahel'
})
