import { config } from "dotenv";
config();
import { connectDB } from "../src/lib/db.js";
import Message from "../src/models/message.model.js"; // adjust path if needed
const deleteAllMessages = async () => {
  try {
    await connectDB(); // connect to MongoDB
    const result = await Message.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} messages.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error deleting messages:", err.message);
    process.exit(1);
  }
};

deleteAllMessages();