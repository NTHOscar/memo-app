'use client'
import { useState} from 'react'
import styles from './Chat.module.css'

export default function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('response from AI!');
    const handleSubmit = async(event) => {
      event.preventDefault();
      if(userInput.trim() === '') {
        return;
      }
      console.log('User input:', userInput);
      setLoading(true);
      
      try {
        const res = await fetch("api/langchain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            prompt: userInput,
            })
        });
        const AIResponse = await res.json();
        console.log(AIResponse);
        console.log(AIResponse.API);
        console.log(AIResponse.result);
        setResponse(AIResponse.result);
        // Reset user input field
        setUserInput('');
      } catch (error) {
        console.log('Error occurred when sending input to AI', error);
        window.alert('Error occurred when sending input to AI', error);
      }
      setLoading(false);
      setUserInput('');
    };

    return(
        <div>
            <h1>This is a chatbot</h1>
            <div className="chatContainer">
                <div className={styles.chat}>
                    {/* text in e.g chat history */}
                    {response}
                    {/* {userInput} */}
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        disabled={loading}
                        // onKeyDown={handleEnter}
                        // ref={textAreaRef}
                        autoFocus={false}
                        rows={2}
                        maxLength={512}
                        id="userInput" 
                        name="userInput" 
                        placeholder={loading? "Waiting for response..." : "Type your question..."}  
                        value={userInput} 
                        onChange={e => setUserInput(e.target.value)} 
                        // className={styles.textarea}
                    />
                    <button 
                        type="submit" 
                        disabled = {loading}
                        // className = {styles.generatebutton}
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}