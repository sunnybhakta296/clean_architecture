export interface IMessageBroker {
    NotifyPromotionalProduct(product: unknown): Promise<void>;
}