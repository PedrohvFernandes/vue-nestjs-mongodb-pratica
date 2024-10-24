import * as z from 'zod'

// Validar se o conteúdo é válido
const titleSchema = z.object({
  title: z
    .string()
    .min(5, 'Informe o título do comentário')
    .max(20, 'Título muito longo')
})

export type titleType = z.infer<typeof titleSchema>

export class Title {
  private readonly title: string

  get value(): string {
    return this.title
  }

  private validateTitle(title: string) {
    const validate = titleSchema.safeParse({ title })

    return validate
  }

  constructor(title: string) {
    const isTitleValid = this.validateTitle(title)
    if (isTitleValid.error) {
      throw new Error(isTitleValid.error.message)
    }

    this.title = title
  }
}
