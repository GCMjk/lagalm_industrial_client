import { IClient } from '@erp-core/interfaces/client.interface';

export interface IProduct {
    _id?: string;
    facturapiId?: string;
    description: string;
    customerPart: string;
    productKey?: string;
    price: {
        currency: "" | "USD" | "MXN";
        price: number;
    },
    taxIncluded?: boolean;
    taxability?: "" | "01" | "02" | "03";
    unitKey?: string;
    unitName?: string;
    sku: string;
    assigned: boolean;
    client: IClient;
    status?: boolean;
}