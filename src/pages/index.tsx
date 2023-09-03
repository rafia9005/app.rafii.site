import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ul>
        <li className='text-2xl font-medium mt-3'><a href="/login">Login</a></li>
        <li className='text-2xl font-medium mt-3'><a href="/register">Register</a></li>
      </ul>
    </>
  )
}
