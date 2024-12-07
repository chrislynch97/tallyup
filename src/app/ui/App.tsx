import "../styles/tailwind.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Mantine from "../providers/Mantine";
import TanstackQuery from "../providers/TanstackQuery.tsx";
import TanstackRouter from "../providers/TanstackRouter.tsx";

export default function App() {
    return (
        <Mantine>
            <TanstackQuery>
                <TanstackRouter />
            </TanstackQuery>
        </Mantine>
    );
}
