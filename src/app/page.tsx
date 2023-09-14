import { AddBookLink } from '@/components/book-links'
import { AuthButton } from '@/components/auth-button'
import { BookCard } from '@/components/book-card'
import { EmptyState } from '@/components/empty-state'
import { PageTitle } from '@/components/page-title'
import { authOptions } from '@/lib/auth'
import { SearchParams, getLibraryTitle } from '@/lib/common'
import { getBooks } from '@/lib/services'
import { BookTemplate } from 'lucide-react'
import { getServerSession } from 'next-auth'

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await getServerSession(authOptions)

  const books = session ? (await getBooks(searchParams?.status)) : []

  return (
    <>
      <PageTitle
        title={getLibraryTitle(searchParams).title}
        description={getLibraryTitle(searchParams).description}
        action={
          session && <AddBookLink />
        }
      />
      {books?.length ? (
        <div className="flex flex-wrap gap-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              data={book}
              width={170}
              height={240}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={"No books yet"}
          description={
            !session ? "Sign in to add a book to your library" : "You haven't added any books to this shelf yet."
          }
          icon={BookTemplate}
          action={!session && <AuthButton />}
        />
      )}
    </>
  )
}
