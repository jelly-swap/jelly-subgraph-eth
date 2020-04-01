import { NewContract, Refund, Withdraw } from "../generated/Contract/Contract";
import {
  NewContractEntity,
  WithdrawEntity,
  RefundEntity
} from "../generated/schema";

export function handleNewContract(event: NewContract): void {
  let entity = NewContractEntity.load(event.transaction.from.toHex());

  if (entity == null) {
    entity = new NewContractEntity(event.transaction.from.toHex());
  }

  entity.inputAmount = event.params.inputAmount;
  entity.outputAmount = event.params.outputAmount;
  entity.expiration = event.params.expiration;
  entity.hashLock = event.params.hashLock;
  entity.contractId = event.params.id;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
  entity.outputNetwork = event.params.outputNetwork;
  entity.outputAddress = event.params.outputAddress;

  entity.save();
}

export function handleWithdraw(event: Withdraw): void {
  let entity = WithdrawEntity.load(event.transaction.from.toHex());

  if (entity == null) {
    entity = new WithdrawEntity(event.transaction.from.toHex());
  }

  entity.withdrawId = event.params.id;
  entity.secret = event.params.secret;
  entity.hashLock = event.params.hashLock;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
}

export function handleRefund(event: Refund): void {
  let entity = RefundEntity.load(event.transaction.from.toHex());

  if (entity == null) {
    entity = new RefundEntity(event.transaction.from.toHex());
  }

  entity.refundId = event.params.id;
  entity.hashLock = event.params.hashLock;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
}
