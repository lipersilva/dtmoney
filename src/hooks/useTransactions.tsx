import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction:(transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }:TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    api.get('transactions')
    //fetch('http://localhost:3000/api/transactions') //realizar fetch para a rota (localhost)
    //.then(response => response.json()) //pega a resposta da requisicao e converte para json
      .then(response => setTransactions(response.data.transactions))//ver o que vai retornar
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })
    const { transaction } = response.data;

    setTransactions([
      //conceito de imutabilidade
      ...transactions,
      transaction,
    ]);

  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}