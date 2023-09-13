export type SearchParams = { [key: string]: string | string[] | undefined }

export const getLibraryTitle = (searchParams?: SearchParams) => {
  switch (searchParams?.status) {
    case "read":
      return {
        title: "Read",
        description: "Books you have read"
      }
    case "reading":
      return {
        title: "Currently Reading",
        description: "Books you are currently reading"
      }
    case "want":
      return {
        title: "Want to Read",
        description: "Books you want to read"
      }
    default:
      return {
        title: "Library",
        description: "All books in your library"
      }
  }
}
