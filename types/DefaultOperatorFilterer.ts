/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface DefaultOperatorFiltererInterface extends utils.Interface {
  contractName: "DefaultOperatorFilterer";
  functions: {
    "OPERATOR_FILTER_REGISTRY()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "OPERATOR_FILTER_REGISTRY",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "OPERATOR_FILTER_REGISTRY",
    data: BytesLike
  ): Result;

  events: {};
}

export interface DefaultOperatorFilterer extends BaseContract {
  contractName: "DefaultOperatorFilterer";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DefaultOperatorFiltererInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    OPERATOR_FILTER_REGISTRY(overrides?: CallOverrides): Promise<[string]>;
  };

  OPERATOR_FILTER_REGISTRY(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    OPERATOR_FILTER_REGISTRY(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    OPERATOR_FILTER_REGISTRY(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    OPERATOR_FILTER_REGISTRY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
