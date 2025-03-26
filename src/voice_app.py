from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from groq import Groq
from database_config import *
from textprocess import get_customer_query
from sentiment_analysis import analyze_query_sentiment

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow requests from React frontend

    # Set API key
    os.environ["GROQ_API_KEY"] = "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"
    client = Groq()

    def speech2text(filename):
        with open(filename, "rb") as file:
            translation = client.audio.translations.create(
                file=(filename, file.read()),
                model="whisper-large-v3",
                response_format="text",
                temperature=0.0
            )
            return translation

    @app.route("/submit", methods=["POST"])
    def submit_transcript():
        data = request.get_json()
        transcription = data.get("transcript")

        if not transcription:
            return jsonify({"error": "No transcript provided"}), 400

        try:
            setup_database()
            sen = analyze_query_sentiment(transcription)
            interaction = (
                generate_interaction_id(),  # interaction_id (UUID)
                "user_1",                 # user_id
                "chat",                     # channel
                get_current_timestamp(),    # timestamp
                f"User: {transcription}\n",  # message_logs
                get_customer_query(transcription, keyword_extraction=True),  # issue_description
                sen[0],
                sen[1],
            )
            insert_interaction(interaction)
            print(interaction)

            return jsonify({"message": "Transcript processed successfully!"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=5001, use_reloader=False)