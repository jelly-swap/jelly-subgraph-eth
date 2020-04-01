import { NewContract, Refund, Withdraw } from "../generated/Contract/Contract";
import {
  NewContract as NewContractEntity,
  Withdraw as WithdrawEntity,
  Refund as RefundEntity
} from "../generated/schema";

export const fillNewContractEntity = (
  entity: NewContractEntity,
  event: NewContract
): NewContractEntity => {
  entity.inputAmount = event.params.inputAmount;
  entity.outputAmount = event.params.outputAmount;
  entity.expiration = event.params.expiration;
  entity.hashLock = event.params.hashLock;
  entity.contractId = event.params.id;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
  entity.outputNetwork = event.params.outputNetwork;
  entity.outputAddress = event.params.outputAddress;

  return entity;
};

export const fillWithdrawEntity = (
  entity: WithdrawEntity,
  event: Withdraw
): WithdrawEntity => {
  entity.withdrawId = event.params.id;
  entity.secret = event.params.secret;
  entity.hashLock = event.params.hashLock;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;

  return entity;
};

export const fillRefundEntity = (
  entity: RefundEntity,
  event: Refund
): RefundEntity => {
  entity.refundId = event.params.id;
  entity.hashLock = event.params.hashLock;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;

  return entity;
};
