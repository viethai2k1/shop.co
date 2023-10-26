import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div className='overflow-x-hidden'>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
    </div>
  )
}
