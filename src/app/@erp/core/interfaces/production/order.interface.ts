import { IClient } from '@erp-core/interfaces/sales/client.interface';
import { IProduct } from '@erp-core/interfaces/sales/product.interface';

interface IItems {
    quantity: number,
    product: IProduct
}

export interface IOrder {
    _id?: string;
    invoiceID: string;
    customer: IClient;
    items: Array<IItems>;
    dateDelivery: Date;
    invoice?: string;
    state: "RECEIVED" | "PRODUCING" | "PRODUCED" | "SENT" | "DELIVERED";
    status: boolean;
}