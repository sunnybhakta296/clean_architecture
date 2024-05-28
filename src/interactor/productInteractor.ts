import { inject, injectable } from "inversify";
import { Product } from "../entities/Product";
import { IMessageBroker } from "../interface/IMessageBroker";
import { IProductRepository } from "../interface/IProducRepository";
import { IProductInteractor } from "../interface/IProductInteractor";
import { Imailer } from "../interface/Imailer";
import { INJECTABLE_TYPE } from "../utils";

@injectable()
export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  private mailer: Imailer;
  private broker: IMessageBroker;

  constructor(
    @inject(INJECTABLE_TYPE.ProductRepository) repository: IProductRepository,
    @inject(INJECTABLE_TYPE.Mailer) mailer: Imailer,
    @inject(INJECTABLE_TYPE.MessageBroker) broker: IMessageBroker
  ) {
    this.repository = repository;
    this.mailer = mailer;
    this.broker = broker;
  }

  async createProduct(input: Product): Promise<Product> {
    const product = await this.repository.create(input);
    this.broker.NotifyPromotionalProduct(product);
    return product;
  }

  async updateStock(productId: number, stock: number): Promise<Product> {
    const product = this.repository.update(productId, stock);
    await this.mailer.SendEmail("random@email.com", product);
    return product;
  }

  getProducts(limit: number, offset: number): Promise<Product[]> {
    return this.repository.find(limit, offset);
  }
}