import prisma from "@/prisma/client";
import { Card, Heading, Table, Flex, Avatar } from "@radix-ui/themes";
import { Link, TaskStatusBadge } from "@/app/components";

const LatestTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Tasks in Project
      </Heading>
      <Table.Root>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="3">
                    <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                    <TaskStatusBadge status={task.status} />
                  </Flex>
                  {task.assignedToUser && (
                    <Avatar
                      src={task.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTasks;
