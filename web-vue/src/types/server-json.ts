import { CommentResponse } from './comment'

// Retorno de dados do servidor json-server, do arquivo server.json. Ele possui sistema de paginação.
export interface CommentResponseServerJson {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number // Paginas disponíveis
  items: number // Itens por página
  data: CommentResponse
}
