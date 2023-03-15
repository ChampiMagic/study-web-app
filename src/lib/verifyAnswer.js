import axios from 'axios'

export const verifyAnswer = async (answer1, answer2, config) => {
  try {
    const response = await axios.get(`/verify-card?answer1=${answer1}&answer2=${answer2}`, config)

    const isCorrect = response.data.body.isCorrect

    return { isCorrect }
  } catch (err) {
    console.error('Error: Card Verification')
    if (err.response.data) {
      return { isCorrect: false, errorMessage: err.response.data.message }
    }
    return { isCorrect: false, errorMessage: err.message }
  }
}
