import { useQueryClient } from "@tanstack/react-query";
import { createAttandence } from "./Attendence.service"

export default function useAttendence() {

   const queryClient = useQueryClient()
   const registerAttendance = async (userId: string) => {
      try {
         await createAttandence(userId)
         queryClient.invalidateQueries({ queryKey: ["get-user"] })
         // alert("Success")

      } catch (error) {
         console.log({ error });

      }

   }
   return { registerAttendance }
}