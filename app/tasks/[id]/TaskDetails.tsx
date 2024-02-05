import { TaskStatusBadge } from "@/app/components";
import { Task } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Flex className="space-x-3" my="4">
        <TaskStatusBadge status={task.status} />
        <Text>{task.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
      ;
    </>
  );
};

export default TaskDetails;
