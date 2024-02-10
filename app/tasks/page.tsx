import prisma from "@/prisma/client";
import { Status, Task } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import TaskActions from "./TaskActions";
import TaskTable, { columns } from "./_components/TaskTable";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Task;
    orderDirection: "asc" | "desc";
    page: string;
  };
}

const TasksPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 7;

  const nextOrderDirection =
    searchParams.orderBy === undefined || searchParams.orderDirection === "asc"
      ? "desc"
      : "asc";

  const tasks = await prisma.task.findMany({
    where: {
      status,
    },
    orderBy: {
      [searchParams.orderBy || columns[0].value]: nextOrderDirection, // Handle initial sort and default column
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const taskCount = await prisma.task.count({ where: { status } });

  return (
    <Flex direction="column" gap="6">
      <TaskActions />

      <TaskTable searchParams={searchParams} tasks={tasks} />

      <Flex direction="column" align="center">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={taskCount}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project Task Manager - Task list",
  description: "View all project tasks and issues",
};

export default TasksPage;
