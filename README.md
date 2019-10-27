## FileStorage

### Name: Manisha Yacham

### Description:
Using File Storage web application, anyone can sign up and create an account to store, retrieve, update and delete files (CRUD operations on files) of any type from any location/device.

### Login Screen:

![image](https://user-images.githubusercontent.com/54858174/67632031-2bad4980-f85b-11e9-8cbc-0f70413f5614.png)

### Sign Up page:

![image](https://user-images.githubusercontent.com/54858174/67632047-56979d80-f85b-11e9-9b4b-7e9cdd7cb37b.png)

### Uploading a sample file:

![image](https://user-images.githubusercontent.com/54858174/67632060-80e95b00-f85b-11e9-9d96-7626876d5284.png)

### List Page:

![image](https://user-images.githubusercontent.com/54858174/67632067-9d859300-f85b-11e9-8cdf-00d04c4a693d.png)

### Download: Clicking on download saves the file

![image](https://user-images.githubusercontent.com/54858174/67632079-d9205d00-f85b-11e9-9301-2c55f7c3d1fd.png)

### Update: User can upload same or different file for Update

![image](https://user-images.githubusercontent.com/54858174/67632092-0240ed80-f85c-11e9-81d3-170c2e889ccd.png)

### File updated: 

![image](https://user-images.githubusercontent.com/54858174/67632100-24d30680-f85c-11e9-81b9-500f3f32aae4.png)

### Delete: Shows a confirmation popup before deleting

![image](https://user-images.githubusercontent.com/54858174/67632103-47fdb600-f85c-11e9-910c-593a5e8e8b6d.png)

### Admin page:
![image](https://user-images.githubusercontent.com/54858174/67632109-62379400-f85c-11e9-950e-feabef47027d.png)

![image](https://user-images.githubusercontent.com/54858174/67632119-809d8f80-f85c-11e9-8f3a-82a5220d32aa.png)


### Architecture Diagaram

<img src="https://user-images.githubusercontent.com/54858174/67632131-b93d6900-f85c-11e9-98fa-f0cfb5b7f6ca.png" width="100%" height="100%">

### AWS Services used:

**EC2:** Hosted Client and Server on different EC2 instances. Used Image copies (AMI’s) for replicating into different Availability Zones and Multiple Regions.

**Classic Load Balancer:** Used to distribute traffic between EC2 instances

**Auto Scaling Groups:**  Used for monitoring application and adjust capacity of EC2 instances, to increase scalability

**S3:** Used to store user uploaded files. Creates different folders for different users. Created life cycle and replication rules on bucket, helps in cost controls by archiving and retiring data based on specified object age

**S3-IA:** Used for data that is infrequently accessed, requires speedy access of data

**Amazon Glacier:** Files are archived based on the lifecycle rules created for s3 bucket

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

