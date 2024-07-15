import { auth } from "@/app/auth/auth";
import AuthButton from "./_components/AuthButton.server";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Home page!</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthButton />
    </main>
  );
}
