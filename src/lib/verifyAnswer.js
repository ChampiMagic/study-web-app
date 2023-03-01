import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: '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'
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
  console.log({ prompt })
  console.log(response.data.choices[0].text)
  return response.data.choices[0].text.toLowerCase().includes('true')
}
