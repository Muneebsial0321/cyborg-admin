import { Card } from "@mui/material"

const DashBoardWidget = ({ label = "label", data = "data" }: { label: string, data: string }) => {
    return (
        <Card
            elevation={1}
            variant="elevation"
            className="w-[16rem] p-8 rounded-xl flex gap-[1rem]">
            <div className="data w-[7rem]">
                <p className="text-xl  font-semibold">{label}</p>
                <p className="text-4xl font-bold">{data}</p>
            </div>
            <div className="img h-full flex justify-center items-center">
                <img 
                className="size-[4rem] rounded-full object-contain"
                src="/widget.svg" alt="" />
            </div>
        </Card>
    )
}

export default DashBoardWidget