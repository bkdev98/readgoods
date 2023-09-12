import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Search } from '@/components/search'
import { UserNav } from '@/components/user-nav'
import { Sidebar } from '@/components/sidebar'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Readgoods',
  description: 'Your personal library management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sheet>
            <div className="flex-col md:flex">
              <div className="border-b">
                <div className="flex h-16 items-center px-4">
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="block lg:hidden p-2 mr-2">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <Logo />
                  <div className="ml-auto flex items-center space-x-4 pl-2">
                    <Search />
                    <UserNav />
                  </div>
                </div>
              </div>
              <div className='bg-background'>
                <div className="grid lg:grid-cols-5">
                  <Sidebar className="hidden lg:block" />
                  <SheetContent side='left' className='lg:hidden p-2'>
                    <Sidebar className="lg:hidden" />
                  </SheetContent>
                  <div className="col-span-3 lg:col-span-4 lg:border-l min-h-[calc(100vh-4rem-1px)] p-4 lg:p-6">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Sheet>
        </ThemeProvider>
      </body>
    </html>
  )
}
