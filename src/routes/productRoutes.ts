import express from "express";
import { ProductInteractor } from "../interactor/productInteractor";
import { ProductRepository } from "../repositries/productRepository";
import { ProductController } from "../controllers/ProductController";
import { Mailer } from "../external-libraries/mailer";
import { MessageBroker } from "../external-libraries/messageBroker";
import { Container } from "inversify";
import { INJECTABLE_TYPE } from "../utils";
import { IProductRepository } from "../interface/IProducRepository";
import { IProductInteractor } from "../interface/IProductInteractor";
import { Imailer } from "../interface/Imailer";
import { IMessageBroker } from "../interface/IMessageBroker";

const container = new Container()
container.bind<IProductRepository>(INJECTABLE_TYPE.ProductRepository).to(ProductRepository)
container.bind<IProductInteractor>(INJECTABLE_TYPE.ProductInteractor).to(ProductInteractor)
container.bind<ProductController>(INJECTABLE_TYPE.ProductController).to(ProductController)
container.bind<Imailer>(INJECTABLE_TYPE.Mailer).to(Mailer)
container.bind<IMessageBroker>(INJECTABLE_TYPE.MessageBroker).to(MessageBroker)

const router = express.Router();
const controller = container.get<ProductController>(INJECTABLE_TYPE.ProductController);

router.post("/products", controller.onCreateProduct.bind(controller));

router.get("/products", controller.onGetProducts.bind(controller));

router.patch("/products/:id", controller.onUpdateProductStock.bind(controller));

export default router;
