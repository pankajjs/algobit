import { db } from "./db";

const seed = async () => {
    const problems = [
        {
            title: "sum",
            description:  "d1",
            difficulty: "easy",
            testCases: [
                {
                    input: "5\n3",
                    output: "8",
                },
                {input: "0\n2", output: "2"}
            ]
        },
        {
            title: "modulo",
            description:  "d2",
            difficulty: "medium",
            testCases: [
                {
                    input: "2\n3",
                    output: "2",
                },
                {input: "3\n1", output: "0"}
            ]
        },
    ]

    await db.problem.deleteMany();
    await db.problem.createMany({
        data: problems,
    });
    console.log("seeding done");
}

seed();