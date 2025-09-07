import ParentComponent from "./components/ParentComponent.tsx";
import {ToastContainer, Bounce} from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <QueryClientProvider client={queryClient}>
            <ParentComponent />
            </QueryClientProvider>
        </>
    );
}

export default App;