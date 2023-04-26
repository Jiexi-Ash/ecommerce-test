import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { User } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { prisma } from "~/server/db";

type UnwantedKeys =
  | "emailAddresses"
  | "firstName"
  | "lastName"
  | "primaryEmailAddressId"
  | "primaryPhoneNumberId"
  | "phoneNumbers";

// The code defines a UserInterface type that extends the User type, but removes some properties using the Omit utility type.
interface UserInterface extends Omit<User, UnwantedKeys> {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  primary_email_address_id: string;
  first_name: string;
  last_name: string;
  primary_phone_number_id: string;
  phone_numbers: {
    phone_number: string;
    id: string;
  }[];
}

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
  const { id } = evt.data;
  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    //  extracts the email_addresses, primary_email_address_id, first_name, and last_name properties from the data
    const { email_addresses, primary_email_address_id, first_name, last_name } =
      evt.data;

    // searches for the primary email address object in the email_addresses array using the primary_email_address_id, and retrieves the email address.
    const emailObject = email_addresses.find((email) => {
      return email.id === primary_email_address_id;
    });

    if (!emailObject) {
      return res.status(400).json({
        error: "Primary email address not found",
      });
    }

    const { email_address } = emailObject;

    try {
      const existingUser = await prisma.profile.findUnique({
        where: {
          email: email_address,
        },
      });

      // If a user with the same email address already exists, the code returns a 200 response.
      if (existingUser) {
        return res.status(200).json({});
      }

      // If a user with the same email address does not exist, the code creates a new user in the database.
      await prisma.profile.create({
        data: {
          userId: id,
          email: email_address,
          firstName: first_name,
          lastName: last_name,
        },
      });
      console.log(`Created user ${id}`);
      return res.status(200).json({});
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error,
      });
    }
  }

  console.log(`Received ${eventType} event for user ${id}`);
  res.status(200).json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
  data: UserInterface;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";
