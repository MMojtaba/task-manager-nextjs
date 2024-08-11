import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/lib/utils";

interface Props {
  task: any;
}

export default function TaskRow({ task }: Props) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value={task._id}>
          <AccordionTrigger className="">
            <span>{task.title}</span>
            <span>{formatDate(task.dueDate)}</span>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
