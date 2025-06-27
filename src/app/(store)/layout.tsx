import { Header } from '@/components/header'
import { PropsWithChildren } from 'react'

export default function StoreLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="mx-auto flex flex-col min-h-dvh w-full max-w-[1600px] gap-5 p-8">
      <Header />
      {children}
    </div>
  )
}
