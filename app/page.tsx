import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import LatestTasks from "./LatestTasks";
import TaskChart from "./TaskChart";
import TaskSummary from "./TaskSummary";

export default async function Home() {
  const open = await prisma.task.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.task.count({
    where: { status: "CLOSED" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Flex direction="column" gap="6">
        <TaskSummary open={open} inProgress={inProgress} closed={closed} />
        <TaskChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestTasks />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Project Task Manager - Dashboard",
  description: "View a summary of project tasks and issues",
};
