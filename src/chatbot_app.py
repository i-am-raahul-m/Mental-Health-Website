from flask import Flask, render_template, request, jsonify
from groq import Groq
import os
from database_config import *
from textprocess import get_customer_query
from sentiment_analysis import analyze_query_sentiment
from flask_cors import CORS

def Chatbot_App(debug = False):
    # Set up the environment variable for the API key
    os.environ["GROQ_API_KEY"] = "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"

    # Initialize the Groq client
    client = Groq()

    app = Flask(__name__)
    CORS(app)

    # Route to serve the homepage with the chatbot interface
    @app.route('/')
    def home():
       return render_template('chatbot/index.html')

    # Route to handle the chat request and respond with the chatbot's reply
    @app.route('/chat', methods=['POST'])
    def chat():
        user_input = request.json['message']
        
        # Customize the system instruction based on customer service context
        system_message = """
You are a mental health support assistant designed to provide empathetic, non-judgmental, and supportive responses to individuals seeking help with emotional or mental health concerns. Your primary goal is to offer a listening ear, compassionate validation, and general guidance while always encouraging professional help when needed. Please follow these detailed guidelines:

1. **Empathy and Validation:**  
   - Always acknowledge and validate the user's feelings.  
   - Use empathetic language that shows understanding and care.  
   - Avoid judgmental statements and ensure that your tone is warm, respectful, and patient.

2. **Response Quality and Tone:**  
    - Ensure every response is thoughtful, compassionate, and tailored to the user’s expressed needs.  
    - Use language that is supportive, kind, and avoids triggering phrases.  
    - When uncertain about the best course of action, express empathy and gently encourage the user to consider seeking further help from trusted individuals or professionals.

Your responses should always reflect sensitivity to the complexities of mental health issues. If a situation appears to require professional or immediate crisis intervention, gently but firmly advise the user to seek help from qualified professionals or emergency services immediately.  
"""
        
        # Send query to Groq's chat model with the customized system instruction
        try:
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_input}
                ],
                model="llama3-8b-8192",  # Use your desired model
                temperature=0.5,
                max_tokens=1024,
                top_p=1,
                stop=None,
                stream=False,
            )
            
            bot_response = chat_completion.choices[0].message.content
        except Exception as e:
            bot_response = f"Error: {e}"

        setup_database()
        sen = analyze_query_sentiment(user_input)
        interaction = (
        generate_interaction_id(),  # interaction_id (UUID)
        "user_1",             # user_id
        "chat",                     # channel
        get_current_timestamp(),    # timestamp (to be generated)
        f"User: {user_input}\nBot: {bot_response}\n",  # message_logs
        get_customer_query(user_input, keyword_extraction = True),  # issue_description
        sen[0],
        sen[1],
        )
        insert_interaction(interaction)

        return jsonify({'response': bot_response})

    return app

if __name__ == '__main__':
    Chatbot_App().run(debug=True, port=5002, use_reloader=False)
