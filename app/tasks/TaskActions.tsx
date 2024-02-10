import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TaskStatusFilter from "./TaskStatusFilter";

const TaskActions = () => {
  return (
    <Flex justify="between">
      <TaskStatusFilter />
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
    </Flex>
  );
};

export default TaskActions;
