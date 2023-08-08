# Social Network Backend

## Description

The Social Network Backend project is a comprehensive backend application designed to provide a robust foundation for building social networking platforms. Leveraging MongoDB as the database system and Mongoose as the ODM (Object Data Modeling) library, this project delivers a powerful infrastructure for managing user data, friendships, reactions, and thoughts. This application follows a structured template that not only facilitates object relational mapping but also establishes a seamless CRUD (Create, Read, Update, Delete) architecture.

**Key Features:**

- **User Management:** The backend supports user registration and management. Users can be created, updated, retrieved, and deleted seamlessly.

- **Friendship Networks:** The application allows users to establish and manage friendships. Users can connect with each other and retrieve their friends' lists.

- **Thoughts and Reactions:** Users can post thoughts and react to them. Reactions are stored as part of the thoughts' subdocument array.

- **Robust Validation:** By utilizing tools like Insomnia, the backend is rigorously tested for functionality and validation, ensuring reliable performance.

- **Virtual Environment:** A virtual environment is created using Mongoose to effectively map and manage relationships between users, thoughts, and reactions.

With a focus on providing a scalable and efficient backend architecture, the Social Network Backend project serves as a solid foundation for creating social networking applications. Whether you're building a new platform or expanding an existing one, this project offers a reliable and customizable solution for managing user interactions, thoughts, and connections.

  ## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Visuals](#visuals)
- [Contributions](#contributions)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To get started with the Social Network Backend, follow these steps:

1. Clone the repository to your local machine using your preferred method:
   ```
   git clone https://github.com/your-username/social-network-backend.git
   ```

2. Navigate to the project directory in your terminal:
   ```
   cd social-network-backend
   ```

3. Install the required dependencies using npm:
   ```
   npm install
   ```

4. Ensure you have MongoDB installed and running on your machine.

5. Run the server:
   ```
   npm start
   ```

## Usage

The project provides a simple and effective way to manage your backend functionalities. Here's how to use it:

1. Start by running the server as described in the installation section.

2. Use the provided seed data to populate the database with initial users, thoughts, and reactions.

3. Utilize a tool like Insomnia to test the backend routes. Send requests to the various endpoints (e.g., `/api/users`, `/api/thoughts/:thoughtId/reactions`) to interact with the API and observe responses.

4. Make use of HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations and interact with user data, friendships, thoughts, and reactions.

5. Check the terminal or console for logs and responses to ensure that routes are being triggered and data is being processed correctly.

By following these steps, you can effectively utilize the backend functionalities provided by the Social Network Backend project. It's a great way to experiment with creating users, managing friendships, posting thoughts, and reacting to content, all within a controlled development environment.

  ## Visuals

Below shows an example of insomnia being run.

<img src = ".\assets\social_network_backend_example.png">

  ## Contributions

Contributions to this project have been made by Francis Reyes, the author of this repository.

## License

This project is licensed under the MIT License.

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Tests

For a visual demonstration of the test cases, you can watch this video: [Link to YouTube Video Showcasing Test Cases](https://youtu.be/ZEyol3QxxmE)

## Questions

If you have any questions or need further assistance, feel free to contact me:

Email: reyesfrancisp@gmail.com

GitHub: [reyesfrancisp](https://github.com/reyesfrancisp)

Feel free to reach out if you have any inquiries related to this project or other topics. Your feedback and inquiries are valuable!