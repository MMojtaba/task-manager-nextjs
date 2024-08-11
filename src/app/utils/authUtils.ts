import { auth } from "../auth/auth";

export async function getLoggedInUserId() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (userId) return userId;
    else return null;
  } catch (err) {
    console.error("Error getting logged in user's id", err);
  }
}

export async function getLoggedInUserEmail() {
  try {
    const session = await auth();
    const userId = session?.user?.email;
    if (userId) return userId;
    else return null;
  } catch (err) {
    console.error("Error getting logged in user's email", err);
  }
}
