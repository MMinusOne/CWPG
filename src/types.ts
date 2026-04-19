import { EventEmitter } from "events";

export enum PaymentCurrency {
  Bitcoin = "Bitcoin",
  Etheruem = "Etheruem",
  Litecoin = "Litecoin",
  Monero = "Monero",
  Solana = "Solana",
}

export enum PaymentGatewayEvents {
  PaymentInitiated = "PaymentInitiated",
  PaymentCompleted = "PaymentCompleted",
  PaymentFailed = "PaymentFailed",
  PaymentExpired = "PaymentExpired",
}

export enum PaymentEvents {
  TransactionReceived = "TransactionReceived",
  TransactionConfirmed = "TransactionConfirmed",
  TransactionFailed = "TransactionFailed",
  TransactionEnded = "TransactionEnded",
  TransactionExpired = "TransactionExpired",
}

export interface IPaymentGatewayEvents {
  [PaymentGatewayEvents.PaymentInitiated]: [string];
  [PaymentGatewayEvents.PaymentCompleted]: [string];
  [PaymentGatewayEvents.PaymentFailed]: [string, string];
  [PaymentGatewayEvents.PaymentExpired]: [string];
}

export interface IPaymentEvents {
  [PaymentEvents.TransactionReceived]: [string, string];
  [PaymentEvents.TransactionConfirmed]: [string, number];
  [PaymentEvents.TransactionFailed]: [string, string, string];
  [PaymentEvents.TransactionEnded]: [string, string];
  [PaymentEvents.TransactionExpired]: [string, string];
}

export abstract class IPaymentGateway extends EventEmitter<IPaymentGatewayEvents> {
  abstract createPayment(
    amount: number,
    currency: PaymentCurrency,
  ): Promise<IPayment>;
  abstract getPayment(paymentId: string): Promise<IPayment>;
  abstract listPayments(): Promise<IPayment[]>;
}

export abstract class IPayment extends EventEmitter<IPaymentEvents> {
  abstract getAmount(): Promise<number>;
  abstract getCurrency(): Promise<PaymentCurrency>;
  abstract getStatus(): Promise<string>;
  abstract getConfirmations(): Promise<number>;
  abstract getTransactionId(): Promise<string>;
  abstract getPaymentAddress(): Promise<string>;
  abstract getSenderAddress(): Promise<string>;
}
