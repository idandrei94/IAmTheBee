import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='container flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
