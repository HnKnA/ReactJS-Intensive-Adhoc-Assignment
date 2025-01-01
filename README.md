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

### Add or Update image field:
- Only the CREATE product API is available at the moment, and it does not affect the product list after successfully creating a product. Therefore, you can add an arbitrary string to replace this field in the form.

- This functionality will be updated as soon as the user's role feature is implemented.

![image](https://github.com/user-attachments/assets/4cbd2afa-85da-40a2-87c6-9458dc10f522)

### Order page:
- For the time being, every user is treated as "normal user", meaning each person can only access and complete their own orders. However, with "fake admin" privilege in place, only the following username can acccess the page and view their orders [`tuan`, `spring`, `summer`, `autumn`, `winter`].

- Usernames outside of this list can not access /order page normally.

## Services:
### Product page:
![image](https://github.com/user-attachments/assets/f4715b4a-e327-4765-a4d9-0b60f25583be)
- Search bar is unavailable.
- Filter products based on their category (Javascript implemented).
- Create Order.
- Add, View, Edit, Delete (Product).

### Order page (fake admin privilege):
![image](https://github.com/user-attachments/assets/ac6a3884-2ce0-405a-9218-9b5c364416b4)
- Complete pending orders.
- View personal orders.
- Can not view all orders of all users because there is no admin at the moment.

### User page (fake admin privilege): 
![image](https://github.com/user-attachments/assets/49819f8a-2819-4886-bd2d-91f07983f3e8)
- Search/Filter users

### Account page (click on your username on the header):
![image](https://github.com/user-attachments/assets/4a76292b-9059-4e57-945c-90ca9df88ed6)
- Readonly form

### Register, Login, Verify.
### Light/Dark theme (sun icon on the header). 
### Log out.

## I will also update many comments later for the ease or reading code.
