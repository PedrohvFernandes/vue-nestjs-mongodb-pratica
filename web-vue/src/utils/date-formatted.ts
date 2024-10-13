import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'

dayjs.locale(ptBR)

export const formattedDate = (date: string) => {
  // Colchete é para que o que colocarmos dentro dele, seja exibido como está e não formatado pelo dayjs
  return dayjs(date).format('D[ de ]MMMM')
}
