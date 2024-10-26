interface PaginationProps {
  pages: number
  items: number
  page: number
  perPage: number
  total:
    | number
    | {
        count: number
      }
}

export type { PaginationProps }
