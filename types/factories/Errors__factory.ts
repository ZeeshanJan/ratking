/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Errors, ErrorsInterface } from "../Errors";

const _abi = [
  {
    inputs: [],
    name: "AlreadyMintedFreeNFT",
    type: "error",
  },
  {
    inputs: [],
    name: "MaximumGiftSupplyLimitReached",
    type: "error",
  },
  {
    inputs: [],
    name: "MaximumPublicSupplyLimitReached",
    type: "error",
  },
  {
    inputs: [],
    name: "NotYourRatKing",
    type: "error",
  },
  {
    inputs: [],
    name: "RatKingAlreadyMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "RatKingHasAlreadyMintedFreeNFT",
    type: "error",
  },
];

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220d97ba8b8ac0db62c0a88c3072ad1767bf238c14bd3dd25939b55d293ad1d310b64736f6c634300080d0033";

type ErrorsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ErrorsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Errors__factory extends ContractFactory {
  constructor(...args: ErrorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Errors";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Errors> {
    return super.deploy(overrides || {}) as Promise<Errors>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Errors {
    return super.attach(address) as Errors;
  }
  connect(signer: Signer): Errors__factory {
    return super.connect(signer) as Errors__factory;
  }
  static readonly contractName: "Errors";
  public readonly contractName: "Errors";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ErrorsInterface {
    return new utils.Interface(_abi) as ErrorsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Errors {
    return new Contract(address, _abi, signerOrProvider) as Errors;
  }
}