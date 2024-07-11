import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class ChatGptService {
	
    // prompt: the prompt we send to chatgpt
    // completion: the answer chatgpt provides
    // token: גודל מידע ששוה בערך ל-4 תווים, משמש למציאת התשובה, קיימת הגבלה מבחינת כמות הטוקנים שניתן לשלוח
    // model: האלגוריתם המשמש לצ'אט

    public async chat(prompt: string): Promise<string> {

        const body = {
            model: "gpt-3.5-turbo",
            max_tokens: 4096,
            messages: [
                { role: "system", content: "You are a programming technology expert" }, // ChatGPT Personality
                { role: "user", content: prompt }
            ]
        };

        const options = {
            headers: {
                Authorization: "Bearer " + appConfig.chatGptApiKey // don't forget the space after the word Bearer
            }
        };

        const response = await axios.post(appConfig.chatGptUrl, body, options);
        
        const completion = response.data.choices[0].message.content;

        return completion
    }
}

export const chatGptService = new ChatGptService();
