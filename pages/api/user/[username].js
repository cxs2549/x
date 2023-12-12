// 3. Create the API endpoint (pages/api/user/[username].js)
import connectDB from '@/app/db';
import User from '@/models/User';

const handler = async (req, res) => {
  const { method, query: { username } } = req;

  await connectDB(); // Establish MongoDB connection

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user' });
      }
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
};

export default handler;
