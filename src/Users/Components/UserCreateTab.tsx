import { Avatar, Button, Card, OutlinedInput, Switch, TextField } from "@mui/material"
import { useState } from "react"
import { useUserCreateForm } from "../useUsers";

const UserCreateTab = () => {
  const [cardioChecked, setCardioChecked] = useState(false)
  const [personalTrainerChecked, setPersonalTrainerChecked] = useState(false)
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // const getDefaultRegistrationFee = (): number => {
  //   const MONTHLY_FEE = 2000;
  //   const today = new Date();
  //   const nextPayment = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  //   const diffInMs = nextPayment.getTime() - today.getTime();
  //   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  //   return Math.ceil(diffInDays * (MONTHLY_FEE / 30));
  // }

  const { register, formState: { errors }, handleSubmit, onSubmit } = useUserCreateForm()
  return (

    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-[1rem] flex">
      <Card className="w-1/2 flex flex-col gap-3 p-4">

        <TextField
          {...register("name")}
          label="Name" variant="outlined" />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}

        {/* <TextField
          {...register("email")}
          label="Email" variant="outlined" />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>} */}


        <TextField
          {...register("phone")}
          label="Phone" variant="outlined" />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}




        <div className="flex justify-between gap-2">

          <div className="">
            <TextField
              type="number"
              {...register("registrationFee", { valueAsNumber: true })}
              defaultValue={1500} className="w-full" label="Registration Fee" variant="outlined" />
            {errors.registrationFee && <p className="text-red-600">{errors.registrationFee.message}</p>}
          </div>

          <div className="">
            <TextField
              type="number"
              {...register("monthlyFee", { valueAsNumber: true })}
              defaultValue={2000}
              className="w-full" label="Monthly Fees" variant="outlined"
            />
            {errors.monthlyFee && <p className="text-red-600">{errors.monthlyFee.message}</p>}
          </div>

        </div>

        <div className="flex w-full  gap-4 items-center">
          <label className="whitespace-nowrap">Next Payment:</label>
          <OutlinedInput
            className="w-full"
            type="date"
            {...register("nextPayment")}
          />
          {errors.nextPayment && <p className="text-red-600">{errors.nextPayment.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Switch
                {...register("cardio")}
                checked={cardioChecked}
                onChange={(e) => {
                  setCardioChecked(e.target.checked)
                  console.log(e.target.checked)
                }
                }
                defaultChecked />
              {
                cardioChecked ?
                  <p className="text-black">Cardio</p>
                  : <p className="text-gray-400">Cardio</p>
              }
            </div>

            <div className="flex items-center">
              <Switch
                {...register("personalTrainer")}
                checked={personalTrainerChecked}
                onChange={(e) => {
                  setPersonalTrainerChecked(e.target.checked)
                  console.log(e.target.checked)
                }
                }
                defaultChecked />
              {
                personalTrainerChecked ?
                  <p className="text-black">Trainer</p>
                  : <p className="text-gray-400">Trainer</p>
              }
            </div>
          </div>
          <Button type="submit" variant="contained" className="bg-black py-3 rounded-xl w-[16rem]">Register</Button>
        </div>
      </Card>
      <Card className="w-[40%] py-4 flex flex-col gap-4 justify-center items-center mx-auto">
        {/* image */}
        {<Avatar

          className="size-[17rem] ring-2 ring-black "
          alt="Remy Sharp"
          src={image || "/default-user.avif"}
        />}
        {/* {image && <img src={image} alt="Preview" className="object-center size-[17rem] rounded-3xl" />} */}

        {/* input */}
        <OutlinedInput
          {...register("image")}
          className="w-[17rem]" type={"file"} onChange={handleImageChange} />
      </Card>
    </form>
  )
}

export default UserCreateTab