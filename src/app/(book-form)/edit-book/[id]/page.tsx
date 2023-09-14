import { Metadata } from "next";

import { BookForm } from "@/components/book-form";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = {
  title: 'Readgoods • Edit Book',
  description: 'Your personal library management',
}

export default function EditBook({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageTitle
        title='Edit Book'
        description='Update book information'
      />
      <BookForm bookId={params.id} />
    </div>
  )
}
