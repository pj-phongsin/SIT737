# Step by Step Guide
1. Prerequisites:
   - Ensure that you have Node.jsand npm on your system
2. Clone the Repository:
   - CloneGitHub repo to your local machine
     ```
     git clone https://github.com/pj-phongsin/SIT737/tree/main/sit737-2025-prac4p
     ```
3. Navigate to the Project Directory
   - Change your current directory to the project folder
4. Install Dependencies:
   - Install the required Node.js packages
     ```
     npm install
     ```
5. Start Microservice
   - Run server using Node.js
     ```
     node index.js
     ```
   - The server will start, and you should see the message: "hello i'm listening to port 3040"
6. Test the API Endpoints
   - You can test the API endpoint using a web browser
   - You can change num1 and num2 up to your preference
       - Addition:
         URL: http://localhost:3040/add?num1=5&num2=3
       - Substraction:
         URL: http://localhost:3040/sub?num1=10&num2=4
       - Multiplication:
         URL: http://localhost:3040/mul?num1=6&num2=7
       - Division:
         URL: http://localhost:3040/div?num1=20&num2=4
   - Additional for Task 4.2C Advanced arithmetic operations 
       - Exponentiation
         URL: URL: http://localhost:3040/exp?num1=4&num2=2
         This Mean 4^2
       - Square root
         URL: URL: http://localhost:3040/sqrt?num1=25
         Square root only need one value
       - Modulo
         URL: URL: http://localhost:3040/div?num1=20&num2=3
         
7. Check the Logs
   - The microservice uses winston for logging
   - Error logs are stored in error.log
   - General logs are stored in combined.log
