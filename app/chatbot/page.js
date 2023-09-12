'use client'
import { useState} from 'react'

export default function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform actions with user input (e.g., send it to a chat API)
      console.log('User input:', userInput);
      // Reset the user input field
      setUserInput('');
    };

    return(
        <div>
            <h1>This is a chatbot</h1>
            <div className="chatContainer">
                <div className="chat">
                    {/* text in e.g chat history */}
                    {userInput}
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        disabled={loading}
                        // onKeyDown={handleEnter}
                        // ref={textAreaRef}
                        autoFocus={false}
                        rows={1}
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