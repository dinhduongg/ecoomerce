import { Query as iQuery, ResultWithMeta } from '@/entities/shared/interface'
// import { AuthUser } from '@/security'
import { Payload } from '@/security/payload'
import { Logger } from '@nestjs/common'

export abstract class Controller<E extends object, D> {
  readonly logger = new Logger(Controller.name)

  constructor() {}

  //@Query() query: iQuery,  @AuthUser() payload?: Payload, @Source() source?: string, @Ip()ip?: string
  abstract find(query: iQuery, payload?: Payload, source?: string, ip?: string): Promise<D[] | ResultWithMeta<D[], any>>
  abstract by(entity: E, payload?: Payload, source?: string, ip?: string): Promise<D[]>
  abstract findOne(id: string, payload?: Payload, source?: string, ip?: string): Promise<D>
  abstract create(dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>
  abstract update(id: string, dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>
  abstract patch(id: string, dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>
  abstract delete(id: string, payload?: Payload, source?: string, ip?: string): Promise<number>

  action(id: string, action: string, dto: D, payload?: Payload, source?: string, ip?: string): Promise<D> {
    return void 0
  }
  /*
    @Get()
    async query(query: iQuery, user?: Payload): Promise<D[]>{
        return this.service.find(query,user)
    }

    @Get('by')
    async get(entity: E, user?: Payload): Promise<D[]>{
        return this.service.by(entity)
    }

    @Get(':id')
    async getOne(id: string, user?: Payload): Promise<D>{
        return this.service.findOne(id,user)
    }

    @Post()
    async create(dto: D, user?: Payload): Promise<D>{
        return this.service.create(dto,user)
    }

    @Put(':id')
    async update( id: string, dto: D, user?: Payload): Promise<D>{
        return this.service.update(id, dto,user)
    }

    @Patch(':id')
    async patch( id: string, dto: D, user?: Payload): Promise<D>{
        return this.service.patch(id, dto,user)
    }

    @Delete(':id')
    async delete( id: string, user?: Payload): Promise<number>{
        return this.service.delete(id,user)
    }
    */
}
