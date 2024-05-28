import { Request, Response, NextFunction } from "express";

import { IProductInteractor } from "../interface/IProductInteractor";
import { inject, injectable } from "inversify";
import { INJECTABLE_TYPE } from "../utils";

@injectable()
export class ProductController {
  private interactor: IProductInteractor;

  constructor(@inject(INJECTABLE_TYPE.ProductInteractor) interactor: IProductInteractor) {
    this.interactor = interactor;
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body;
      const product = await this.interactor.createProduct(input);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  async onGetProducts(req: Request, res: Response, next: NextFunction) {
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    try {
      const products = await this.interactor.getProducts(limit, offset);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  async onUpdateProductStock(req: Request, res: Response, next: NextFunction) {
    const productId = parseInt(req.params.id);
    const stock = parseInt(req.body.stock);
    try {
      const product = await this.interactor.updateStock(productId, stock);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}
