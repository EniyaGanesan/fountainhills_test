import "@/styles/globals.css";
import {DataContextProvider} from "@/components/context";

export default function App({Component, pageProps}) {
    return (
        <DataContextProvider>
            <Component {...pageProps} />
        </DataContextProvider>
    );
}
