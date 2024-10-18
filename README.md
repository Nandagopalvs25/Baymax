# Baymax - Alzheimer's Patient Healthcare Companion

Baymax is a RAG (Retrieval-Augmented Generation) based healthcare companion designed for Alzheimer's patients. It facilitates natural conversations with an AI model powered by the Gemini API. All interactions are stored in a database, enabling patients to retrieve information whenever they forget something by simply asking Baymax. Users can also upload documents for the AI to reference. At the end of each day, Baymax generates a summary of the user’s conversations and activities, which is emailed to their caretaker.

View the project ==> https://youtu.be/p6WMqLtJLS0
## Developer Roles

### Frontend Developer
[@AmitStredz](https://github.com/AmitStredz)  

### Backend Developer
[@Nandagopalvs](https://github.com/Nandagopalvs25)  
## Features
- AI-driven conversational interface for Alzheimer's patients
- Document upload and retrieval system
- Daily summaries sent to caretakers
- API designed using Django and Python

## Backend Highlights

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

