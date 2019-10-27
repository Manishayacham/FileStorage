## FileStorage

### Name: Manisha Yacham

### Description:
Using File Storage web application, anyone can sign up and create an account to store, retrieve, update and delete files (CRUD operations on files) of any type from any location/device.

### Login Screen:

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632600-b6457700-f862-11e9-98e4-54570f7d8a12.png">

### Sign Up page:

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632477-f146ab00-f860-11e9-96ca-12f7df8f7c69.png">

### Uploading a sample file:

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632583-7b434380-f862-11e9-92aa-4b93ad803557.png">

### List Page:

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632489-0f141000-f861-11e9-9f34-31ddd80f52bc.png">

### Download: Clicking on download saves the file

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632523-8f3a7580-f861-11e9-8380-6e9b488e8050.png">

### Update: User can upload same or different file for Update

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632538-df193c80-f861-11e9-8db3-8f133da97b38.png">

### File updated: 

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632544-0b34bd80-f862-11e9-96ca-d923cf39f703.png">

### Delete: Shows a confirmation popup before deleting

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632562-3c14f280-f862-11e9-8446-e96e79464869.png">

### Admin page:
<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632743-f574c780-f864-11e9-8a7e-1a28a5493c3a.png">

<img width="60%" height="60%" src="https://user-images.githubusercontent.com/54858174/67632748-08879780-f865-11e9-97d2-4438e6276083.png">

### Architecture Diagaram

<img src="https://user-images.githubusercontent.com/54858174/67632131-b93d6900-f85c-11e9-98fa-f0cfb5b7f6ca.png" width="100%" height="100%">

### AWS Services used:

**EC2:** Hosted Client and Server on different EC2 instances. Used Image copies (AMI’s) for replicating into different Availability Zones and Multiple Regions.

**Classic Load Balancer:** Used to distribute traffic between EC2 instances

**Auto Scaling Groups:**  Used for monitoring application and adjust capacity of EC2 instances, to increase scalability

**S3:** Used to store user uploaded files. Creates different folders for different users. Created life cycle and replication rules on bucket, helps in cost controls by archiving and retiring data based on specified object age

**S3-IA:** Used for data that is infrequently accessed, requires speedy access of data

**Amazon Glacier:** Files are archived based on the lifecycle rules created for s3 bucket

**S3-Transfer Acceleration:** Enabled on buckets for faster file upload

**Cloud Front:** Used for speedy download of the user uploaded files

**RDS:** Created project database to store and retrieve data related to user and files

**Route53:** Used to create domain name space and hosted zones for my application

**Certificate Manager:** Used certificate manager to generate SSL certificate for secure access of the application

**Cognito:** Used for login functionality

**Lambda:** Used to trigger lambda function on S3. Whenever a file is deleted by user, lambda function is invoked, a log is generated in cloud watch and an email is triggered by SNS to admin

**Cloud Watch:** Created alarm on load balancer to check unhealthy EC2 instance and created alarm on lambda function to generate logs

**SNS:** Create topic and subscription for admin email


## Deployment Steps:

### Deploy and Run the application using AWS services:

1.	Launch EC2 instances 
2.	Install or update yum if not available
3.	Install Git and clone the repo

#### For running client/web server:

1.	Write script in user data of ec2 instances for automation to run client after launch
2.	Below are the steps for running client manually
    -	Install java: sudo yum install java-1.8.0-openjdk-devel
    -	Install node/npm: yum install nodejs
    -	Install Nginx: sudo yum install nginx
    -	Change nginx.config file to point to the root folders of the application
    -	Change directory to the client root folder and run following commands:
        - npm install
        -	npm run build
        -	service ngnix start

#### For running application server:

1.	Write script in user data of ec2 instances for automation to run client after launch
2.	Below are the steps for running application server manually:
    - Install java: sudo yum install java-1.8.0-openjdk-devel
    -	Install Apache Maven: sudo yum install maven
    -	Generate access key, secretkey for having s3 bucket access.
    -	Make changes in application.properties file (example: bucket name, access key, etc.)
    -	Change directory to root folder of the spring boot application and run following commands:
        -	mvn clean build- a .war file gets generated in target folder.
        -	Change directory to target folder.
        -	Execute java -jar <.war file name>

