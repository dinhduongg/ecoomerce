import { useQueryClient } from '@tanstack/react-query'

export const useInvalidateProduct = () => {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'product' })
  }

  return invalidate
}
