import { Header } from '@/components/header'
import { PropsWithChildren } from 'react'

export default function StoreLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
      <Header />
      {children}
    </div>
  )
}
