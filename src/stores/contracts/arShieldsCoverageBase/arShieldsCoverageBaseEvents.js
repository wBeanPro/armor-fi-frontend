export const ArShieldsCoverageBaseEvents = (prefix) => {
  return {
    GetTotalEthValue: `${prefix}.GetTotalEthValue`,
    TotalEthValueReturned: `${prefix}.TotalEthValueReturned`,

    GetCostPerEth: `${prefix}.GetCostPerEth`,
    CostPerEthReturned: `${prefix}.CostPerEthReturned`,

    GetShieldStats: `${prefix}.GetShieldStats`,
    ShieldStatsReturned: `${prefix}.ShieldStatsReturned`,

    GetTotalEthCoverage: `${prefix}.GetTotalEthCoverage`,
    TotalEthCoverageReturned: `${prefix}.TotalEthCoverageReturned`,
  }
}
