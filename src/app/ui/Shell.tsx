import {
    AppShell,
    Burger,
    Button,
    Container,
    Group,
    rem,
    Title,
} from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

const MenuOptions = () => (
    <>
        <Button variant={"white"} component={"a"} href={"/"}>
            Home
        </Button>
        <Button variant={"white"} component={"a"} href={"/profile"}>
            Profile
        </Button>
        <Button variant={"white"} component={"a"} href={"/log-activity"}>
            Log Activity
        </Button>
    </>
);

export default function Shell() {
    const pinned = useHeadroom({ fixedAt: 120 });
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{
                height: 60,
                collapsed: !pinned,
            }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: true, mobile: !opened },
            }}
            padding={"md"}
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Title order={3}>TallyUp</Title>
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            <MenuOptions />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py={"md"} px={4}>
                <MenuOptions />
            </AppShell.Navbar>

            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                <Container my="md" maw={800} mx="auto">
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
