const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please fill in all fields' })

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' })

    const user = await User.create({ name, email, password })
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message)
      return res.status(400).json({ message: messages[0] })
    }
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Please enter email and password' })

    const user = await User.findOne({ email }).select('+password')
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' })

    const isMatch = await user.matchPassword(password)
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' })

    const token = generateToken(user._id)

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { registerUser, loginUser, getMe }