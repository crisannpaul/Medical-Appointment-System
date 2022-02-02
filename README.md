# Medical Appointment System

The developed system retains the structure of a common deployment scenario which includes backend and frontend systems. The user interacts with the front-end interface like website, which communicates with an REST API. The client has the ability to interact directly with the REST API.

<p align="center">
  <img width="819" src="https://user-images.githubusercontent.com/26774196/152198344-756d6cc5-97dc-4625-b328-e7682b88f7b0.png">
</p>

## Scope


Only a section of the system was implemented as specified in assignment discussion. The chosen section is specified below:
- Login or Register
- Update Client Details (including Medical Record)
- Check Appointment Time-slot Availability
- Book an Appointment
- View and Update Appointment (including Notes)

Some changes needed to be made to facilitate the partly implemented system, which included no room or practitioner allocation, or any treatment or payment resolve. Core to the partly implemented system is appointment booking which includes client login and registration, availability check, etc.

## Implementation

Routes are REST API endpoints the users can visit. Each route is configured in controllers which act like services. Each service access the JPA data repository which holds model instances, e.g. Client.java which holds fields like ID, name, etc.

<p align="center">
  <img height="300" src="https://user-images.githubusercontent.com/26774196/152198443-b1be9908-1aca-46f1-89e9-99771d3c7869.png">
</p>

React and WildFly have been designated as the front-end and back-end of the system. While I have used React to build the front-end, Spring was used as the back-end interface.

<img align="right" height="170" src="https://user-images.githubusercontent.com/26774196/152198405-9f8e5814-c73d-4ae1-8685-86de6966a612.png">

The intended language to interact with the frameworks has been used for the implementation: JavaScript for React, and Java for Spring. To deploy these systems, I have used two different providers. Google Cloud Platform has a sub-service offering named Firebase which is intended to be used for projects with less complex requirements as it is mostly fully managed, alike PaaS paradigm. Heroku is a service provided by Salesforce which allows upload of artefacts like compiled .jar or similar.

## Deployment

The frontend is setup with Firebase which hosts the contents of the /build/ folder after running npm run build in the terminal. During initial setup, the deployment to Firebase specified details like if it is a single- page application, and what folder to host. Every update to the website now simply requires one command when inside the main project directory. The deployment to the backend requires the project to be pushed into a git Heroku repository. The backend has API routes which can be used for frontend use cases. However, I have added a .html landing page for the root backend, in addition to the /info route. Please refer to the source code section to see the code behind these responses.


<p align="center">
  <img width="800" src="https://user-images.githubusercontent.com/26774196/152202496-fd3f2436-53b6-466e-9a31-c79f1c680168.png">

  <img width="800" src="https://user-images.githubusercontent.com/26774196/152202558-fc2bb40e-efd0-45d0-b43f-e10952a95a57.png">
  
  <img width="800" src="https://user-images.githubusercontent.com/26774196/152202547-7152b0d0-b3ec-4f2b-b4b1-ac08969a3063.png">
</p>





