import { IClient } from '@erp/core/interfaces/sales/client.interface';

export interface IProduct {
    _id?: string;
    facturapiID?: string;
    description: string;
    customerPart: string;
    productKey?: "31141501" | "84111506"
    price?: number,
    taxIncluded?: boolean;
    taxability?: "01" | "02" | "03";
    unitKey?: "H87" | "EA";
    unitName?: "Pieza" | "Elemento";
    sku: string;
    assigned: boolean;
    client: IClient;
    img: string;
    status: boolean;
}