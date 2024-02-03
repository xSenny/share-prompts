import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import {Suspense} from "react";
import Loading from "@app/loading";

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and share AI prompts'
}

const RootLayout = ({children}) => {
    return (
        <html lang={"en"}>
            <body>
                <Provider>
                    <div className={"main"}>
                        <div className={"gradient"}/>
                    </div>
                    <main className={"app"}>
                        <Suspense fallback={<Loading />}>
                            <Nav />
                            {children}
                        </Suspense>
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;