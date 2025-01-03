# How to set up and run KYC Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Access the application Using Public Hosted Link

Open the application in your web browser:
### `https://react-js-intensive-adhoc-assignment.vercel.app/`

## Run the app locally

Clone the code from GitHub repository:

### `git clone https://github.com/HnKnA/ReactJS-Intensive-Adhoc-Assignment.git`

Install necessary dependencies:

### `npm install`

Launch the application:

### `npm start`

Access the application at `http://localhost:3000/`.


## Note:
### Unit test:
- There is currently 1 unit test for the "Login" page in the `Login.test.tsx` and you can run it with __`npm test`__.
- After that press `a` to run all tests.
<img width="606" alt="image" src="https://github.com/user-attachments/assets/cec1f0d7-4588-4953-a494-59780ef092d3" />

- If the test do not run successfully, you can try configure vs update your `@testing-library/dom` or `@testing-library/user-event` libraries.

### Privilaged user:
- Access as "normal user" by log in with ***email:*** `anhtuan@gmail.com` and ***password:*** `User@123456!`.

- Access as "officer" by log in with ***email:*** `admin@gmail.com` and ***password:*** `Officer@123456!`.

- There is currently one user for each role, but you can access the source code to add more mock users for experimentation.

<img width="403" alt="image" src="https://github.com/user-attachments/assets/e5f2fe15-a2fd-47fe-bf79-21d16d856bcf" />

### RBAC:
- Users cannot access pages related to other users.
- Users cannot access pages restricted to officers.
- Only officers can access the Review page.
- Officers can access all user pages.

> For example: 
- An user with the name "tuan" can not access "/pages/user/___anhtuan___/pi".
- An user with the name "tuan" can not access "/pages/___review___".
- Officers can access "/pages/user/___anhtuan___/pi" or "/pages/user/___hailan___/pi" if these 2 users exist; otherwise, a "User not found" toast will be displayed.

### Side pages:
- The 'Forgot Password' and 'Sign Up' pages are designed for viewing and filling in inputs only, with the submit button disabled.

<img width="543" alt="image" src="https://github.com/user-attachments/assets/39a450da-3465-475c-9224-020f30d6da1b" />

<img width="489" alt="image" src="https://github.com/user-attachments/assets/24901437-0e07-48c3-b2a2-f7534f90bc7e" />


### Add vs Update image field (User mode):
- This is just a mock functionality; no API is called during the process. The delay and picture changes are artificial, designed to simulate an API call.
<img width="382" alt="image" src="https://github.com/user-attachments/assets/3524a735-ef25-48bd-b282-ba6d8d3aef63" />

## Services:
### Personal Information page:
- Normal users can try or experiment with the update images functionality.
- Fields are read-only for both users and officers. (In reality, users will update their information on the 'Edit' page, and the updated info will be displayed on this page.) This page is primarily for displaying information.

<img width="876" alt="image" src="https://github.com/user-attachments/assets/e7a9a2de-4bbf-45a4-a4c2-c225845ee5db" />
<img width="766" alt="image" src="https://github.com/user-attachments/assets/dbc2b830-c3d0-4236-a32d-f64ecace7537" />


### Edit Personal Information page:
- Users can fill in multiple input fields to add or update their information here.
- A "POST" API request will be sent when they click the "Submit" button, and a success message will be displayed.
- Officers operate in read-only mode and can view the information of a user, which is retrieved via a "GET" API.
<img width="826" alt="image" src="https://github.com/user-attachments/assets/43d81f0c-f9ee-4d66-a67c-008bd717b5a7" />
<img width="741" alt="image" src="https://github.com/user-attachments/assets/f5e08b15-db8d-4afb-8f3f-4a7c2b364097" />


### KYX page:
- Follows the same logic as the Edit Personal Information page.

### Review page:
- Accessible only by officers.
- Uses the same API to accept or reject a review.
- Allows access to the user information page by clicking on a user's name.

## I will also update many comments later for the ease or reading code.
