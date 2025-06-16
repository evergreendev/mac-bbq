'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ChevronUpCircle, ChevronDownCircle } from 'lucide-react'
import { Property } from 'csstype'
import Page = Property.Page

type Link = {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: number | Page
  } | null
  url?: string | null
  label: string
}

const SubMenu = ({ subItems }: { subItems: { id: string; link: Link }[] }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center text-lg hover:text-brand-accent-400 transition-colors"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Collapse submenu' : 'Expand submenu'}
      >
        {isOpen ? <ChevronUpCircle className="w-5 h-5" /> : <ChevronDownCircle className="w-5 h-5" />}
      </button>
      {isOpen && (
        <ul className="absolute bg-brand-primary-800 shadow-lg right-0 mt-2 rounded-md overflow-hidden min-w-[200px] z-50">
          {subItems.map((item) => (
            <li key={item.id} className="border-b border-brand-primary-700 last:border-b-0">
              <CMSLink 
                {...item.link} 
                appearance="link" 
                className="text-base w-full block p-3 hover:bg-brand-primary-700 transition-colors" 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const NavItem = ({ link, subItems }: { link: Link; subItems?: {id:string,link:Link}[] }) => {
  return (
    <div className="flex gap-2 items-center">
      <CMSLink 
        {...link} 
        appearance="link" 
        className="text-lg font-semibold uppercase tracking-wide hover:text-brand-accent-400 transition-colors" 
      />
      {subItems && subItems.length > 0 &&
        <SubMenu subItems={subItems} />
      }
    </div>
  )
}

export const HeaderNav: React.FC<{ header: HeaderType; centerNav: boolean }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex gap-8 mx-auto">
      {navItems.map(({ link, subItems }, i) => {
        // @ts-ignore
        return <NavItem key={i} link={link} subItems={subItems} />
      })}
    </nav>
  )
}
