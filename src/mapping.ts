import { NewContract, Refund, Withdraw } from "../generated/Contract/Contract";
import {
  NewContract as NewContractEntity,
  NewContractSender,
  NewContractReceiver,
  Withdraw as WithdrawEntity,
  WithdrawSender,
  WithdrawReceiver,
  Refund as RefundEntity,
  RefundSender,
  RefundReceiver
} from "../generated/schema";

export function handleNewContract(event: NewContract): void {
  let newSwap = new NewContractEntity(event.params.id.toHex());

  let sender = NewContractSender.load(event.params.sender.toHex());
  let receiver = NewContractReceiver.load(event.params.receiver.toHex());

  if (sender == null) {
    sender = new NewContractSender(event.params.sender.toHex());
    sender.swaps = [];
  }

  if (receiver == null) {
    receiver = new NewContractReceiver(event.params.receiver.toHex());
    receiver.swaps = [];
  }

  newSwap.inputAmount = event.params.inputAmount;
  newSwap.outputAmount = event.params.outputAmount;
  newSwap.expiration = event.params.expiration;
  newSwap.contractId = event.params.id;
  newSwap.hashLock = event.params.hashLock;
  newSwap.sender = event.params.sender;
  newSwap.receiver = event.params.receiver;
  newSwap.outputNetwork = event.params.outputNetwork;
  newSwap.outputAddress = event.params.outputAddress;

  let senderSwaps = sender.swaps;
  senderSwaps.push(newSwap.id);
  sender.swaps = senderSwaps;

  let receiverSwaps = receiver.swaps;
  receiverSwaps.push(newSwap.id);
  receiver.swaps = receiverSwaps;

  newSwap.save();
  sender.save();
  receiver.save();
}

export function handleWithdraw(event: Withdraw): void {
  let newWithdraw = new WithdrawEntity(event.params.id.toHex());

  let sender = WithdrawSender.load(event.params.sender.toHex());
  let receiver = WithdrawReceiver.load(event.params.receiver.toHex());

  if (sender == null) {
    sender = new WithdrawSender(event.params.sender.toHex());
    sender.withdraws = [];
  }

  if (receiver == null) {
    receiver = new WithdrawReceiver(event.params.receiver.toHex());
    receiver.withdraws = [];
  }

  newWithdraw.withdrawId = event.params.id;
  newWithdraw.secret = event.params.secret;
  newWithdraw.hashLock = event.params.hashLock;
  newWithdraw.sender = event.params.sender;
  newWithdraw.receiver = event.params.receiver;

  let senderSwaps = sender.withdraws;
  senderSwaps.push(newWithdraw.id);
  sender.withdraws = senderSwaps;

  let receiverSwaps = receiver.withdraws;
  receiverSwaps.push(newWithdraw.id);
  receiver.withdraws = receiverSwaps;

  newWithdraw.save();
  sender.save();
  receiver.save();
}

export function handleRefund(event: Refund): void {
  let newRefund = new RefundEntity(event.params.id.toHex());

  let sender = RefundSender.load(event.params.sender.toHex());
  let receiver = RefundReceiver.load(event.params.receiver.toHex());

  if (sender == null) {
    sender = new RefundSender(event.params.sender.toHex());
    sender.refunds = [];
  }

  if (receiver == null) {
    receiver = new RefundReceiver(event.params.receiver.toHex());
    receiver.refunds = [];
  }

  newRefund.refundId = event.params.id;
  newRefund.hashLock = event.params.hashLock;
  newRefund.sender = event.params.sender;
  newRefund.receiver = event.params.receiver;

  let senderSwaps = sender.refunds;
  senderSwaps.push(newRefund.id);
  sender.refunds = senderSwaps;

  let receiverSwaps = receiver.refunds;
  receiverSwaps.push(newRefund.id);
  receiver.refunds = receiverSwaps;

  newRefund.save();
  sender.save();
  receiver.save();
}
