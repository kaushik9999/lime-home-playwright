# SETTING UP THE PROJECT
1. Clone the repository on to your local machine.
2. Next, open the project in Visual Studio Code.
3. Once the project is open, access the integrated terminal and ensure that you are in the project's root directory.
4. Run the command "npm install" to install all the necessary dependencies.
5. Install playwright by using the command "npm install playwright".
6. Finally, download the playwright browsers by using the command "npx playwright install".

# RUNNING THE TESTS(STEP-BY-STEP GUIDE):
1. In this project, all tests are stored in the "tests" folder. Upon browsing through this folder, you will find all the spec files that have been developed.
2. The "api-tests" folder, located within the "tests" folder, contains tests specifically designed for the API. 
3. The project is configured to use a .env file, which includes the necessary URL and credentials for running the tests.
4. When running the tests, be sure to include the "test_env=yourfilename" parameter in the command in order for the .env file to be recognized.
5. Custom commands for running tests in various modes have already been included in the package.json file.
6. To run all developed tests with the already added env file "env.qa," use the following command: "test_env=qa npm run test:headed check-out product-search shopping-cart limehome-properties-api".
7. To run only the API tests you can use the command "test_env=qa npm run test:headed limehome-properties-api".
8. By default, the project is configured for the tests to be run in fully parallel mode, if you want to run them in a serial manner, please update the property fullyParallel to false in the playwright.config.json.

# PROJECT STRUCTURE
1. Folder baseLib contains the base fixure.
2. Folder env contains all the .env files.
3. Folder Pages contains all the page objects and helper funtions.
4. Folder tests contains all the spec files.
5. Folder Utils contains all the custom utilities realated files. 
