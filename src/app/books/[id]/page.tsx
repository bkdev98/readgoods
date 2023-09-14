import { EditBookLink } from "@/components/book-links"
import { EmptyState } from "@/components/empty-state"
import { Marble } from "@/components/marble"
import { BookTemplate } from "lucide-react"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { SetStatusButton } from "@/components/set-status-button"

export default async function BookDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <EmptyState
        icon={BookTemplate}
        title='You are not signed in.'
        description='Sign in to view your book.'
      />
    )
  }

  const data = await prisma.book.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  })

  if (!data) {
    return (
      <EmptyState
        icon={BookTemplate}
        title='Book not found.'
        description='The book you are looking for does not exist.'
      />
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col w-full md:w-1/3 items-center gap-2">
        <div className="overflow-hidden rounded-md w-[250px] mb-2">
          <Marble
            name={data.title}
            width={260}
            height={360}
            colors={['#44749D', '#C6D4E1', '#FFFFFF', '#EBE7E0', '#BDB8AD']}
            className="h-auto w-auto object-cover transition-all hover:scale-110"
          />
        </div>
        <SetStatusButton editingBook={data} />
        <EditBookLink id={data.id} className="w-full max-w-[250px]" variant='ghost' />
      </div>
      <div className="flex-auto">
        <div className="space-y-3 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="hover:underline">{data.author}</p>

          {/* highlight synopsis */}
          <div className="border-l-4 border-primary pl-4">
            <p>{data.synopsis}</p>
          </div>

          <p className="text-muted-foreground text-sm">Published {data.publicationYear}</p>
        </div>
      </div>
    </div>
  )
}
