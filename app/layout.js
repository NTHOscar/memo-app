import Link from 'next/link';
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html >
      <body>
        <nav>
          <Link href="/">
              Home
          </Link>
          <Link href="/notes">
              Notes
          </Link>
          <Link href="/chatbot">
              Chatbot
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
