import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "resqfood-backend",
  eventKey: process.env.INNGEST_EVENT_KEY,
});