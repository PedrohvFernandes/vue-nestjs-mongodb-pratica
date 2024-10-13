import dayjs from 'dayjs'
import 'dayjs/locale/pt-BR'

dayjs.locale('pt-BR')

export const formattedDate = (date: string) => {
  // Colchete é para que o que colocarmos dentro dele, seja exibido como está e não formatado pelo dayjs
  return dayjs(date).format('DD MMMM YYYY')
}
