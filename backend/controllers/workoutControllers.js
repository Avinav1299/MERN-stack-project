const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" })
  }
}

// GET single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findById(id)

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(500).json({ error: "Error fetching workout" })
  }
}

// CREATE workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  // validation
  if (!title || !load || !reps) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(201).json(workout) // 201 = created
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findByIdAndDelete(id)

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(500).json({ error: "Error deleting workout" })
  }
}

// UPDATE workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true } // 🔥 important
    )

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}