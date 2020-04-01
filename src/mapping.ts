import { NewContract, Refund, Withdraw } from "../generated/Contract/Contract";
import {
  NewContractEntity,
  WithdrawEntity,
  RefundEntity
} from "../generated/schema";

export function handleNewContract(event: NewContract): void {
  let entity = new NewContractEntity(event.params.id.toHex());

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
  let entity = new WithdrawEntity(event.params.id.toHex());

  entity.withdrawId = event.params.id;
  entity.secret = event.params.secret;
  entity.hashLock = event.params.hashLock;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
}

export function handleRefund(event: Refund): void {
  let entity = new RefundEntity(event.params.id.toHex());

  entity.refundId = event.params.id;
  entity.hashLock = event.params.hashLock;
  entity.sender = event.params.sender;
  entity.receiver = event.params.receiver;
}
