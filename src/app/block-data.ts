import { Transaction } from './transactions';

export interface BlockData {
  blockHash: string
  blockNumber: number
  previousBlock: string
  transactions: Transaction[];
}