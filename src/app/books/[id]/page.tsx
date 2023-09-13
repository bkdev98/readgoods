import { EmptyState } from "@/components/empty-state"
import { Marble } from "@/components/marble"
import { Button } from "@/components/ui/button"
import { getLibraryTitle } from "@/lib/common"
import { getBook } from "@/lib/services"
import { BookTemplate, Cog, Edit2 } from "lucide-react"

export default async function BookDetail({ params }: { params: { id: string } }) {
  const data = await getBook(params.id)

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
    <div className="flex flex-col md:flex-row">
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
        {data.status ? (
          <Button className="w-full max-w-[250px]">
            <Edit2 className="w-4 h-4 mr-2" />
            {getLibraryTitle(data as any).title}
          </Button>
        ) : (
          <Button className="w-full max-w-[250px]">
            Want to Read
          </Button>
        )}
        <Button className="w-full max-w-[250px]" variant='ghost'>
          <Cog className="w-4 h-4 mr-2" />
          Update Detail
        </Button>
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
