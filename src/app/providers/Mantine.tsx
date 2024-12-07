import { createTheme, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

const theme = createTheme({});

export default function Mantine({ children }: { children: ReactNode }) {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
