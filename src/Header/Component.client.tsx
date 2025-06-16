'use client'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileNav } from '@/Header/Nav/MobileNav'
import { Menu,  XCircle} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderClientProps {
  header: Header
  logo: Media
  lightLogo?: Media
  centerNav: boolean
  children?: React.ReactNode
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  header,
  logo,
  centerNav,
  children
}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme] = useState<string | null>(null)
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="bg-gradient-to-r from-brand-primary-700 to-brand-primary-900 text-white">
        <div className="container flex justify-between py-4 items-center">
          <div className="hidden sm:flex items-center space-x-4">
            {children}
          </div>
        </div>
      </div>

      <header
        className={`hidden md:block sticky transition-colors top-0 z-50 ${!centerNav || hasScrolled ? 'bg-brand-primary-600 text-white shadow-lg' : ''}`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container relative z-20 py-3 flex justify-between">
          <HeaderNav header={header} centerNav={centerNav} />
        </div>
      </header>
      <header className={`md:hidden`}>
        <button
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          className="fixed z-50 top-4 right-4 bg-white/80 rounded-full p-1 shadow-lg text-brand-primary-600"
        >
          {mobileNavIsOpen ? (
            <XCircle size="34" className="text-brand-primary-600" />
          ) : (
            <Menu size="34" className="text-brand-primary-600" />
          )}
        </button>
        <div
          className={`fixed transition-all duration-300 ease-in-out inset-0 bg-gradient-to-b from-brand-primary-700 to-brand-primary-900 z-40 ${
            mobileNavIsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <MobileNav header={header} />
        </div>
      </header>
    </>
  )
}
