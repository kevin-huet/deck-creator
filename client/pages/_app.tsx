import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {AppBar} from "../components/commons/AppBar";
import {useState} from "react";
import {FooterCentered} from "../components/commons/Footer";                             //icons

function MyApp({Component, pageProps}: AppProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme =  (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark') ? 'light' : 'dark');
    }
    const links = [
        {label: 'Home', link: '/'},
        {label: 'Deck', link: '/decks'}
    ]
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withCSSVariables withGlobalStyles withNormalizeCSS>
                <AppBar links={links}/>
                <Component {...pageProps} />
                <FooterCentered links={[
                    { label: 'Zebi', link: ''}, { label: 'Ratio', link: ''}
                ]}></FooterCentered>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default MyApp
