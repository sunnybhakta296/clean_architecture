import { injectable } from "inversify";
import { Imailer } from "../interface/Imailer";

@injectable()
export class Mailer implements Imailer {
    async SendEmail(to: string, product: unknown): Promise<any> {
        //sendgrid implementaion or any other email service
        console.log(`Sending email to ${to} about product ${product}`);
        return Promise.resolve(true);
    }
}