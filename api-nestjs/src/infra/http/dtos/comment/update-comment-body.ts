import { IsObjectId } from '@src/validators/is-object-id.decorator'
import { IsNotEmpty } from 'class-validator'

export class UpdateCommentBody {
  @IsNotEmpty()
  @IsObjectId({ message: 'Invalid userId, it must be a valid ObjectId' }) // Usando o decorador personalizado
  userId: string

  @IsNotEmpty()
  @IsObjectId({ message: 'Invalid id, it must be a valid ObjectId' })
  id: string

  content: string

  title: string
}
