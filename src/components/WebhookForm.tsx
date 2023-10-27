"use client";

import Loading from "@/app/webhooks/loading";
import { SelectInput, TextInput, TransferList } from "./FormComponents/index";
import { eventTypes } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { localApiService } from "@/services/LocalApiService";
import { httpErrorNames } from "@/utils/httpErrorCodes";
import { revalidatePath } from "next/cache";

interface Props {
  initData?: Omit<Webhook, "href" | "object_type"> | null;
}

export function WebhookForm({ initData }: Props) {
  const [selected, setSelected] = React.useState<string[]>(
    initData?.object_ids || [],
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [data, setData] = React.useState<
    Omit<Webhook, "id" | "href" | "object_ids" | "object_type">
  >(
    initData || {
      name: "",
      subscription_url: "",
      event_type: "",
    },
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.currentTarget;
    setData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (!initData) return;

    try {
      await localApiService.updateWebhook(
        initData.id,
        data.name,
        data.subscription_url,
        data.event_type,
        selected,
      );
      router.push("/webhooks");
    } catch (err: any) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.error.error.error.message,
        customClass: {
          container: "bg-dark text-primary",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await localApiService.createWebhook(
        data.name,
        data.subscription_url,
        data.event_type,
        selected,
      );
      router.push("/webhooks");
    } catch (err: any) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.error.error.error.message,
        customClass: {
          container: "bg-dark text-primary",
        },
      });
    } finally {
      setIsLoading(false);
    }

    // if (!initData) {
    //   // response = await fetch('/api/webhooks', {
    //   //   method: 'POST',
    //   //   body: JSON.stringify({
    //   //     ...data,
    //   //     selected
    //   //   })
    //   // });
    // } else {
    //   // response = await fetch(`/api/webhooks/${initData.id}`, {
    //   //   method: 'PUT',
    //   //   body: JSON.stringify({
    //   //     ...data,
    //   //     object_ids: selected
    //   //   })
    //   // });
    // }

    // const resData = await response.json();
    // if (!response.ok)
    // return Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: resData.error.error.message,
    //   customClass: {
    //     container: 'bg-dark text-primary'
    //   }
    // });

    // router.push('/webhooks');
  }

  return (
    <form onSubmit={!initData ? handleCreate : handleUpdate}>
      <TextInput
        required={false}
        name="name"
        label="Name"
        onChange={handleChange}
        value={data.name}
      />
      <TextInput
        required={false}
        type="url"
        name="subscription_url"
        label="Subscription URL"
        onChange={handleChange}
        value={data.subscription_url}
      />
      <SelectInput
        required={false}
        label="Event type"
        name="event_type"
        options={eventTypes}
        onChange={handleChange}
        value={data.event_type}
      />
      <TransferList selected={selected} setSelected={setSelected} />
      <div className="mt-9 text-center">
        {!isLoading ? (
          <input
            type="submit"
            value={!initData ? "Create webhook" : "Edit webhook"}
            className="bg-primary hover:text-primary border-primary cursor-pointer rounded-md border px-4 py-2 text-black duration-200 ease-in-out hover:bg-black"
          />
        ) : (
          <Loading />
        )}
      </div>
    </form>
  );
}
