import {
    Autocomplete,
    Button,
    CloseButton,
    Container,
    Flex,
    Grid,
    NumberInput,
    Select,
    Stack,
} from "@mantine/core";
import { formOptions, useForm } from "@tanstack/react-form";
import { DateInput } from "@mantine/dates";
import * as z from "zod";
import { ZodType } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

interface Player {
    name: string;
    scores: number[];
}

interface Activity {
    type: string;
    date: Date;
    numberOfGames: number;
    players: Player[];
}

const activitySchema = z.object({
    type: z.string({ required_error: "Activity type is required" }),
    date: z
        .date({ required_error: "Activity date is required" })
        .refine(
            (date) => date <= new Date(),
            "Cannot enter a date in the future"
        ),
    numberOfGames: z
        .number({
            required_error: "Number of games are required",
        })
        .min(1, "Must play at least 1 game")
        .max(10, "Cannot play more than 10 games"),
    players: z.array(
        z.object({
            name: z.string({ required_error: "Player name is required" }),
            scores: z.array(z.number()).min(1),
        })
    ),
}) satisfies ZodType<Activity>;

const formOpts = formOptions({
    defaultValues: {
        type: "",
        date: new Date(),
        numberOfGames: 2,
        players: [],
    } as Activity,
    validatorAdapter: zodValidator(),
    validators: {
        onChange: activitySchema,
    },
});

export default function LogActivityPage() {
    const { Field, handleSubmit, getFieldValue, setFieldValue, state } =
        useForm({
            ...formOpts,
            onSubmit: async ({ value }) => {
                console.log(value);
            },
        });

    return (
        <Container>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void handleSubmit();
                }}
            >
                <Stack gap={"md"}>
                    <Field
                        name={"type"}
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "An activity type is required"
                                    : undefined,
                        }}
                        children={({ state, handleChange, handleBlur }) => (
                            <Select
                                clearable={false}
                                data={["Bowling"]}
                                defaultValue={state.value}
                                error={
                                    state.meta.errors.length > 0
                                        ? state.meta.errors
                                        : undefined
                                }
                                label={"Activity type"}
                                onBlur={handleBlur}
                                onChange={(value) => handleChange(value)}
                                placeholder={"Select an activity type"}
                                required={true}
                                searchable={true}
                            />
                        )}
                    />
                    <Field
                        name={"date"}
                        children={({ state, handleChange, handleBlur }) => (
                            <DateInput
                                defaultValue={state.value}
                                error={
                                    state.meta.errors.length > 0
                                        ? state.meta.errors
                                        : undefined
                                }
                                label={"Date"}
                                onBlur={handleBlur}
                                onChange={(value) => handleChange(value)}
                                placeholder={"Select date"}
                                required={true}
                            />
                        )}
                    />
                    <Field
                        name={"numberOfGames"}
                        children={({ state, handleChange, handleBlur }) => (
                            <NumberInput
                                defaultValue={state.value}
                                error={
                                    state.meta.errors.length > 0
                                        ? state.meta.errors
                                        : undefined
                                }
                                label={"Number of games"}
                                onBlur={handleBlur}
                                min={1}
                                max={10}
                                onChange={(value) => {
                                    if (Number(value) < 1) return;

                                    // Update the number of games
                                    const numberOfGames = Number(value || 0);
                                    handleChange(numberOfGames);

                                    // Update all players' scores arrays to match the new number of games
                                    const players = getFieldValue("players");
                                    players.forEach((_, index) => {
                                        setFieldValue(
                                            `players[${index}].scores`,
                                            Array(numberOfGames).fill(0)
                                        );
                                    });
                                }}
                                placeholder={"Enter number of games"}
                                required={true}
                            />
                        )}
                    />
                    <Field
                        mode={"array"}
                        name={"players"}
                        children={(field) => (
                            <Grid gutter="sm">
                                {/* Player Name Column */}
                                <Grid.Col span={4}>
                                    <Stack>
                                        {field.state.value.map((_, index) => (
                                            <Field
                                                key={index}
                                                name={`players[${index}].name`}
                                                children={(subField) => (
                                                    <Autocomplete
                                                        defaultValue={
                                                            subField.state.value
                                                        }
                                                        onChange={(value) =>
                                                            subField.handleChange(
                                                                value
                                                            )
                                                        }
                                                        data={[
                                                            "Chris",
                                                            "Kathryn",
                                                            "Andy",
                                                            "Gillian",
                                                            "Cameron",
                                                            "Beth",
                                                        ]}
                                                        required={true}
                                                    />
                                                )}
                                            />
                                        ))}
                                    </Stack>
                                </Grid.Col>

                                {/* Scores Column */}
                                <Grid.Col
                                    span={7}
                                    className={"overflow-x-auto"}
                                >
                                    <Stack>
                                        {field.state.value.map((_, index) => (
                                            <Flex
                                                key={index}
                                                direction="row"
                                                gap="sm"
                                                className={"w-full"}
                                            >
                                                <Field
                                                    name={`players[${index}].scores`}
                                                    children={(subField) =>
                                                        subField.state.value.map(
                                                            (_, scoreIndex) => (
                                                                <NumberInput
                                                                    key={
                                                                        scoreIndex
                                                                    }
                                                                    className={
                                                                        "w-20 flex-shrink-0"
                                                                    }
                                                                />
                                                            )
                                                        )
                                                    }
                                                />
                                            </Flex>
                                        ))}
                                    </Stack>
                                </Grid.Col>

                                {/* Remove Button Column */}
                                <Grid.Col span={1}>
                                    <Stack
                                        justify="space-evenly"
                                        align="center"
                                        className={"h-full"}
                                    >
                                        {field.state.value.map((_, index) => (
                                            <CloseButton
                                                key={index}
                                                onClick={() =>
                                                    field.removeValue(index)
                                                }
                                            />
                                        ))}
                                    </Stack>
                                </Grid.Col>

                                {/* Add Player Button */}
                                <Grid.Col span={12}>
                                    <Button
                                        fullWidth
                                        variant="outline"
                                        onClick={() => {
                                            field.pushValue({
                                                name: "",
                                                scores: Array(
                                                    getFieldValue(
                                                        "numberOfGames"
                                                    )
                                                ).fill(0),
                                            });
                                        }}
                                    >
                                        Add Player
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        )}
                    />
                    <Button type={"submit"}>Log Activity</Button>
                </Stack>
            </form>
        </Container>
    );
}
