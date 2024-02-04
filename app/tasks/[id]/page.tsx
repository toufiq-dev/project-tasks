import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import TaskStatusBadge from "@/app/components/TaskStatusBadge";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <div>
      <Heading>{task.title}</Heading>
      <Flex className="space-x-3" my="4">
        <TaskStatusBadge status={task.status} />
        <Text>{task.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{task.description}</p>
      </Card>
    </div>
  );
};

export default TaskDetailPage;
