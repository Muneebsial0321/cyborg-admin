import { useQuery } from "@tanstack/react-query";
import { createUsers, getAllUsers } from "./Users.service";
import { useForm } from "react-hook-form";
import { userCreateSchema, userCreateSchemaType } from "./User.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { useSnackbar } from "../context/SnackBar";

export default function useUsers() {

   const [searchParams] = useSearchParams();

   const query = searchParams.get('query');         // e.g., "2"
   const pstatus = searchParams.get('pstatus');


   const { data: getUsers } = useQuery({
      queryFn: () => getAllUsers(query, pstatus),
      queryKey: ["get-user", query, pstatus]
   })
   return { getUsers }
}

export const useUserCreateForm = () => {

   const { showSnackbar } = useSnackbar()

   const { register, handleSubmit, formState, watch } = useForm<userCreateSchemaType>({
      resolver: zodResolver(userCreateSchema),
      defaultValues: {
         name: "",
         phone: "",
         registrationFee: 1500,
         monthlyFee: 2000,
         cardio: false,
         image: null,
         personalTrainer: false,
      },
   });
   const onSubmit = async (data: userCreateSchemaType) => {
      try {
         await createUsers(data)
         showSnackbar(
            "User Created Successfully",
            "success"
         )
      } catch (error) {
         console.log({ error });
         showSnackbar(
            "Some Error Occured",
            "error"
         )

      }
   };
   return { register, handleSubmit, formState, watch, onSubmit }
};