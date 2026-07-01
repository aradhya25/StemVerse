const bcrypt = require("bcryptjs");

const {
  getUserById,
  getUserWithPassword,
  updateProfile,
  changePassword,
} = require("../models/User");
exports.getProfile = async (req, res) => {
  try {

    const user = await getUserById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await updateProfile(
      req.user.id,
      name
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // 1. Check new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // 2. Get user with password
    const user = await getUserWithPassword(req.user.id);

    // 3. Compare current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // 4. Prevent same password
    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    // 5. Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // 6. Save
    await changePassword(
      req.user.id,
      hashedPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};