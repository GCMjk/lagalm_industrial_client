export interface IResponse {
    itemsPerPage: number;
    total: number; 
    pages: number; 
    data: Array<any>;
}