import { Metadata } from "next";

import { BookForm } from "@/components/book-form";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = {
  title: 'Readgoods • New Book',
  description: 'Your personal library management',
}

export default function AddBook() {
  return (
    <div>
      <PageTitle
        title='New Book'
        description='Add a new book to your library'
      />
      <BookForm />
    </div>
  )
}
