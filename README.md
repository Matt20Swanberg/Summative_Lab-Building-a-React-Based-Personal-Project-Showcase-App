# Summative_Lab-Building-a-React-Based-Personal-Project-Showcase-App

## Summary
In this summative lab, you will design and develop a personal React-based project showcase application. Using the provided mock-up design document, you will build a single-page application (SPA) that adheres to modern frontend development practices. The application will demonstrate proficiency in Advanced React concepts such as state management through hooks, event handling, data fetching, and client-side routing. The lab reflects real-world challenges junior developers may face, preparing you to build scalable and interactive React applications.

## The Scenario
You are tasked with creating an administrator portal for an e-commerce website, which will include:

A landing page describing what the site is about.
A form page that allows for a new product to be added.
A product page that will show the product.
Allow the administrator to change different values of the product, such as price.
A search functionality that allows users to dynamically search for a product.
A responsive design that matches the mock-up.
By completing this lab, you will:
Introduce advanced state management techniques.
Implement client-side routing.
Manipulate data through a simulated backend to maintain persistence.
Test React components and interactions.

## Instructions
# Task 1: Define the Problem
Analyze the mock-up design document to understand the project requirements and layout.
Identify the necessary components and their hierarchy based on the design.
Determine the routes needed to manage page layout.
Build out a simulated backend within the db.json file.

# Task 2: Determine the Design
Create a component tree that outlines the structure of your application, including parent and child components.
Define state and prop relationships within the component tree.
Build mock data that will resemble a product.
The data for this e-commerce site will be up to you! You can make this site sell what you would like. Here is an example you can use to get yourself started.
{
 "store_info": [
    {
      "id": 1,
      "name": "Coffee R Us",
      "description": "The go to store for coffee",
      "phone_number": "555-5555"
    }
   ],
  "coffee": [
    {
      "id": 1,
      "description": "Medium Roast, nutty flavor",
      "name": "Vanilla bean",
      "origin": "Columbia",
      "price": 10.00
    },
    {
      "id": 2,
      "description": "Dark Roast, Rich flavor",
      "name": "House Blend",
      "origin": "Vietnam",
      "price": 12.00
    }
   ]
}
 Use the mock-up to finalize the visual layout and flow.

# Task 3: Develop the Code
File Setup
Initialize or clone a new React project:
Using create-react-app, Vite, or a similar tool and GitHub.
Create a directory structure for components, hooks, styles, and tests.
Routes
Build functional routes and components.
Build navigation between routes.
State Management
Use useState for local state management.
Use useId, useContext, and useRef as necessary.
Implement a custom hook.
Data Fetching
Create and fetch data with a GET request to display data.
Create a POST request to add new data.
Create a PATCH request to allow administrators to edit data.

# Task 4: Test and Debug
Write unit tests for key components using Vitest and React Testing Library.
Test user interactions such as form submissions and routing.
Debug errors using browser developer tools and React DevTools.
Refactor for code clarity and maintainability.
# Task 5: Document and Maintain
Add comments to explain complex logic and structure.
Write a README.md file that:
Provides setup and usage instructions.
Highlights features and any known limitations.
Push your project to GitHub, ensuring the repository is public for review.
