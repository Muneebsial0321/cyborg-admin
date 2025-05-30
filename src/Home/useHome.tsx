import { useQuery } from "@tanstack/react-query";
import { getDashBoardData } from "./Home.service";

export default function useDashBoardData() {
   const { data, isLoading } = useQuery<Array<{ label: string, data: unknown }>>({
      queryKey: ["dashboard-data"],
      queryFn: getDashBoardData
   })
   return { data, isLoading }
}