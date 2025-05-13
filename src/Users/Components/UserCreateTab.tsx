import { Avatar, Button, Card, OutlinedInput, Switch, TextField } from "@mui/material"
import { useState } from "react"
import { useUserCreateForm } from "../useUsers";

const UserCreateTab = () => {
  const [Checked, setChecked] = useState(false)
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
              defaultValue={2000} className="w-full" label="Monthly Fees" variant="outlined" />
            {errors.monthlyFee && <p className="text-red-600">{errors.monthlyFee.message}</p>}
          </div>

        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Switch
              checked={Checked}
              onChange={(e) => {
                setChecked(e.target.checked)
                console.log(e.target.checked)
              }
              }
              defaultChecked />
            {
              Checked ?
                <p className="text-black">Cardio</p>
                : <p className="text-gray-400">Cardio</p>
            }
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
        <OutlinedInput className="w-[17rem]" type={"file"} onChange={handleImageChange} />
      </Card>
    </form>
  )
}

export default UserCreateTab