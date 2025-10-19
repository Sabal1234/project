import User from '../models/user.js';
export const registerUser = async (req, res) => {
  try {

      const { username, password } = req.body;
if (!username || !password) {
  return res.status(400).json({ message: "Username and password are required" });
}
        const newUser = await User.create(username,password);
        res.status(201).json({
            message: 'new user created',
            user: newUser
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
           if (!user) {
            return res.status(401).json({ status: false, message: "Invalid email or password." });
        }
        const isMatch = await User.checkPassword(password,user.password_hash);
    if (isMatch) {
      const token = jwt.sign(
        { userId: user.id, username: user.user_name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
          res.json({
        message: 'Login successful',
        token: token,  
        user: { id: user.id, username: user.user_name }
      });
        } else {
            return res
                .status(401)
                .json({ status: false, message: "Invalid email or password" });
        }

    } catch (error) {
          return res.status(400).json({ message: error.message });
    }
}
 export const deleteUser= async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.delete(id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json({ 
        message: 'User deleted successfully', 
      });
    } catch (error) {
      res.status(400).json({status:false, message: error.message });
    }
}
   export const getAllUsers= async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ status:false,message: error.message });
    }
}
 

