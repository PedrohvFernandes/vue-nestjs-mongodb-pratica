import * as z from 'zod'

// Validar se o conteúdo é válido
const contentSchema = z.object({
  content: z
    .string()
    .min(1, 'Informe o seu comentário')
    .max(200, 'Comentário muito longo')
})

export type contentType = z.infer<typeof contentSchema>

export class Content {
  private readonly content: string

  get value(): string {
    return this.content
  }

  private validateContent(content: string) {
    const validate = contentSchema.safeParse({ content })

    return validate
  }

  constructor(content: string) {
    const isContentValid = this.validateContent(content)
    if (isContentValid.error) {
      throw new Error(isContentValid.error.message)
    }

    this.content = content
  }
}
