import { Pool } from "pg";
import { Product } from "../entities/Product";
import { IProductRepository } from "../interface/IProducRepository";
import { pgClient } from "../dbConnection";
import { injectable } from "inversify";

@injectable()
export class ProductRepository implements IProductRepository {
  private client: Pool;

  constructor(){
    this.client = pgClient();
  }
  async create({ name, description, price, stock }: Product): Promise<Product> {
    console.log(name, description, price, stock);
    const product = await this.client.query(
      `INSERT INTO products (name,description,price,stock) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, description, price, stock]
    );

    return product.rows[0];
  }
  async update(id: number, stock: number): Promise<Product> {
    const product = await this.client.query(
      `UPDATE products SET stock = $1 WHERE id = $2 RETURNING *`, [stock, id    ]
    );
    return product.rows[0];
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    const products = await this.client.query("SELECT * FROM products LIMIT $1 OFFSET $2", [limit, offset]);
    return products.rows;
  }
}
