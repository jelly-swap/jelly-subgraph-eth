// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { Address, DataSourceTemplate } from "@graphprotocol/graph-ts";

export class Contract extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("Contract", [address.toHex()]);
  }
}
