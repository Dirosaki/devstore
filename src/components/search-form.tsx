'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queryValue = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = Object.fromEntries(formData.entries())

    const query = data.q

    if (!query) return null

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <SearchIcon className="size-5 text-zinc-500" />

      <input
        name="q"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        placeholder="Buscar produtos..."
        defaultValue={queryValue ?? ''}
        required
      />
    </form>
  )
}
