import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export const verifyAnswer = async (question, answer) => {
  const prompt = `Question: ${question}\nAnswer: ${answer}\nIs the answer correct? True or false.`
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 7,
    temperature: 0
  })
  return response.data.choices[0].text.toLowerCase().includes('true')
}
