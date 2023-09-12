import { AddBookLink } from '@/components/add-book-link'
import { AuthButton } from '@/components/auth-button'
import { EmptyState } from '@/components/empty-state'
import { PageTitle } from '@/components/page-title'
import { authOptions } from '@/lib/auth'
import { SearchParams, getLibraryTitle } from '@/lib/common'
import { BookTemplate } from 'lucide-react'
import { getServerSession } from 'next-auth'

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <PageTitle
        title={getLibraryTitle(searchParams).title}
        description={getLibraryTitle(searchParams).description}
        action={
          session && <AddBookLink />
        }
      />
      <EmptyState
        title={"No books yet"}
        description={
          !session ? "Sign in to add a book to your library" : "You haven't added any books to your library yet."
        }
        icon={BookTemplate}
        action={!session && <AuthButton />}
      />
    </>
  )
}
