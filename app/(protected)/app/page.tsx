import FileUploaderPage from "@/components/FileUploaderPage/FileUploaderPage";
import { ttsService } from "@/services/tts/tts-service";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { getToken } = await auth();

  const token = await getToken();

  const data = await ttsService.getTTS({ token: token || "" });

  return <FileUploaderPage recordings={data} />;
};

export default page;
