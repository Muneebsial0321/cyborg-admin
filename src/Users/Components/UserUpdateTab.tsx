import { Avatar, Button, Card, Input, OutlinedInput, Switch, TextField } from "@mui/material"
import { useState } from "react"

const UserUpdateTab = () => {
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
  return (
    <div className="w-full p-[1rem] flex">
      <Card className="w-1/2 flex flex-col gap-3 p-4">

        <TextField label="Name" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Phone" variant="outlined" />

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
          <Button variant="contained" className="bg-black py-3 rounded-xl w-[16rem]">Register</Button>
        </div>
      </Card>
      <Card className="w-[40%] py-4 flex flex-col gap-4 justify-center items-center mx-auto">
        {/* image */}
        { <Avatar
          className="size-[17rem] ring-2 ring-black "
          alt="Remy Sharp"
          src={image || "/default-user.avif"}
        />}
        {/* {image && <img src={image} alt="Preview" className="object-center size-[17rem] rounded-3xl" />} */}

        {/* input */}
        <OutlinedInput className="w-[17rem]" type={"file"} onChange={handleImageChange} />
      </Card>
    </div>
  )
}

export default UserUpdateTab