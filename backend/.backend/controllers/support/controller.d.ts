import { Query as iQuery, ResultWithMeta } from '@/entities/shared/interface';
import { Payload } from '@/security/payload';
import { Logger } from '@nestjs/common';
export declare abstract class Controller<E extends object, D> {
    readonly logger: Logger;
    constructor();
    abstract find(query: iQuery, payload?: Payload, source?: string, ip?: string): Promise<D[] | ResultWithMeta<D[], any>>;
    abstract by(entity: E, payload?: Payload, source?: string, ip?: string): Promise<D[]>;
    abstract findOne(id: string, payload?: Payload, source?: string, ip?: string): Promise<D>;
    abstract create(dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>;
    abstract update(id: string, dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>;
    abstract patch(id: string, dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>;
    abstract delete(id: string, payload?: Payload, source?: string, ip?: string): Promise<number>;
    action(id: string, action: string, dto: D, payload?: Payload, source?: string, ip?: string): Promise<D>;
}
