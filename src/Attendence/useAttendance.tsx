import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createAttandence, getAllAttendences } from "./Attendence.service"
import { useSnackbar } from "../context/SnackBar";
import { AttendanceType } from "./Attendance.type";
// import { useSearchParams } from "react-router-dom";

export function useAttendence() {

   const { showSnackbar } = useSnackbar()

   const queryClient = useQueryClient()
   const registerAttendance = async (userId: string, time: "MORNING" | "EVENING") => {
      try {
         await createAttandence(userId, time)
         queryClient.invalidateQueries({ queryKey: ["get-user"] })
         showSnackbar(
            "Attendance Created Successfully" + ` for : ${time}`,
            "success"
         )

      } catch (error) {
         console.log({ error });

      }

   }
   return { registerAttendance }
}

export function useAttendanceUsers() {

   // const [searchParams] = useSearchParams();

   // const query = searchParams.get('query');         // e.g., "2"
   // const pstatus = searchParams.get('pstatus');


   const { data } = useQuery<AttendanceType[]>({
      queryFn: () => getAllAttendences(),
      queryKey: ["get-attendance",]
   })
   return { data }
}