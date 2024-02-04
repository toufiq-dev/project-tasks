import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "violet" | "red" | "green" }
> = {
  OPEN: { label: "Open", color: "violet" },
  IN_PROGRESS: { label: "In Progress", color: "green" },
  CLOSED: { label: "Closed", color: "red" },
};

const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default TaskStatusBadge;
