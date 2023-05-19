# Slash Bug Tracking Tool

![](https://github.com/imfahadali/netflix-frontend-mern/blob/main/public/netflix-app.gif)

Slash is a comprehensive bug tracking tool designed to streamline project management and issue tracking. With Slash, you can efficiently create projects, add authors to your projects, create tickets, assign tickets to authors, and analyze user activity. This README file provides an overview of the features, tools used, and instructions to get started with Slash.

## Features

Slash offers the following key features:

1. **Create Project:** Easily create new projects to organize and manage your bug tracking tasks effectively.

2. **Add Authors:** Add authors to your projects from the current pool of users, ensuring collaboration and efficient issue resolution.

3. **Create Ticket:** Create detailed tickets to document and track bugs, feature requests, or any other issues related to your projects.

4. **Assign Ticket:** Assign tickets to specific authors, ensuring clear responsibility and accountability for issue resolution.

5. **User Analytics:** Analyze user activity to gain insights into the performance and productivity of your team members.

## Tools Used

Slash is built using modern web technologies and frameworks. The key tools and technologies used in the development of Slash include:

- **React.js:** A popular JavaScript library for building user interfaces, providing a robust and efficient foundation for the frontend of Slash.

- **TypeScript:** A typed superset of JavaScript that enhances developer productivity and code quality by providing static types.

- **Tailwind CSS:** A highly customizable CSS framework that enables rapid UI development with pre-defined utility classes and responsive design capabilities.

- **Vite:** A fast and lightweight development server and build tool, used to create a blazing-fast development environment for Slash.

- **Formik:** A popular form library for React, making it easy to manage and validate forms in a robust and maintainable manner.

- **Yup:** A JavaScript schema builder for value parsing and validation, used in conjunction with Formik to create validation schemas.

- **React Router Dom:** A routing library for React that allows for easy navigation and routing within the application.

## Getting Started

To get started with Slash, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/imfahadali/slash-bug-tracker.git

   ```

2. Clone the Backend repository:

   ```bash
   git clone https://github.com/imfahadali/slash-bug-tracker-be.git

   ```

3. Install BE dependencies:

   ```bash
   cd slash-bug-tracker-be
   npm install
   ```

4. Configure the environment variables BE:

   Create .env and add all the necessary configuration options:

- `DATABASE_URL`: [description of the database URL]
- `TOKEN_KEY`: [description of the token key]
- `AWS_S3_ACCESS_KEY_ID`: [description of the AWS S3 access key ID]
- `AWS_S3_SECRET_ACCESS_KEY`: [description of the AWS S3 secret access key]
- `BUCKET_NAME`: [description of the bucket name]

5. Start the development server(FE):

   ```bash
   npm start
   ```

6. Install FE dependencies:

   ```bash
   cd ../slash-bug-tracker
   npm install
   ```

7. Configure the environment variables FE:
   Create .env and add the necessary configuration option:
- `VITE_BACKEND_API`=http://localhost:4000
