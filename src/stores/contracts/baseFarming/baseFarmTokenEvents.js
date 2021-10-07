export const BaseFarmTokenEvents = (prefix) => {
  return {
    GetBalance: `${prefix}.GetBalance`,
    BalanceReturned: `${prefix}.BalanceReturned`,

    GetTotalArmorStaked: `${prefix}.GetTotalArmorStaked`,
    TotalArmorStakedReturned: `${prefix}.TotalArmorStakedReturned`,

    Approve: `${prefix}.Approve`,
    ApproveCompleted: `${prefix}.ApproveCompleted`,

    ClaimRewardsCompleted: `${prefix}.ClaimRewardsCompleted`,
  }
}
