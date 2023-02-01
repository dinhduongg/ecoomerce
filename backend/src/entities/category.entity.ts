import { Entity, Property } from "@mikro-orm/core";
import { Category as ICategory } from "./shared/category.interface";
import { SnowflakeBase } from "./support/base.entity";

@Entity()
export class Category extends SnowflakeBase implements ICategory {
    @Property() name: string;
}
