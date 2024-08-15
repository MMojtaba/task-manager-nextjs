import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/lib/utils";
import TaskRowContent from "./TaskRowContent";
import { Badge } from "@/components/ui/badge";
import { TASK_STATUS_TEXT } from "@/app/models/Task";

interface Props {
  task: any;
}

export default function TaskRow({ task }: Props) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value={task._id}>
          <AccordionTrigger className="flex gap-4">
            <Badge className="flex gap-2" variant="secondary">
              {/* <input type="checkbox" /> */}
              {TASK_STATUS_TEXT[task.status]}
            </Badge>
            <span>{task.title}</span>
            <span className="ml-auto text-sm">
              Due {formatDate(task.dueDate)}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <TaskRowContent task={task} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
