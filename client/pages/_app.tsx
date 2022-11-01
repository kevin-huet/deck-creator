import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ColorScheme, ColorSchemeProvider, MantineProvider, Button} from "@mantine/core";
import {AppBar} from "../components/commons/AppBar";
import {Context, useContext, useEffect, useState} from "react";
import {FooterCentered} from "../components/commons/Footer";
import {AuthContext, AuthProvider} from "../lib/providers/auth.provider";

function MyApp({Component, pageProps, ...rest}: AppProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark') ? 'light' : 'dark');
    }
    const links = [
        {label: 'Home', link: '/'},
        {label: 'Deck', link: '/decks'},
        {label: 'Tutorial', link: '/tutorial'},
        {label: 'Support', link: '/support'}
    ]
    useEffect(() => {
    })
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withCSSVariables withGlobalStyles withNormalizeCSS>
                <AuthProvider>
                    <AppBar links={links}/>
                    <Component {...pageProps} />

                    <FooterCentered links={[
                        {label: 'CGU', link: ''}, {label: 'Social', link: ''}
                    ]}></FooterCentered>
                </AuthProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default MyApp;