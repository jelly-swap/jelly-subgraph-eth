import { BigInt } from "@graphprotocol/graph-ts";
import {
  Contract,
  NewContract,
  Refund,
  Withdraw
} from "../generated/Contract/Contract";
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

export function handleRefund(event: Refund): void {
  // let refund = Refundd.load();
}

export function handleWithdraw(event: Withdraw): void {}
