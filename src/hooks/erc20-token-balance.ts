import { erc20Abi, formatUnits } from "viem"
import { useReadContracts } from "wagmi"

function useErc20TokenBalance({
  tokenAddress,
  balanceOf,
}: {
  tokenAddress: `0x${string}`
  balanceOf: `0x${string}`
}) {
  const { data: tokenData, ...rest } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [balanceOf],
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  })

  const [balance, decimals, symbol] = tokenData ?? []

  const formatedBalance =
    balance !== undefined && decimals !== undefined
      ? formatUnits(balance, decimals)
      : "-"
  return {
    data: { balance, decimals, symbol, formatedBalance },
    ...rest,
  }
}

export { useErc20TokenBalance }
