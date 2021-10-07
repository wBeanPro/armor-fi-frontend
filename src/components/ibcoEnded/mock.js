export default () => {
  const data = {
    goalEth: '67800',
    sharedEth: '250', // ETH contributed by current customer
    sharedArmor: '10050000', // ARMOR contributed by current customer
    startArmorPrice: '0.0027',
    currentArmorPrice: '0.003245',
    transactions: [
      {
        amount: '1000',
        address: '0x7hd82hr92unr928fjowe092f08wr',
        transactionId: '0x38f93jf023kmg03md090w09mfm9i4f02mfe092mlfoe92f3',
      },
      {
        amount: '12',
        address: '0x7hd82hr92unr928fjowe092f08wr',
        transactionId: '0x38f93jf023kmg03md090w09mfm9i4f02mfe092mlfoe92f3',
      },
      {
        amount: '1',
        address: '0x7hd82hr92unr928fjowe092f08wr',
        transactionId: '0x38f93jf023kmg03md090w09mfm9i4f02mfe092mlfoe92f3',
      },
      {
        amount: '77',
        address: '0x7hd82hr92unr928fjowe092f08wr',
        transactionId: '0x38f93jf023kmg03md090w09mfm9i4f02mfe092mlfoe92f3',
      },
      {
        amount: '2.5',
        address: '0x7hd82hr92unr928fjowe092f08wr',
        transactionId: '0x38f93jf023kmg03md090w09mfm9i4f02mfe092mlfoe92f3',
      },
    ],
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000)
  })
}
