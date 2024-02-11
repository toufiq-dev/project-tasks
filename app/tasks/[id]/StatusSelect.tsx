"use client";

import { Task, Status } from "@prisma/client";
import { TaskStatusBadge } from "@/app/components";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

const StatusSelect = ({ task }: { task: Task }) => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<Status>(task.status);

  useEffect(() => {
    setSelectedStatus(task.status);
  }, [task.status]);

  const assignStatus = async (newStatus: Status) => {
    const previousStatus = selectedStatus;
    setSelectedStatus(newStatus);
    try {
      await axios.patch(`/api/tasks/${task.id}`, {
        status: newStatus,
      });
      router.refresh();
    } catch {
      setSelectedStatus(previousStatus);
      toast.error("Changes could not be saved");
    }
  };

  return (
    <>
      <Select.Root value={selectedStatus} onValueChange={assignStatus}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Current Status</Select.Label>
            {Object.values(Status).map((status) => (
              <Select.Item value={status} key={status}>
                <TaskStatusBadge status={status} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
