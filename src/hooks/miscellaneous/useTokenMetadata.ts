import { useAppSelector } from "@/redux"
import { BlockchainTokenService, TokenMetadata } from "@/services"
import useSWR, { SWRResponse } from "swr"

export interface UseTokenMetadataParams {
  tokenKey: string;
  chainKey: string;
}

export interface UseTokenMetadataReturn {
  tokenMetadataSwr: SWRResponse<TokenMetadata, unknown>;
}

export const useTokenMetadata = ({
    tokenKey,
    chainKey,
}: UseTokenMetadataParams): UseTokenMetadataReturn => {
    const network = useAppSelector((state) => state.blockchainReducer.network)

    const tokenMetadataSwr = useSWR(
        ["TOKEN_METADATA_SWR", tokenKey],
        async () => {
            const tokenService = new BlockchainTokenService({
                chainKey,
                tokenKey,
                network,
            })

            return await tokenService.getTokenMetadata()
        }
    )

    return {
        tokenMetadataSwr,
    }
}
