import { BookCard } from '@/components/book-card'
import { PageTitle } from '@/components/page-title'
import { getLibraryTitle } from '@/lib/common'

export default function HomeLoading() {
  return (
    <>
      <PageTitle
        title={getLibraryTitle().title}
        description={getLibraryTitle().description}
      />
      <div className="flex flex-wrap gap-4">
        <BookCard.Skeleton />
        <BookCard.Skeleton />
        <BookCard.Skeleton />
        <BookCard.Skeleton />
        <BookCard.Skeleton />
      </div>
    </>
  )
}
