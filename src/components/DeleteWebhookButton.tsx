"use client";

import React from "react";
import { Button } from "./Button";
import { revalidatePath } from "next/cache";

interface Props {
  id: string;
}

export function DeleteWebhookButton({ id }: Props) {
  async function handleClick() {
    await fetch(`/api/webhooks/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
  }

  return (
    <Button theme="danger" onClick={handleClick}>
      Delete
    </Button>
  );
}

export default DeleteWebhookButton;
