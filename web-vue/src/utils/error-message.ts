// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMessage = (error: any): string => {
  const errorMessage =
    error?.response?.data?.message ||
    'Ocorreu um erro ao atualizar o seu comentário'

  // Verifica se o erro é um array de mensagens
  if (Array.isArray(errorMessage)) {
    // Concatena todas as mensagens em uma única string
    return errorMessage.join(', ')
  }

  // Caso seja uma string, retorna diretamente
  return errorMessage
}
