'use client'

import React from 'react'

import type { Header as HeaderType, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

export const MobileNav: React.FC<{ header: HeaderType, logo?: Media, setMobileNavIsOpen?: React.Dispatch<React.SetStateAction<boolean>> }> = ({ header, logo, setMobileNavIsOpen }) => {
  const navItems = header?.navItems || []

  const handleLinkClick = () => {
    if (setMobileNavIsOpen) {
      setMobileNavIsOpen(false);
    }
  };

  return (
    <nav className="flex flex-col h-full">
      <div className="p-8 flex-1">
        {logo && typeof logo !== 'number' && (
          <Link href="/" className="block mb-6" onClick={handleLinkClick}>
            <Image 
              src={logo.url || ''} 
              alt={logo.alt || 'Site Logo'} 
              width={40} 
              height={40} 
              className="h-10 w-auto object-contain" 
            />
          </Link>
        )}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Menu</h2>
          <div className="h-1 w-16 bg-brand-accent-500"></div>
        </div>

        <div className="space-y-6">
          {navItems.map(({ link, subItems }, i) => {
            return (
              <div key={i} className="border-b border-brand-primary-700 pb-4">
                <div onClick={handleLinkClick}>
                  <CMSLink {...link} appearance="link" className="text-2xl font-semibold uppercase text-white hover:text-brand-accent-400 transition-colors" />
                </div>
                {subItems && subItems.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3 ml-4">
                    {subItems.map((item) => {
                      return (
                        <div key={item.id} onClick={handleLinkClick}>
                          <CMSLink appearance="link" className="text-lg text-gray-300 hover:text-white" {...item.link} />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-auto p-8 bg-brand-primary-800">
        <div className="flex justify-center space-x-6 mt-6">
          <a href="#" className="text-white hover:text-brand-accent-400" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-brand-accent-400" onClick={handleLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
