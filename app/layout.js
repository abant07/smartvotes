import Hometwo from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/globals.css'

export const metadata = {
  title: 'KRVotes',
  description: 'Vote smartly',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          <Hometwo />
          {children}
        </main>
      </Provider>
    </body>
  </html>
  )
}
