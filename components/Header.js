import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header >
        <div className='header-logo'></div>
        <ul className='header-content'>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/Agent">Agents</Link>
            </li>
            <li>
                <Link href="/weapon">Weapons</Link>

            </li>
            <li>
                <Link href="/Map">Maps</Link>

            </li>
        </ul>
        <div className='header-panel'></div>

    </header>
  )
}

export default Header
