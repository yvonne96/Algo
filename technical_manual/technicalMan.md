# Technical Manual
## Table of Contents
## 1. Introduction
Our product is a interactive web application that helps students learn about algorithms. It also works as a fun and interesting aid for teachers to use during their classes.

What makes this website stand out is it's visually appealing animations. Once the user provides its own input data for the animation, they can play, pause, fast-forward and slow it down. 
Another feature of the animation is that the algorithm's code (used by the animation) is displayed beside the it. 
Once the user starts the animation, the line of code that is being represented in the animation is highlighted.These functionality's allow the user to have control
over the animations and to be more engaged with it.The reason we wanted to add an animation to our website is because it is an interesting way to see 
how the input data for the algorithm is processed and modified. It is also proven that we learn faster through the use of images and diagrams.

One problem that we may have with this animation is that when a user uses the animation they may become unfocused while watching it or they might only 
understand it during the time that the animation is running. This would hinder our main aim to educate our users. 
So to prevent this from happening we also provided a quiz to test our user's knowledge.

Overall we have provided a fun and stress free way of learning algorithm's throuh the use of interactive animations and quizes. We also provided vital information 
about the algorithms such as its performance, comparasions of similar algorithms, written example's etc.
## 2. System Architecture
![System Architecture image]
(images/sysArch.png)
A user has access to use our system through our website. They can then interact with our quizzes or our animations. Our website needs access to our algorithms in order
to run our animations with the code. An admin can add more algorithms and then add subsequent pages to our website so that our users can then see and use these algorithms.
## 3. High Level Design
### 3.1 Context Diagram
![Context Diagram image]
(images/ContextDiagram.png)
This is to show the boundary of our system and the external entities that interact with it. This gives a clear understanding of the outside influences on our system. We can see the user interacts with the system by inputing data for the algorithms. The system will send back a visual animation to the user and the user will have the option to pause, start and step through the algorithm. 

### 3.2 Logical Data Model
#### LDM for animation
![Logical Data Model for animation image]
(images/LDSanimation.png)
#### LDM for quiz
![Logical Data Model for quiz image]
(images/LDSquiz.png)

This diagram shows us the connections between our entities, external and internal.This gives us a clear understanding of how our entities are related to each other.

### 3.3 Data Flow Diagram
#### DFD for animation
![Data Flow Diagram for animation image]
(images/DFDanimation.png)
#### DFD for quiz
![Data Flow Diagram for quiz image]
(images/DFDquiz.png)

This diagram maps out the flow of information in our system. The purpose of drawing out our diagram is to map out our expectation of how and where to the information should be passed.

### 3.4 System Design
![System Design image]
(images/sysDesign.png)
This diagram shows the layers of our system.

## 4. Challenges & Resolutions
### 4.1 Refreshing
Any new pages that we added to our application wouldn't refresh. You also couldn't directly type the page path into the browser. You would get a GET request error.

***Solution:***
We discovered we had an issue with our routes. The fix was very simple and only required one line of code.

### 4.2 Testing
There was some difficulty in setting up jasmine and karma testing.
1. Couldnt process our html pages
2. It tried to imported Connect(withRouter(***javascriptClass***)) but it didnt like this since it doesnt want to route the class.

***Solution:***
1. Added a html-loader to our webpack configuration underneath karma.conf.js file.
2. Added "export" infront of our javascript classes that we were testing. Also when we were importing it into our jasmine test file we wrapped the import in curly braces. This tells jasmine to not use the default export so this means that we are just inporting the class.

### 4.3 Animations
We ran into an issue where the functions of the animation weren't in sync. Different parts of the animation would run at different times causing the animation to be wrong and not make sense.

***Solution***
To fix this issue involved changing how we approached the problem. We had to redesign our code to run like a state machine. The code was now in sync properly and allowed the animations to flow correctly. This also helped us with showing the user the code. It meant we had built a structure in which that could very easily be implemented. 

### 4.4 Framework/JS library
A challenge we ran into at the start was choosing a framework and js libraries. At the start of our project we had our animations running in raw javascript.

***Solution***
After many debates we came to the decision to use React and we discovered a javascript library called d3. This helped a lot with our animations. It provides a lot more functionality and the animations proved far more visually appealing to the user.  

## 5. Installation Guide
### Step 1
If node and npm are not currently installed on your system please see the following https://www.npmjs.com/package/v5/tutorial to install the most up to date version. If node and npm are already installed you can move to step 2.

### Step 2

```
$ git clone https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo3.git
$ cd 2018-CA326-cgodwin-algo3/code
$ npm install
$ npm start
```

### Step3 
The website will now be visible at https://localhost:3000

## 6. Testing

### 6.1 Continuous Integration
From the very start of our project we implemented continuous integration testing with gitlab. We had continuous integration running on our python files. We felt this was very important as we never actually run the python files but these contain the code which we show the users on the website. By having continuous integration this meant that each time any code was uploaded to the repo these tests were ran. If any change was made that then made these tests fail we would have a very good idea what was causing it as it would have happened in the last change. 
![Continuous Integration image]
(images/continuous_integration.png)
In this image we can see the Python unit tests running with the continuous integration.

### 6.2 Automated User Testing
Throughout our project we decided to implement automated user testing. We decided to implement this in Jasmine. This allowed us run tests as if a user was using the system and make sure everything was running okay. We later decided to add these to our continuous integration in order to make sure our website continued to behave as required. 

### 6.3 User Testing
Throughout our project we ran user testing by asking friends and family to test out the project. This proved very useful as it helped us find many bugs that we were not previously aware of. For example one user found that clicking the buttons of the animation in the wrong order would cause errors in the animation. It also proved very useful as we discovered how people other than us would interact with the website. For example one issue that kept popping up over and over was after inputing data users would press the play button straight away. (There used to be a requirement to press the draw button first). We realised we should remove this function and just have a play button as it seemed a lot more intuitive. 