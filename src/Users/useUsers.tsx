import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./Users.service";
import { useForm } from "react-hook-form";
import { userCreateSchema, userCreateSchemaType } from "./User.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

export default function useUsers() {

   const [searchParams] = useSearchParams();

   const query = searchParams.get('query');         // e.g., "2"
   const pstatus = searchParams.get('pstatus');


   const { data: getUsers } = useQuery({
      queryFn: () => getAllUsers(query, pstatus),
      queryKey: ["get-user",query,pstatus]
   })
   return { getUsers }
}

export const useUserCreateForm = () => {

   const { register, handleSubmit, formState, watch } = useForm<userCreateSchemaType>({
      resolver: zodResolver(userCreateSchema),
      defaultValues: {
         name: "",
         email: "",
         phone: "",
         registrationFee: 1500,
         monthlyFees: 2000,
         cardio: false,
         image: null,
      },
   });
   const onSubmit = (data: userCreateSchemaType) => {
      console.log(data);
   };
   return { register, handleSubmit, formState, watch, onSubmit }
};