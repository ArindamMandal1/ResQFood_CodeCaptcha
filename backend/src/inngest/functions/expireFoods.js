import { inngest } from "../client.js";
import FoodPost from "../../models/foodPost.js";
import { getIO } from "../../socket/socketHandler.js";

export const expireFoods = inngest.createFunction(
  { id: "expire-foods" },
  { cron: "*/2 * * * *" }, // every 2 minutes
  async () => {
    console.log("CRON JOB TRIGGERED at", new Date().toISOString());
    const now = new Date();

    const expiredPosts = await FoodPost.find({
      expiry_time: { $lte: now },
      status: { $in: ["available", "claimed"] },
    }).select("_id");

    if (!expiredPosts.length) return;

    await FoodPost.updateMany(
      { _id: { $in: expiredPosts.map(p => p._id) } },
      {
        status: "expired",
        expiredAt: now,
      }
    );

    const io = getIO();
    io.emit("food_expired", {
      ids: expiredPosts.map(p => p._id.toString()),
    });

    console.log("Expired foods:", expiredPosts.length);
  }
);