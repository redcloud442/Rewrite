import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type FilePlayPageCardProps = {
  audioUrl: string;
  fileName: string;
};

const FilePlayPageCard = ({ audioUrl, fileName }: FilePlayPageCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false); // reset when audio ends
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
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{fileName}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {isPlaying ? (
          <Button onClick={handleStop}>
            <Pause className="w-4 h-4 mr-2" /> Stop Audio
          </Button>
        ) : (
          <Button variant="outline" onClick={handlePlay}>
            <Play className="w-4 h-4 mr-2" /> Play Audio
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FilePlayPageCard;
