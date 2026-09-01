export type MyDonationStatus = "success" | "pending" | "failed" | "refund"

export type MyDonationData = {
  amount: number | string
  status: MyDonationStatus
  campaign: {
    title: string
    contractAddress: string
  }
  donatedOn: string
  txHash: string
}
