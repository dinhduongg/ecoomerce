import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Source = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.headers['source']
})
