import closeImg from '../../assets/close.svg'
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './style';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';



interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');
  

  //previnir funcionamento padrao de um formulario submit no html
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    //como testar os valores

    await createTransaction ({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadatrar Transação</h2>

        <input 
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Título"
        />

        <input
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox
           type="button"
           //className={type === 'deposit' ? 'active' : ''}
           onClick={() => {setType('deposit'); }}//arrow function
           isActive={type === 'deposit'}
           activeColor="green"
          > 
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw');}} //arrow function
            isActive={type === 'withdraw'}
            activeColor="red"
          > 
            <img src={outcomeImg} alt="Saída" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          type="category"
          value={category}
          onChange={event => setCategory(event.target.value)}
          placeholder="Categoria"
        />
        
        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  );
}