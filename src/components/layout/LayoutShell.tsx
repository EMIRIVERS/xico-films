'use client'

import { useState, useCallback } from 'react'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import SmoothScroll from '@/components/animations/SmoothScroll'
import CustomCursor from '@/components/animations/CustomCursor'
import PageTransition from '@/components/animations/PageTransition'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <CustomCursor />
      <Sidebar />
      <MobileHeader isOpen={menuOpen} onToggle={toggleMenu} />
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />

      <SmoothScroll>
        <main className="main-content">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </SmoothScroll>
    </>
  )
}
