# Algo

**1.Introduction** 
*1.1 Overview*	
*1.2 Business Context*	
*1.3 Glossary*
**2. General Description**	
*2.1 Product/System Functions*	
*2.2 User Characteristics and Objectives*	
*2.3 Operational Scenarios*	
*2.4 Constraints*	
**3.Functional Requirements**	
*3.1 Visual Diagram*	
*3.2 Current Session Window*	
*3.2 Current Session Window*	
*3.3 History Window*	
*3.4 Input Window*	
**4.System Architecture**	
**5.High Level Design**	
**6.Preliminary Schedule**	


# 1.Introduction

### 1.1 Overview
The system is a website to help students learn algorithms. It will show a visual representation for certain graph algorithms such as BFS, DFS, Dijkstra and trees, sorting algorithms such as quick sort and merge sort. Students will have the  option to use their own data or example data which will be used in a particular algorithm that they have chosen.This will then be represented visually by a diagram which will run through each stage of the algorithm and show how it processes the data. It will be possible for the student to pause at each step of the algorithm and data which is applicable to that step will be shown such as in a list sorting algorithm, it will show the list with the elements that have been sorted up to that point. It will be possible for students to choose between Java and Python for the algorithm to be implemented in and the student will be able to view the code as it’s being executed. The line in the code which the algorithm is on will be highlighted. The application will also show the Big O Notation performance for the algorithm and compare its performance to other similar algorithms. Algorithms will be grouped into types such as recursive, divide and conquer, backtracking, greedy etc. and these headings will be used  on the application to help the student.

### 1.2 Business Context
This website could be transformed into a subscription service. A user could pay a monthly or annual fee to access the website. 

### 1.3 Glossary

#### Big O Notation
Big O Notation describes the time complexity of an algorithm.

#### BFS
Breadth First Search.

#### DFS
Depth First Search.

#### Dijkstra
An algorithm used to find the shortest path in a graph

## 2.General Description
### 2.1 Product / System Functions:

This is our standard list of functions for our program. We may add extra functions if we are within our time schedule like allowing our users to sign in so they can save their activity. 

#### User Functionality
The user will access the application through the internet by entering the correct website address into their web browser. They will see the home page and they can immediately use the application, there is no sign-in. They can navigate to their desired algorithm by navigating to the correct tab on the nav bar at the top of the screen. They are in complete control of the visual diagram. They can pause,step through or start it whenever they want.

#### Algorithm Information Page
When a user selects an algorithm they wish to learn more about they will be brought to an general information page about that algorithm. This page will have a general description about it, how it works and it will also contain the performance of the algorithm in big 0 notation and also a button to navigate to the demonstration page which contains the visual diagram. All of this information about the algorithm will be stored in a PostgresSQL database. Each algorithm will have a ID which will allow the application  to grab the correct information.

#### Visual Diagram Interface
If the user clicks the button to navigate to the demonstration page, they will come across to see a visual representation of the diagram. If they wish to view it using the programs own sample data they can just click the Start button below the diagram to begin. We will use colour to demonstrate the different stages of the diagram. The user will also be able to go through each step of the code by clicking a button called ‘Next Step’ or pause it by clicking the button ‘pause’.   

#### Visual Diagram Input Functionality
The user will also have the choice to input their own data so as to better understand the algorithm. When the user enters this data it will be written into our SQL database. The user can then start the diagram by clicking the start button underneath the diagram.  

#### Visual Diagram Current Session  Window
There will also be a current session window which will contain the basic facts about the current setup for the diagram such as what the input is, the duration the algorithm has been running.

#### View code of algorithm during display of visual diagram 
If the user implements the visual diagram, they can have the option of viewing the code. Each appropriate line of code that it is implementing will be highlighted and matched with the color applicable to the diagram.They code will be stored in our database.

#### Algorithm history 
A user can view their previously implemented algorithm examples. It will appear in a window to the right. They will be stored in a database. They can always rerun the example by clicking the appropriately named button in this window.


### 2.2 User Characteristics and Objectives

We decided to host our product online so that anybody can access our website as long as they have access to the internet. Our main users will be students and teachers since this is a tool to learn and understand more about algorithms. We will always keep our target audience in mind while developing our product.

Our main goal is to correct a user-friendly website so that our users will have a stress free experience using our website and also to give our users enough information so that they will have a better understanding of algorithms. We are determined to create a diagram that will clearly show the process the algorithm goes through when processing the input data.


### 2.3 Operational Scenarios

All operations are available to every user. There are no restrictions.

#### Implementing Visual Diagram
Any user can implement the visual diagram of an algorithm. If the user supplies their own data we will save the data into our database in order for our program to use it. Otherwise if the user decides to use the default data supplied by the diagram, all they have to do is 

#### Input data for diagram
Any user can enter their own data to be used by the algorithm. Once the user clicks enter within the input box, it will save it to the database and the algorithm will run using that data and the process will be displayed by the diagram

#### Current session for diagram
When the user implements the diagram basic information about the current example for the diagram will be given in this window, such as the data given,goal,result etc. This is to increase our user’s understanding of the algorithm. 

#### History of implementing algorithme problem
When a user implements an algorithm we will save it in our database and display it in our history window. If the user wishes to reply that instance of the algorithm, they have the option to do so. We will only display records for that particular algorithm, not any of the other algorithms they may have implemented.

### 2.4 Constraints

Below is a list of possible constraints

#### Time
Our main concern is whether we will be able to complete the project before the deadline. It is hard to make the visual diagram appealing and easy to understand. However we are worried thd to estimate how much time we will need in order to perfect our implementation of the visual diagram in order to make it clear and easy for our users to understand it.

#### Meeting User Requirements
Another concern is whether we will meet the user requirements. Our main target users are students so we are worried that we won't get truthful feedback since we will be asking our fellow classmates.

#### Visual Diagram Requirements
We intend to make the visual diagram appealing and easy to understand. However we are worried that we will run out of time before we perfect it.

## 3.Functional Requirements
Since we don't log in our users we don't have any restrictions upon our users. 

### 3.1 Visual Diagram

#### Description
Our visual diagram needs to be user friendly. Our users must be able to understand how the diagram represents the process the data goes through within the algorithm.
The user can input their own data to run the algorithm or they can use sample data given by the program. The program will display whichever input was used within a current session window. 

#### Criticality
It is critical for this diagram to be developed correctly as it is a very important learning tool and our main aid. It will demonstrate how the algorithm works and therefore will help our users to better understand how the algorithm works which is our goal. 

#### Technical issues
It will be difficult to design the visual diagram in such a way that the user will immediately understand how the diagram links to the algorithm . Animation will be involved as well as using certain colours to demonstrate different sections of the algorithm working and processing the data. It will probably take several attempts before we perfect it.

#### Dependencies with other requirements
How the diagram will be display depends on the algorithm , such as if it is sorting algorithm a list will be displayed or it is an algorithm for a tree a tree will be displayed. Also what data is displayed depends on whether the User inputs their own data or uses the sample data provided.

### 3.2 Current Session Window

#### Description
This window will be displayed when the user runs through the visual diagram. It will show applicable data relevant to the diagram, such as what input data was used, amount of time the program ran etc. 

#### Criticality
It is important for the user to know what data was used, especially if they used sample data. It will give the user facts about their current session through thediagram which will provide a more complete understanding of how the algorithm is working.

#### Technical Issues
There are no real issues involved with implementing this functionality as it is just basic facts about the most recent session of the algorithm.

#### Dependencies with other requirements
This window depends upon the current iteration of the algorithm. It will show basic facts about it so it completely depends on the visual diagram. It also depends on whether the user uses their own data or not as it will have to grab the information from the database.

### 3.3 History Window

#### Description
This window will displayed on the same page as our visual diagram. It will display each example that the user went through with that particular algorithm. The user has the option of running through that example again

#### Criticality
This is the least critical requirement. This is merely to let the user to re-display their previously implemented examples of the algorithm.

#### Technical issues
There are no real issues involved with implementing this.

#### Dependencies with other requirements
This window is linked to our visual diagram. Each time our visual diagram goes through an example it will log it to the history window, if the user asks for a different set of inputs to be displayed.

### 3.4 Input Window

#### Description
This window is displayed on the same page as the visual diagram and history window. Each time input is submitted within this window, it then triggers the visual diagram to display the algorithm using the input appropriately. 

#### Criticality
This window is critical to the visual diagram without it the user would only be able to use the sample data provided. The option of letting the user input their own data is a vital learning tool for the users to better understand how the algorithm works. 

#### Technical issues
We will probably have to restrict what the user can use as inputs as some won't work.
For example if the user uses nothing as an input.

#### Dependencies with other requirements
This window works in tandem with the visual diagram. When the user inputs data it triggers the visual diagram.


### 3.5 Web-Interface

#### Description
Our website must be user friendly so it will be easy for our users to navigate through each web page. Our users should always be able to quickly find where abouts they are within the website. We will design it with our user requirements in mind.

#### Criticality
It is critical for website to be designed appropriately as everything hinges on its user friendliness. We want our users to have a stress free experience using our website while they are learning about algorithms. If they are frustrated with our website it may hinder their ability to fully grasp an understanding about algorithms.

#### Technical issues
It will probably take a few drafts of the user interfaces before we come up with a user friendly solution that takes into consideration all of our users needs and provides a enjoyable experience.

#### Dependencies with other requirements
Everything hinges on our web interface. If our users are frustrated with our web interface it may disrupt their openness to understanding algorithms. We want our users to have a positive experience using our website

## 4.System Architecture
![System Architecture image]
(https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo/blob/master/functional_spec/images/systemarchitecture.png)

## 5.High Level Design

We will use SSADM tools to demonstrate the flow of external entities and data processes through our system.

#### Context Diagram
This is to show the boundary of our system and the external entities that interact with it. This gives a clear understanding of the outside influences on our system.

#### Logical Data Structures
This diagram shows us the connections between our entities, external and internal.This gives us a clear understanding of how our entities are related to each other.

#### Data Flow Diagram
This diagram maps out the flow of information in our system. The purpose of drawing out our diagram is to actually map out our expectation of how and where to the information should be passed.

#### System Design
This diagram shows the layers of our system. This maps out the different sections our user can go to.

#### Navigate to website 
The user puts the correct address into their web browser
#### Choose Algorithm
The user choose an algorithm that they desire from the selection contained the nav bar
#### Algorithm Page 
This page contains background information on the algorithm the user has chosen. It displays information like what the algorithm is used for, a description, performance in big O notation etc. 
#### Demonstration Page
This page contains the visual diagram as well as the history window, input Data window and Current session window
#### Input Data
The user can input their own data to be used by the diagram in the input window
#### Visual Diagram
This is where the user can view the diagram which will demonstrate how the algorithm works using the data provided the user or program
#### Show Current Session
This is where the user can see the basic facts about the current example being run in the diagram.

### Context Diagram
![Context Diagram image]
(https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo/blob/master/functional_spec/images/context.png)

### LDS Diagram
![LDS Diagram image]
(https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo/blob/master/functional_spec/images/lds.png)

### DFD Diagram
![DFD Diagram image]
(https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo/blob/master/functional_spec/images/dfd.png)

### System Design
![System Design image]
(https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo/blob/master/functional_spec/images/system_design.png)

## 6.Preliminary Schedule
A timeline of our plan for the next two months. This shows deadlines we have set for ourselves throughout the project to help keep ourselves on track so we don’t fall behind. We’re aiming to finish up a week before the project is due to leave us room for any issues we run into along the way. 

### Gantt chart 
![Gantt chart image]
(https://gitlab.computing.dcu.ie/godwinc3/2018-CA326-cgodwin-algo/blob/master/functional_spec/images/gantt_chart.png)