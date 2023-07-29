This readme file will guide you through the installation process and getting this application up and running on your local machine.

## Prerequisites

Before proceeding with the installation, ensure that you have SQL installed and configured on your computer. You should have a working SQL server that you can connect to and run SQL queries.

## Installation

To install and run the application, follow these steps:

1. Clone the repository to your local machine.

2. Change to the server directory:

```bash
cd server
```

3. Install the required dependencies using npm:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. Open another terminal window and change to the client directory:

```bash
cd ../client
```

6. Install the required dependencies using npm:

```bash
npm install
```

7. Start the client application:

```bash
npm start
```

## Usage

Once you have completed the installation steps, the application will be up and running on `localhost:3000`. You can access it by opening your web browser and navigating to `http://localhost:3000`.

## Troubleshooting

- **SQL Connection Issues**: If you encounter any issues connecting to your SQL server, ensure that the server is running and that you have provided the correct credentials in the server configuration file. Change the database name as required.

- **Port Conflict**: If port `3000` is already in use on your machine, you can specify a different port by modifying the client's configuration file. Open the `client/package.json` file and update the `"start"` script to include the desired port number.

## AWS Compatibility 

For AWS deployment, use environment variables to store sensitive information like database credentials. Replace database credentials in `config.json` with environment variables.

### AWS RDS Configuration
Create a new SQL database on AWS RDS (Amazon Relational Database Service).
In the AWS RDS dashboard, you will find the endpoint, username, password, and database name for your newly created RDS instance.
To utilize the environment variables for database configuration, modify `index.js` with the appropriate changes. Replace the hard-coded values for database configuration with the corresponding environment variables.

### AWS Environment Variables
In the AWS deployment environment (e.g., AWS Elastic Beanstalk), set the environment variables `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, and `DB_HOST` to the appropriate values for your AWS RDS instance.

### Security Group
Ensure that the security group associated with your AWS RDS instance allows incoming connections from your backend server's instance. This is necessary to establish a connection between your backend server and the RDS database.

## Contributing

We welcome contributions to improve the Project Name. If you have any ideas, bug fixes, or feature requests, please submit an issue or a pull request. We appreciate your feedback and support.

## License

The Project Name is licensed under the [MIT License](LICENSE). Feel free to modify and distribute this project as per the license terms.
