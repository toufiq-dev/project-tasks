import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>

      <Box>
        <Flex direction="column" gap="4">
          <EditTaskButton taskId={task.id} />
          <DeleteTaskButton taskId={task.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
