export const ArShieldsEvents = (prefix) => {
  return {
    Mint: `${prefix}.Mint`,
    MintCompleted: `${prefix}.MintCompleted`,

    DepositApproveCompleted: `${prefix}.DepositApproveCompleted`,
    WithdrawApproveCompleted: `${prefix}.WithdrawApproveCompleted`,

    Redeem: `${prefix}.Redeem`,
    RedeemCompleted: `${prefix}.RedeemCompleted`,

    ClaimFunds: `${prefix}.ClaimFunds`,
    ClaimFundsCompleted: `${prefix}.ClaimFundsCompleted`,

    GetShieldBalance: `${prefix}.GetShieldBalance`,
    ShieldBalanceReturned: `${prefix}.ShieldBalanceReturned`,

    GetUnderlyingTokenBalance: `${prefix}.GetUnderlyingTokenBalance`,
    UnderlyingTokenBalanceReturned: `${prefix}.UnderlyingTokenBalanceReturned`,

    GetShieldAssets: `${prefix}.GetShieldAssets`,
    ShieldAssetsReturned: `${prefix}.ShieldAssetsReturned`,

    GetFindFeePct: `${prefix}.GetFindFeePct`,
    FindFeePctReturned: `${prefix}.FindFeePctReturned`,

    GetLiquidatedAmounts: `${prefix}.GetLiquidatedAmounts`,
    LiquidatedAmountsReturned: `${prefix}.LiquidatedAmountsReturned`,

    GetPayAmounts: `${prefix}.GetPayAmounts`,
    PayAmountsReturned: `${prefix}.PayAmountsReturned`,

    GetArTokenValueOfPToken: `${prefix}.GetArTokenValueOfPToken`,
    ArTokenValueOfPTokenReturned: `${prefix}.ArTokenValueOfPTokenReturned`,

    GetPTokenValueOfArToken: `${prefix}.GetPTokenValueOfArToken`,
    PTokenValueOfArTokenReturned: `${prefix}.PTokenValueOfArTokenReturned`,
  }
}
