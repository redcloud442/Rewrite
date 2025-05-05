"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiModelService } from "@/services/ai-model/ai-model-service";
import { ttsService } from "@/services/tts/tts-service";
import { useFileStore } from "@/store/fileStore";
import { useIsDoneTypingStore } from "@/store/isDoneTypingStore";
import { setAllMessages, useMessageStore } from "@/store/messageStore";
import { Recording } from "@/types/types";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem } from "../ui/form";
import { MessageBubble } from "../ui/message-bubble";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import FilePlayPageCard from "./FilePlayPageCard";
import FileUploaderSection from "./FileUploaderSection";

type FormData = {
  message: string;
};

type Props = {
  recordings: Recording[];
};
const FileUploaderPage = ({ recordings }: Props) => {
  const { files, setFiles, setInitialFiles } = useFileStore();
  const { messages, setMessages } = useMessageStore();
  const { isDoneTyping } = useIsDoneTypingStore();

  const [hasProcessed, setHasProcessed] = useState<boolean>(false);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(
    null
  );
  const [generatingPastMessages, setGeneratingPastMessages] =
    useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  });

  const handleSendMessage = async (data: FormData) => {
    try {
      if (!data.message.trim() || !isDoneTyping) return;

      const message = {
        ai: false,
        message: data.message,
      };

      setMessages(message);
      form.reset();

      const response = await aiModelService.askAI({
        message: data.message,
        selectedRecordingId,
      });

      const aiMessage = {
        ai: response.ai,
        message: response.text,
      };

      setMessages(aiMessage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHasProcessed = () => {
    setHasProcessed(true);
    setSelectedRecordingId(null);
  };

  const handleGeneratePastMessages = async (recordingId: string) => {
    try {
      if (selectedRecordingId === recordingId) return;

      setGeneratingPastMessages(true);
      const pastMessages = await ttsService.getPastMessages({
        take: 15,
        skip: 1,
        recordingId,
      });

      setSelectedRecordingId(recordingId);
      setAllMessages(pastMessages);
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingPastMessages(false);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (recordings.length > 0) {
      setInitialFiles(recordings);
    }
  }, []);

  const isProcessing =
    form.formState.isSubmitting || !hasProcessed || !isDoneTyping;

  const hasSelectedRecording = selectedRecordingId !== null;

  const isDisabled = !hasSelectedRecording ? isProcessing : false;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      {/* LEFT SIDE: File uploader */}
      <Card className="col-span-1 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5" /> Upload Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploaderSection
            onHasProcessed={handleHasProcessed}
            setFiles={setFiles}
            selectedRecordingId={selectedRecordingId}
          />

          {files.length > 0 && (
            <>
              <Separator className="my-4" />
              <ScrollArea className="h-[485px]">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-bold text-muted-foreground">
                    Audio files uploaded
                  </h1>
                  <Button variant="outline" size="sm">
                    View all
                  </Button>
                </div>
                {files.map((file, idx) => (
                  <FilePlayPageCard
                    key={idx}
                    audioUrl={file.audioUrl || ""}
                    fileName={file.audioName || ""}
                    recordingId={file.id}
                    handleViewPastMessages={handleGeneratePastMessages}
                  />
                ))}
              </ScrollArea>
            </>
          )}
        </CardContent>
      </Card>

      {/* RIGHT SIDE: Notes + Chatbot */}
      <Card className="col-span-2 flex flex-col bg-white w-full min-h-[90vh]">
        <CardHeader>
          <CardTitle>Notes Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
            <div className="text-sm text-muted-foreground">
              Your notes will appear here after processing...
            </div>
          </div>

          {/* Chatbot */}
          <div className="border-t pt-4 flex flex-col gap-2 flex-1">
            <ScrollArea className="h-[500px]">
              <div className="flex flex-col gap-4">
                {messages.map((message, idx) =>
                  generatingPastMessages ? (
                    <div className="space-y-4" key={idx}>
                      <Skeleton className="w-full h-10" />
                      <Skeleton className="w-full max-w-[80%] h-10" />
                    </div>
                  ) : (
                    <MessageBubble
                      key={idx}
                      message={message}
                      isLatest={idx === messages.length - 1}
                      selectedRecordingId={selectedRecordingId}
                    />
                  )
                )}
                <div ref={chatContainerRef} />
              </div>
            </ScrollArea>
            <div className="flex gap-2 mt-auto w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSendMessage)}
                  className="space-y-4 flex gap-2 w-full"
                >
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...form.register("message")}
                        className="w-full"
                        placeholder="Ask something..."
                      />
                    </FormControl>
                  </FormItem>
                  <Button type="submit" disabled={isDisabled}>
                    {form.formState.isSubmitting ? "Sending..." : "Send"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploaderPage;
