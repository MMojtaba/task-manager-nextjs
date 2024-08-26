import { changeTaskStatus } from "@/app/dataAccess/task";
import { ITask, TASK_STATUS } from "@/app/models/Task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  task: ITask | undefined;
  isOpen: boolean;
  onOpenChange: any;
}

export default function TaskViewDrawer({ task, isOpen, onOpenChange }: Props) {
  const { toast } = useToast();

  async function handleStatusChange(status: TASK_STATUS) {
    try {
      const res = await changeTaskStatus(task?._id?.toString(), status);
      if (res.status !== 200) throw new Error(res.message);
      onOpenChange(false);
      toast({ title: "Task updated!" });
    } catch (err) {
      console.error("Error updating task status", err);
      toast({ title: "Error updating task", variant: "destructive" });
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex gap-2">
            {task?.title}
            <Badge className="w-20 justify-center bg-red-500">
              {task?.priority}
            </Badge>
            {!!task?.label && (
              <Badge className="w-20 justify-center bg-blue-400">
                {task?.label}
              </Badge>
            )}
          </DrawerTitle>
          <DrawerDescription>{task?.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <span className="ml-auto flex gap-4">
            <Button
              variant="secondary"
              onClick={() => handleStatusChange(TASK_STATUS.CLOSED)}
            >
              Close Task
            </Button>
            <Button onClick={() => handleStatusChange(TASK_STATUS.COMPLETE)}>
              Complete
            </Button>
          </span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
