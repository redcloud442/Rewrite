import { base64ToBlob } from "@/lib/helper";
import { fileUploadSchema, FileUploadSchema } from "@/lib/schema";
import { ttsService } from "@/services/tts/tts-service";
import { useFileStore } from "@/store/fileStore";
import { useIsLoadingStore } from "@/store/isLoadingStore";
import { useMessageStore } from "@/store/messageStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FileDropzone } from "../ui/file-dropzone";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  onHasProcessed: () => void;
};

const FileUploaderSection = ({ onHasProcessed }: Props) => {
  const { setFiles } = useFileStore();
  const { setMessages } = useMessageStore();
  const { setIsLoading } = useIsLoadingStore();
  const form = useForm<FileUploadSchema>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      language: "en-US" as const,
      voice: "",
    },
  });

  const handleProcess = async (data: FileUploadSchema) => {
    const { file, voice, language } = data;

    if (!file) return;

    setMessages({
      message: "Creating a summary of the document...",
      ai: false,
    });

    try {
      setIsLoading(true);
      const response = await ttsService.postTTS({ file, voice, language });

      const audioBlob = base64ToBlob(response.audio, "audio/mpeg");
      const audioUrl = URL.createObjectURL(audioBlob);
      const message = response.summary;

      setMessages({
        message: message.text,
        ai: message.ai,
      });

      setFiles({
        id: file.name,
        audioName: file.name,
        audioUrl,
      });

      form.reset();

      toast.success("Document processed successfully");
      onHasProcessed();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to process document");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleProcess)} className="space-y-4">
        <FormItem>
          <FormLabel htmlFor="voice">Select a voice</FormLabel>
          <FormControl>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Joanna">Joanna</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="file">Select a file</FormLabel>
          <FormControl>
            <FileDropzone
              onFileAccepted={(file) => form.setValue("file", file)}
            />
          </FormControl>
        </FormItem>

        {form.getValues("file") && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {form.getValues("file").name}
          </p>
        )}
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!form.getValues("file") || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Processing..." : "Process Document"}
        </Button>
      </form>
    </Form>
  );
};

export default FileUploaderSection;
