import { PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as uuidv4 } from 'uuid'

export class Base {
  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt: Date
}

export class SnowflakeBase {
  @PrimaryKey({ type: String, fieldName: '_id', onCreate: () => uuidv4() })
  id: string

  @Property({ onCreate: () => new Date() })
  createdAt: Date

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updatedAt: Date
}
