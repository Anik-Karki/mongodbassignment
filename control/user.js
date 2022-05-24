//utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel from '../models/User.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          address: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { firstName, lastName,address} = req.body;
      const location = req.body.location;
      const user = await UserModel.createUser(firstName, lastName,address, location);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({ 
        success: true, 
        message: `Deleted a ${user.deletedCount} user.` 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
}