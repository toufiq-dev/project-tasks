"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";

const DeleteTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialogTrigger>
        <Button color="red">Delete Task</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialog.Description>
          Are you sure you want to delete this task? This action is
          irreversible.
        </AlertDialog.Description>
        <Flex mt="4" gap="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete Task</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialogContent>
    </AlertDialog.Root>
  );
};

export default DeleteTaskButton;
