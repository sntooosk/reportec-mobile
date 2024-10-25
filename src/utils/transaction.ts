// Defina a interface para uma transação
interface Transaction {
    icon: string;
    title: string;
    subtitle: string;
    amount: number;
  }
  
  // Inicialize o array com transações exemplo
  export const limited_transaction: Transaction[] = [
    {
      icon: 'https://example.com/icon1.png',
      title: 'Purchase',
      subtitle: 'Store Name',
      amount: 45.00,
    },
    {
      icon: 'https://example.com/icon2.png',
      title: 'Transfer',
      subtitle: 'Bank Transfer',
      amount: 120.00,
    },
  ];
  