# assignment_template

## PROJECT TITLE:

### User Authentication System with SignUp & SignIn Using ReactJS for Frontend and Springboot for Backend.

## OBJECTIVE:

### Build a basic user authentication system with a SignUp form that stores user data in the database and a SignIn form that validates credentials and allows to login.

## FUNCTIONAL REQUIREMENTS:

`SignUp Form:`
| Field | Type | Validation |
|-------------|----------|---------------------------------|
| First Name | Text | Required |
| Last Name | Text | Required |
| Email | Email | Required, must be unique |
| Address | Text | Optional |
| Password | Password | Required, minimum 6 characters |

• On submit → Send data to backend API
• Backend checks if email already exists
If exists → return error
If not exists → save user to DB

`SignIn Form:`
| Field | Type | Validation |
|----------|----------|------------|
| Email | Email | Required |
| Password | Password | Required |

• On submit → Send to /login API
• If credentials match → login successful (return message or token)
• If invalid → return error (email not found or password mismatch)

TECH STACK
• Frontend: ReactJS
• Backend: Spring Boot || I used Node JS
• Database: MySQL/MongoDb || MongoDB and moongoos 
