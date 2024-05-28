import { Product } from "../entities/Product";

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  update(id: number, stock: number): Promise<Product>;
  find(limit: number, offset: number): Promise<Product[]>;
}
