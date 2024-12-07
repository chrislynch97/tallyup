import { createFileRoute } from "@tanstack/react-router";
import LogActivityPage from "../pages/LogActivityPage.tsx";

export const Route = createFileRoute("/log-activity")({
    component: LogActivityPage,
});
