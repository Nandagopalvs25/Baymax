# Baymax - Alzheimer's Patient Healthcare Companion

Baymax is a RAG (Retrieval-Augmented Generation) based healthcare application built for Alzheimer's patients. It integrates the Gemini API to facilitate natural conversations with an AI model, allowing patients to query their past interactions. Users can also upload documents, and the system automatically generates daily summaries, which are emailed to their caretakers.

View the project ==> https://youtu.be/p6WMqLtJLS0
## Features
- AI-driven conversational interface for Alzheimer's patients
- Document upload and retrieval system
- Daily summaries sent to caretakers
- API designed using Django and Python

## Backend Highlights
As the backend developer, I focused on:
- Designing and implementing the API using Django
- Integrating the Gemini API for conversation handling
- Storing user messages and documents
- Automating the summarization and email system
- Ensuring secure data persistence and retrieval

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Nandagopalvs25/Baymax.git
   ```
2. Navigate to the backend directory:
   ```bash
     cd Baymax/backend
   
    ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt

   ```
4. Run the Django server:
   ```bash
   python manage.py runserver
   ```


   ## Technologies Used
- **Django and DjangoRest**: For API design and database management
- **Python**: Core language for backend logic
- **Gemini API**: For AI integration
- **SMTP**: For sending daily email summaries

