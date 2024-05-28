export interface Imailer {
    SendEmail(to: string, product: unknown): Promise<void>;
}