export const ArShieldsOracleEvents = (prefix) => {
  return {
    GetTotalEthValue: `${prefix}.GetTotalEthValue`,
    TotalEthValueReturned: `${prefix}.TotalEthValueReturned`,

    GetShieldStats: `${prefix}.GetShieldStats`,
    ShieldStatsReturned: `${prefix}.ShieldStatsReturned`,
  }
}
