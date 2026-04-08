'use client'

import { useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import SmoothScroll from '@/components/animations/SmoothScroll'
import FishingCursor from '@/components/experience/FishingCursor'
import PageTransition from '@/components/animations/PageTransition'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <FishingCursor />

      {!isHome && (
        <>
          <Sidebar />
          <MobileHeader isOpen={menuOpen} onToggle={toggleMenu} />
          <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
        </>
      )}

      <SmoothScroll>
        <main className={isHome ? 'main-content-home' : 'main-content'}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </SmoothScroll>
    </>
  )
}
