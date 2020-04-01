import { NewContract, Refund, Withdraw } from "../generated/Contract/Contract";
import {
  NewContractEntity,
  WithdrawEntity,
  RefundEntity
} from "../generated/schema";

import {
  fillNewContractEntity,
  fillWithdrawEntity,
  fillRefundEntity
} from "./helpers";

export function handleNewContract(event: NewContract): void {
  let sender = NewContractEntity.load(event.params.sender.toHex());
  let receiver = NewContractEntity.load(event.params.sender.toHex());

  if (sender == null) {
    sender = new NewContractEntity(event.params.sender.toHex());
  }

  if (receiver == null) {
    receiver = new NewContractEntity(event.params.receiver.toHex());
  }

  sender = fillNewContractEntity(sender as NewContractEntity, event);
  receiver = fillNewContractEntity(receiver as NewContractEntity, event);

  sender.save();
  receiver.save();
}

export function handleWithdraw(event: Withdraw): void {
  let sender = WithdrawEntity.load(event.params.sender.toHex());
  let receiver = WithdrawEntity.load(event.params.sender.toHex());

  if (sender == null) {
    sender = new WithdrawEntity(event.params.sender.toHex());
  }

  if (receiver == null) {
    receiver = new WithdrawEntity(event.params.receiver.toHex());
  }

  sender = fillWithdrawEntity(sender as WithdrawEntity, event);
  receiver = fillWithdrawEntity(receiver as WithdrawEntity, event);

  sender.save();
  receiver.save();
}

export function handleRefund(event: Refund): void {
  let sender = RefundEntity.load(event.params.sender.toHex());
  let receiver = RefundEntity.load(event.params.sender.toHex());

  if (sender == null) {
    sender = new RefundEntity(event.params.sender.toHex());
  }

  if (receiver == null) {
    receiver = new RefundEntity(event.params.receiver.toHex());
  }

  sender = fillRefundEntity(sender as RefundEntity, event);
  receiver = fillRefundEntity(receiver as RefundEntity, event);

  sender.save();
  receiver.save();
}
