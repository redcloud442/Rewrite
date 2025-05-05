import { MessageCircle, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type FilePlayPageCardProps = {
  audioUrl: string;
  fileName: string;
  recordingId: string;
  handleViewPastMessages: (recordingId: string) => void;
};

const FilePlayPageCard = ({
  audioUrl,
  fileName,
  recordingId,
  handleViewPastMessages,
}: FilePlayPageCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <Card
      onClick={() => handleViewPastMessages(recordingId)}
      className="my-4 relative group cursor-pointer overflow-hidden"
    >
      <CardHeader>
        <CardTitle>{fileName}</CardTitle>
      </CardHeader>
      <CardContent className="space-x-2">
        {isPlaying ? (
          <Button onClick={handleStop}>
            <Pause className="w-4 h-4 mr-2" /> Stop Audio
          </Button>
        ) : (
          <Button variant="outline" onClick={handlePlay}>
            <Play className="w-4 h-4 mr-2" /> Play Audio
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => handleViewPastMessages(recordingId)}
        >
          <MessageCircle className="w-4 h-4 mr-2" /> View Past Messages
        </Button>
      </CardContent>

      {/* Floating overlay */}
    </Card>
  );
};

export default FilePlayPageCard;
