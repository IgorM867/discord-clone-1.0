import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return <div>SignInPage</div>;
}
