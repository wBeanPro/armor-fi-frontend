export const Erc20Events = (prefix) => {
  return {
    GetBalance: `${prefix}.GetBalance`,
    BalanceReturned: `${prefix}.BalanceReturned`,

    Approve: `${prefix}.Approve`,
    ApproveCompleted: `${prefix}.ApproveCompleted`,
  }
}
