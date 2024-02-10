import { Table } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Link, TaskStatusBadge } from "@/app/components";
import { Status, Task } from "@prisma/client";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Task;
    orderDirection: "asc" | "desc";
    page: string;
  };
  tasks: Task[];
}

const TaskTable = ({ searchParams, tasks }: Props) => {
  const nextOrderDirection =
    searchParams.orderBy === undefined || searchParams.orderDirection === "asc"
      ? "desc"
      : "asc";

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    orderDirection: nextOrderDirection, // Update direction on click
                  },
                }}
              >
                {column.label}
                {column.value === searchParams.orderBy && (
                  <span className="inline">
                    {searchParams.orderDirection === "asc" ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </span>
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tasks.map((task) => (
          <Table.Row key={task.id}>
            <Table.Cell>
              <Link href={`/tasks/${task.id}`}>{task.title}</Link>
              <div className="block md:hidden">
                <TaskStatusBadge status={task.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <TaskStatusBadge status={task.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {task.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const columns: {
  label: string;
  value: keyof Task;
  className?: string;
}[] = [
  { label: "Task", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export default TaskTable;
