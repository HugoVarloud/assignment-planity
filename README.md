<h1>Zip Generator</h1>

About the Project: 📚
The purpose of this test is to evaluate skills in React interface development and Node.js API, as well as the ability to efficiently handle a CSV file. The candidate must create a user interface for uploading a CSV file, send it to a Node.js API that processes the file, and then return the zipped result to the client.

The CSV file is available at that link: https://drive.google.com/file/d/1MG0MoczOYM-UoFsEQN8ThRyyG3aH4v4Y/view?usp=sharing

## Front-End Section (React)

- Create a simple React interface with a single page containing a CSV file upload form.
- Display a progress indicator during the file upload.
- Manage upload errors by displaying an appropriate error message.

## Back-End Section (Node.js)

- Set up a Node.js API with a route to receive the CSV file.
- The route should be capable of efficiently handling a CSV file.
- The file should be separated into two CSV files based on gender.
- The result must be compressed (zipped) before being sent back to the client.
- Manage errors.

Screenshots: 📷
<img width="1440" alt="Capture d’écran 2024-09-25 à 12 03 24" src="https://github.com/user-attachments/assets/6a83bd60-50aa-42e8-bd84-b8af8f9dbce5">

Technologies Used: ☕️ 🐍 ⚛️
List the tools and technologies used to build this project :
-Node
-React
-Vite
-Dependencies :
-Axios
-Multer
-Adm-Zip
-Mui

Setup / Installation: 💻
Dans /planity/server - cli : npm run start 
Dans /planity/client - cli : npm run dev 

Approach: 🚶
Server side : I created a classic 3 layer server (routes, controllers, services) with express including a zipfile and cleaning service to make sure I send back the archive without storing unecessory files.
Client side : At first I wanted to handle the progress bar to be depending on the state of my slices but I encountered serialisation problems due to the type of data that I was manipulating (blob) so I choose what I think is a simpler approach.
I handle the progress bar in the component now. I am sure there is a way to handle it using slices but I decided no to follow that approach.

Status: 📶
Almost done but still in progress.

Credits: 📝
Assignment provided by Planity.

License: ©️
Code By Hugo.
