import { serve } from "inngest/express";
import { inngest } from "./client.js";

import { expireFoods } from "./functions/expireFoods.js";
import { cleanupExpiredFoods } from "./functions/cleanupExpiredFoods.js";

export const inngestHandler = serve({
  client: inngest,
  functions: [
    expireFoods,
    cleanupExpiredFoods,
  ],
});