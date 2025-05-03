"use server";

import { clerkClient } from "@clerk/nextjs/server";

export const updateMetadata = async (params: { userId: string }) => {
  const { userId } = params;
  if (!userId) {
    throw new Error("User not found.");
  }

  const client = await clerkClient();

  try {
    const result = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingComplete: false,
      },
    });

    console.log("Metadata updated:", result);

    return { success: true, message: "Metadata updated successfully." };
  } catch (error: unknown) {
    console.error("Metadata update failed:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Metadata update failed.",
    };
  }
};
