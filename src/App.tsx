import { SnackbarProvider } from "./context/SnackBar"
import CustomRouter from "./routes/index.route"


function App() {

  return (
    <>
      <SnackbarProvider>
        <CustomRouter />
      </SnackbarProvider>
    </>
  )
}

export default App
