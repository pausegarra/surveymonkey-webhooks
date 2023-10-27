import Heading from "@/components/Heading";
import TokenForm from "@/components/TokenForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function HomePage() {
  const cookie = cookies().get("smwm_token");

  if (cookie) {
    redirect("/webhooks");
  }

  return (
    <>
      <Heading subTitle="Insert your API token"></Heading>
      <TokenForm />
    </>
  );
}

export default HomePage;
