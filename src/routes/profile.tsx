import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../pages/ProfilePage.tsx";

export const Route = createFileRoute("/profile")({
    component: ProfilePage,
});
