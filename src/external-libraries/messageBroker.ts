import { injectable } from "inversify";
import { IMessageBroker } from "../interface/IMessageBroker";

@injectable()
export class MessageBroker implements IMessageBroker {
    NotifyPromotionalProduct(product: unknown): Promise<any> {
        //rabbitmq or any other message broker
        console.log(`Notifying promotional product ${product}`);
        return Promise.resolve(true);
    }
}