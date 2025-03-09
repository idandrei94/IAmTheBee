import type {Metadata} from 'next';
import './globals.css';
import {Inter} from 'next/font/google';
import classNames from 'classnames';
import {APP_DESC, APP_NAME, BASE_URL} from '@/lib/constants';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    template: `%s | IATB`,
    default: APP_NAME
  },
  description: APP_DESC,
  icons: ['/icon.png'],
  metadataBase: new URL(BASE_URL)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full'>
      <body
        className={classNames(inter.className, 'antialiased h-full w-full')}>
        {children}
      </body>
    </html>
  );
}
