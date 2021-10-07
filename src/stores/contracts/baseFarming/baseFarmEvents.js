export const BaseFarmEvents = (prefix) => {
  return {
    GetStakedArmor: `${prefix}.GetStakedArmor`,
    StakedArmorReturned: `${prefix}.StakedArmorReturned`,

    GetOwnedArmor: `${prefix}.GetOwnedArmor`,
    OwnedArmorReturned: `${prefix}.OwnedArmorReturned`,

    GetRewardsOwed: `${prefix}.GetRewardsOwed`,
    RewardsOwedReturned: `${prefix}.RewardsOwedReturned`,

    GetLastReward: `${prefix}.GetLastReward`,
    LastRewardReturned: `${prefix}.LastRewardReturned`,

    GetWeeklyArmor: `${prefix}.GetWeeklyArmor`,
    WeeklyArmorReturned: `${prefix}.WeeklyArmorReturned`,

    GetRewardsGiven: `${prefix}.GetRewardsGiven`,
    RewardsGivenReturned: `${prefix}.RewardsGivenReturned`,

    GetTotalRewardsGiven: `${prefix}.GetTotalRewardsGiven`,
    TotalRewardsGivenReturned: `${prefix}.TotalRewardsGivenReturned`,

    GetTotalStakers: `${prefix}.GetTotalStakers`,
    TotalStakersReturned: `${prefix}.TotalStakersReturned`,

    Stake: `${prefix}.Stake`,
    StakeCompleted: `${prefix}.StakeCompleted`,

    ClaimRewards: `${prefix}.ClaimRewards`,
    ClaimRewardsCompleted: `${prefix}.ClaimRewardsCompleted`,

    Withdraw: `${prefix}.Withdraw`,
    WithdrawCompleted: `${prefix}.WithdrawCompleted`,

    Exit: `${prefix}.Exit`,
    ExitCompleted: `${prefix}.ExitCompleted`,

    GetArnftApy: `${prefix}.GetArnftApy`,
    ArnftApyReturned: `${prefix}.ArnftApyReturned`,
  }
}
