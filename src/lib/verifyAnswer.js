import axios from 'axios'

export const verifyAnswer = async (question, answer, config) => {
  try {
    const response = await axios.get(`/verify-card?question=${question}&answer=${answer}`, config)

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
