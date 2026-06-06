import { useAppSelector } from "@/store/hooks";
import { v4 as uuidv4 } from "uuid";

const useGetBasketId = (): string => {
  const userId = useAppSelector((state) => state.auth.user?.userId);
  return userId ?? uuidv4();
};

export default useGetBasketId;
