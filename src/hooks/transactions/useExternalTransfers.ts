import usePost from "../usePost";
import { usePendingTransfers } from "./usePendingTransfers";
import type {
  DebinRequestDto,
  DebinResponse,
  TopUpRequest,
  TopUpResponse,
} from "../../types/api";

export const useExternalTransfers = () => {
  const { addPendingTransfer, removePendingTransfer } = usePendingTransfers();

  const [debinCall, { loading: debinLoading, error: debinError }] = usePost({
    path: "/api/debin/request",
  });
  const [topUpCall, { loading: topUpLoading, error: topUpError }] = usePost({
    path: "/api/topup",
  });
  const [topUpCallbackCall] = usePost({ path: "/api/topup/callback" });

  const requestDebin = async (requestData: DebinRequestDto) => {
    const response = (await debinCall(requestData)) as DebinResponse;
    return response;
  };

  const requestTopUp = async (requestData: TopUpRequest) => {
    const response = (await topUpCall(requestData)) as TopUpResponse;
    if (response) {
      addPendingTransfer({ ...response, type: "TOPUP" });
    }
    return response;
  };

  const checkTransferStatus = async (id: string, type: "DEBIN" | "TOPUP") => {
    try {
      if (type === "TOPUP") {
        await topUpCallbackCall({ id });
        removePendingTransfer(id);
      }
      // For DEBIN, transfers are processed immediately; no further action needed
    } catch (error) {
      console.error(`Failed to check status for ${type} ${id}`, error);
      // Handle error appropriately, maybe show a notification
    }
  };

  return {
    requestDebin,
    requestTopUp,
    checkTransferStatus,
    loading: debinLoading || topUpLoading,
    error: debinError || topUpError,
  };
};
