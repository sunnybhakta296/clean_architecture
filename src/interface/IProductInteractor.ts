import { Product } from "../entities/Product";

export interface IProductInteractor {
    createProduct(input: Product): Promise<Product>;
    updateStock(productId: number, stock: number): Promise<Product>;
    getProducts(limit: number, offset: number): Promise<Product[]>;    
}