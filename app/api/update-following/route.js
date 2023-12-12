import User from "@/models/User";
import connectDB from "@/app/db";

export default async function handler(req, res) {
  await connectDB();
  try {
    if (req.method === "POST") {
      const { followerId, followeeId } = req.body;

      const follower = await User.findById(followerId);
      if (!follower) {
        return res.status(404).json({ message: "Follower not found" });
      }

      const followee = await User.findById(followeeId);
      if (!followee) {
        return res.status(404).json({ message: "Followee not found" });
      }

      // Check if the follower is already following the followee
      const isFollowing = follower.following.includes(followeeId);

      if (isFollowing) {
        // If already following, unfollow (remove from 'following' array)
        await User.findByIdAndUpdate(followerId, {
          $pull: { following: followeeId },
        });
        await User.findByIdAndUpdate(followeeId, {
          $pull: { followers: followerId },
        });

        res.status(200).json({ message: "Unfollowed successfully" });
      } else {
        // If not following, follow (add to 'following' array)
        await User.findByIdAndUpdate(followerId, {
          $addToSet: { following: followeeId },
        });
        await User.findByIdAndUpdate(followeeId, {
          $addToSet: { followers: followerId },
        });

        res.status(200).json({ message: "Followed successfully" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update following/followers" });
  }
}
