/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  PremiumContract,
  PremiumContractInterface,
} from "../../../contracts/Auth.sol/PremiumContract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "checkValidBuyer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkValidPremium",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkValidSeller",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "premiums",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "validity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_premiumIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_userIndex",
        type: "uint256",
      },
    ],
    name: "purchasePremium",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userTypes",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600280600181540180825580915050600190039060005260206000200160006040518060400160405280600481526020017f467265650000000000000000000000000000000000000000000000000000000081525090919091509081620000ba919062000621565b50600280600181540180825580915050600190039060005260206000200160006040518060400160405280600581526020017f42757965720000000000000000000000000000000000000000000000000000008152509091909150908162000123919062000621565b50600280600181540180825580915050600190039060005260206000200160006040518060400160405280600681526020017f53656c6c65720000000000000000000000000000000000000000000000000000815250909190915090816200018c919062000621565b50600160405180606001604052806040518060400160405280600881526020017f4f6e654d6f6e74680000000000000000000000000000000000000000000000008152508152602001655af3107a4000815260200161012c8152509080600181540180825580915050600190039060005260206000209060030201600090919091909150600082015181600001908162000227919062000621565b5060208201518160010155604082015181600201555050600160405180606001604052806040518060400160405280600981526020017f5369784d6f6e7468730000000000000000000000000000000000000000000000815250815260200165b5e620f48000815260200161025881525090806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000019081620002d8919062000621565b5060208201518160010155604082015181600201555050600160405180606001604052806040518060400160405280600781526020017f4f6e6559656172000000000000000000000000000000000000000000000000008152508152602001660110d9316ec00081526020016104b0815250908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000190816200038a919062000621565b506020820151816001015560408201518160020155505062000708565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200042957607f821691505b6020821081036200043f576200043e620003e1565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004a97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200046a565b620004b586836200046a565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000502620004fc620004f684620004cd565b620004d7565b620004cd565b9050919050565b6000819050919050565b6200051e83620004e1565b620005366200052d8262000509565b84845462000477565b825550505050565b600090565b6200054d6200053e565b6200055a81848462000513565b505050565b5b8181101562000582576200057660008262000543565b60018101905062000560565b5050565b601f821115620005d1576200059b8162000445565b620005a6846200045a565b81016020851015620005b6578190505b620005ce620005c5856200045a565b8301826200055f565b50505b505050565b600082821c905092915050565b6000620005f660001984600802620005d6565b1980831691505092915050565b6000620006118383620005e3565b9150826002028217905092915050565b6200062c82620003a7565b67ffffffffffffffff811115620006485762000647620003b2565b5b62000654825462000410565b6200066182828562000586565b600060209050601f83116001811462000699576000841562000684578287015190505b62000690858262000603565b86555062000700565b601f198416620006a98662000445565b60005b82811015620006d357848901518255600182019150602085019450602081019050620006ac565b86831015620006f35784890151620006ef601f891682620005e3565b8355505b6001600288020188555050505b505050505050565b61135a80620007186000396000f3fe6080604052600436106100705760003560e01c8063992d8c201161004e578063992d8c201461011c578063a33abbb714610147578063afa5e8ea14610172578063c381daf61461018e57610070565b806309464261146100755780637a6ab483146100b45780638da5cb5b146100f1575b600080fd5b34801561008157600080fd5b5061009c60048036038101906100979190610c43565b6101b9565b6040516100ab93929190610d0f565b60405180910390f35b3480156100c057600080fd5b506100db60048036038101906100d69190610c43565b61027b565b6040516100e89190610d4d565b60405180910390f35b3480156100fd57600080fd5b50610106610327565b6040516101139190610db0565b60405180910390f35b34801561012857600080fd5b5061013161034b565b60405161013e9190610de6565b60405180910390f35b34801561015357600080fd5b5061015c6104ff565b6040516101699190610de6565b60405180910390f35b61018c60048036038101906101879190610e01565b6106b3565b005b34801561019a57600080fd5b506101a3610aa6565b6040516101b09190610de6565b60405180910390f35b600181815481106101c957600080fd5b90600052602060002090600302016000915090508060000180546101ec90610e70565b80601f016020809104026020016040519081016040528092919081815260200182805461021890610e70565b80156102655780601f1061023a57610100808354040283529160200191610265565b820191906000526020600020905b81548152906001019060200180831161024857829003601f168201915b5050505050908060010154908060020154905083565b6002818154811061028b57600080fd5b9060005260206000200160009150905080546102a690610e70565b80601f01602080910402602001604051908101604052809291908181526020018280546102d290610e70565b801561031f5780601f106102f45761010080835404028352916020019161031f565b820191906000526020600020905b81548152906001019060200180831161030257829003601f168201915b505050505081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201805461040890610e70565b80601f016020809104026020016040519081016040528092919081815260200182805461043490610e70565b80156104815780601f1061045657610100808354040283529160200191610481565b820191906000526020600020905b81548152906001019060200180831161046457829003601f168201915b505050505081526020016003820154815260200160048201548152505090506040518060400160405280600681526020017f53656c6c65720000000000000000000000000000000000000000000000000000815250805190602001208160400151805190602001201480156104f95750428160800151115b91505090565b600080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820180546105bc90610e70565b80601f01602080910402602001604051908101604052809291908181526020018280546105e890610e70565b80156106355780601f1061060a57610100808354040283529160200191610635565b820191906000526020600020905b81548152906001019060200180831161061857829003601f168201915b505050505081526020016003820154815260200160048201548152505090506040518060400160405280600581526020017f4275796572000000000000000000000000000000000000000000000000000000815250805190602001208160400151805190602001201480156106ad5750428160800151115b91505090565b60018054905082106106fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f190610eed565b60405180910390fd5b6002805490508110610741576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073890610f59565b60405180910390fd5b6001828154811061075557610754610f79565b5b90600052602060002090600302016001015434146107a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079f90610ff4565b60405180910390fd5b6000600183815481106107be576107bd610f79565b5b90600052602060002090600302016040518060600160405290816000820180546107e790610e70565b80601f016020809104026020016040519081016040528092919081815260200182805461081390610e70565b80156108605780601f1061083557610100808354040283529160200191610860565b820191906000526020600020905b81548152906001019060200180831161084357829003601f168201915b5050505050815260200160018201548152602001600282015481525050905060008160400151426108919190611043565b90506000600284815481106108a9576108a8610f79565b5b9060005260206000200180546108be90610e70565b80601f01602080910402602001604051908101604052809291908181526020018280546108ea90610e70565b80156109375780601f1061090c57610100808354040283529160200191610937565b820191906000526020600020905b81548152906001019060200180831161091a57829003601f168201915b505050505090506040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200186815260200182815260200142815260200183815250600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002019081610a209190611252565b50606082015181600301556080820151816004015590505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610a9e573d6000803e3d6000fd5b505050505050565b600080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282018054610b6390610e70565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8f90610e70565b8015610bdc5780601f10610bb157610100808354040283529160200191610bdc565b820191906000526020600020905b815481529060010190602001808311610bbf57829003601f168201915b505050505081526020016003820154815260200160048201548152505090504281608001511191505090565b600080fd5b6000819050919050565b610c2081610c0d565b8114610c2b57600080fd5b50565b600081359050610c3d81610c17565b92915050565b600060208284031215610c5957610c58610c08565b5b6000610c6784828501610c2e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610caa578082015181840152602081019050610c8f565b60008484015250505050565b6000601f19601f8301169050919050565b6000610cd282610c70565b610cdc8185610c7b565b9350610cec818560208601610c8c565b610cf581610cb6565b840191505092915050565b610d0981610c0d565b82525050565b60006060820190508181036000830152610d298186610cc7565b9050610d386020830185610d00565b610d456040830184610d00565b949350505050565b60006020820190508181036000830152610d678184610cc7565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d9a82610d6f565b9050919050565b610daa81610d8f565b82525050565b6000602082019050610dc56000830184610da1565b92915050565b60008115159050919050565b610de081610dcb565b82525050565b6000602082019050610dfb6000830184610dd7565b92915050565b60008060408385031215610e1857610e17610c08565b5b6000610e2685828601610c2e565b9250506020610e3785828601610c2e565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610e8857607f821691505b602082108103610e9b57610e9a610e41565b5b50919050565b7f496e76616c6964207072656d69756d20696e6465780000000000000000000000600082015250565b6000610ed7601583610c7b565b9150610ee282610ea1565b602082019050919050565b60006020820190508181036000830152610f0681610eca565b9050919050565b7f496e76616c6964207573657220696e6465780000000000000000000000000000600082015250565b6000610f43601283610c7b565b9150610f4e82610f0d565b602082019050919050565b60006020820190508181036000830152610f7281610f36565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f496e636f7272656374207072656d69756d20616d6f756e740000000000000000600082015250565b6000610fde601883610c7b565b9150610fe982610fa8565b602082019050919050565b6000602082019050818103600083015261100d81610fd1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061104e82610c0d565b915061105983610c0d565b925082820190508082111561107157611070611014565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026111087fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826110cb565b61111286836110cb565b95508019841693508086168417925050509392505050565b6000819050919050565b600061114f61114a61114584610c0d565b61112a565b610c0d565b9050919050565b6000819050919050565b61116983611134565b61117d61117582611156565b8484546110d8565b825550505050565b600090565b611192611185565b61119d818484611160565b505050565b5b818110156111c1576111b660008261118a565b6001810190506111a3565b5050565b601f821115611206576111d7816110a6565b6111e0846110bb565b810160208510156111ef578190505b6112036111fb856110bb565b8301826111a2565b50505b505050565b600082821c905092915050565b60006112296000198460080261120b565b1980831691505092915050565b60006112428383611218565b9150826002028217905092915050565b61125b82610c70565b67ffffffffffffffff81111561127457611273611077565b5b61127e8254610e70565b6112898282856111c5565b600060209050601f8311600181146112bc57600084156112aa578287015190505b6112b48582611236565b86555061131c565b601f1984166112ca866110a6565b60005b828110156112f2578489015182556001820191506020850194506020810190506112cd565b8683101561130f578489015161130b601f891682611218565b8355505b6001600288020188555050505b50505050505056fea26469706673582212206f7fdeee75d4583924f9e7e36e672adc83f4930301bc1e86fb9550dd875de1b264736f6c63430008140033";

type PremiumContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PremiumContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PremiumContract__factory extends ContractFactory {
  constructor(...args: PremiumContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      PremiumContract & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PremiumContract__factory {
    return super.connect(runner) as PremiumContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PremiumContractInterface {
    return new Interface(_abi) as PremiumContractInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PremiumContract {
    return new Contract(address, _abi, runner) as unknown as PremiumContract;
  }
}
