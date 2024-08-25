"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { createTask, updateTask } from "../../../dataAccess/task";

import { PRIORITY, ITask } from "../../../models/Task";
import { getUserLabels } from "@/app/dataAccess/label";
import { useEffect, useState } from "react";

interface Props {
  task?: ITask;
  onClose?: () => void;
}

export default function TaskEdit({ task, onClose }: Props) {
  const { toast } = useToast();

  const [labels, setLabels] = useState<string[]>([]);

  async function init() {
    try {
      const res = await getUserLabels();
      if (res.status !== 200) throw new Error(res.message);
      setLabels(res.data);
    } catch (err) {
      console.error("Error init", err);
      // TODO: show toast
    }
  }

  useEffect(() => {
    init();
  }, []);

  const formSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().optional(),
    dueDate: z.date(),
    priority: z.nativeEnum(PRIORITY, { message: "Please select a priority" }),
    label: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      // TODO: can't change due date when editing task
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
      priority: task?.priority ?? PRIORITY.DEFAULT,
      label: task?.label ?? undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      let res;
      if (task?._id) {
        values.id = task._id;
        // TODO: only pass changed values?
        res = await updateTask(values);
      } else {
        res = await createTask(values);
      }

      if (res.status !== 200) throw new Error(res.message);

      toast({
        title: "Task updated",
        description: "Successfully updated the task!",
      });

      if (onClose) onClose();
    } catch (err) {
      console.error("Error saving task", err);
      // TODO: toast
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-4 space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="The title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the task..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(PRIORITY).map(([key, priority], index) => (
                    <SelectItem key={key} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {labels.map((label: string) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: add loading */}
        <Button className="ml-auto flex" type="submit">
          {task ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}

// TODO: set task label
