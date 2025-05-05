import { fileUploadSchema, FileUploadSchema } from "@/lib/schema";
import { ttsService } from "@/services/tts/tts-service";
import { useIsLoadingStore } from "@/store/isLoadingStore";
import { useMessageStore } from "@/store/messageStore";
import { File } from "@/types/types";
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
  setFiles: (file: File) => void;
  selectedRecordingId: string | null;
};

const FileUploaderSection = ({
  onHasProcessed,
  setFiles,
  selectedRecordingId,
}: Props) => {
  const { sendMultipleMessages, setAllMessages } = useMessageStore();
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

    try {
      setIsLoading(true);

      const { audio, summary } = await ttsService.postTTS({
        file,
        voice,
        language,
      });

      const messages = [
        { message: "Creating a summary of the document...", ai: false },
        { message: summary.text, ai: summary.ai },
      ];

      const updateMessages = selectedRecordingId
        ? setAllMessages
        : sendMultipleMessages;

      updateMessages(messages);

      setFiles({
        id: audio.id,
        audioName: audio.audioName,
        audioUrl: audio.audioUrl,
      });

      form.reset();

      toast.success("Document processed successfully");
      onHasProcessed();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to process document";
      toast.error(message);
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
          disabled={!form.watch("file") || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Processing..." : "Process Document"}
        </Button>
      </form>
    </Form>
  );
};

export default FileUploaderSection;
