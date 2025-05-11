import { SnackbarProvider } from "./context/SnackBar"
import CustomRouter from "./routes/index.route"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider>
          <CustomRouter />
        </SnackbarProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
