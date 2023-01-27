
export interface Menu {
    icon?: string;
    name: string;
    path?: string;
    children?: Menu[];
}

export interface Sort {
    field: string;
    order: 'a' | 'd';
}

export interface Pageable {
    page: number;
    size?: number;
    maxPage?: number;
    sort?: Sort;
}

export interface Query {
    searchType?: string,
    search?: string,
    searchExact?: boolean,
    is?: Record<string, string>,
    filters?: any;
    pageable?: Pageable;
    category?: string;
}

export interface Modal {
    open: boolean
    type: string
    title: string
    data: any
}

export interface ResultWithMeta<T, M> {
    values: T
    pagination?: {
        at: number,
        size: number,
        total: number
        last: boolean
    }
    meta?: M
}


export interface ConverterForDictionary {
    name: string;
    color?: string;
    icon?: string;
    style?: string;
    description?: string;
}