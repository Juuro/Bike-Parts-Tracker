"use server";
import { request, gql } from "graphql-request";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function deleteInstallation(installationId: string) {
  const session = await auth();

  const userId = session?.userId;

  console.log("deleteInstallation");

  const accessToken = session?.accessToken;

  const query = gql`
    mutation DeleteInstallation {
      delete_installation_by_pk(id: "${installationId}") {
        id
      }
    }
  `;

  const data = await request(
    process.env.AUTH_HASURA_GRAPHQL_URL!,
    query,
    {},
    {
      authorization: `Bearer ${accessToken}`,
    }
  );

  try {
    await revalidatePath(`/`, "layout");
  } catch (error) {
    console.error(error);
  }
}

export default deleteInstallation;
