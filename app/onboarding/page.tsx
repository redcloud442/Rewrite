import OnBoardPage from "@/components/OnBoarding/OnBoardPage";
import { formService } from "@/services/form/form-service";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { getToken } = await auth();

  const token = await getToken();

  const form = await formService.specificFormPage({
    formId: "af13e8f7-06b8-42d1-a770-56d2efd13114",
    token: token || "",
  });

  return <OnBoardPage form={form} />;
};

export default page;
