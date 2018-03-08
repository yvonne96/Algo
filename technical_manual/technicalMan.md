# Technical Manual
## Table of Contents
## Introduction
Our product is a interactive web application that helps students learn about algorithms. It also works as a fun and interesting aid for teachers to use during their classes.

What makes this website stand out is it visually appealing animations. Once the user provides its own input data for the animation, they can play, pause, fast-forward and slow it down. 
Another feature of the animation is that the algorithm's code (used by the animation) is displayed beside the it. 
Once the user starts the animation, the line of code that is being represented in the animation is highlighted.These functionality's allow the user to have control
over the animations and to be more engaged with it.The reason why we wanted to add an animation to our website is because it is an interesting way to actual see 
how the input data for the algorithm is processed and modified. It is also proven that we learn faster through the use of images and diagrams.

One problem that we may have with this animation is that when a user uses the animation they may become unfocused while watching it or they might only 
understand it during the time that the animation is running. This would hinder our main aim to educate our users. 
So to prevent this from happening we also provided a quiz to test our user's knowledge.

Overall we have provided a fun and stress free way of learning algorithm's throuh the use of interactive animations and quizes. We also provided vital information 
about the algorithms such as its performance, comparasions of similar algorithms, written example's etc.
## System Architecture
![System Architecture image]
(images/systemArch.jpg)
A user has access to use our system through our website. They 
## High Level Design
## Problems & Resolution
### **Problem 1**
Any new pages that we added to our application wouldnt refresh. You also couldnt directly type the page path into the browser. You would get a GET request error.

***Solution:*** we added ..... code/app/components/Master.js

### **Problem 2**
There was some difficulty in setting up jasmine and karma testing.
1. Couldnt process our html pages
2. It tried to imported Connect(withRouter(***javascriptClass***)) but it didnt like this since it doesnt want to route the class.

***Solution:***
1. added a html-loader to our webpack configuration underneath karma.conf.js file.
2. added "export" infront of our javascript classes that we were testing. Also when we were importing it into our jasmine test file we wrapped the import in curly braces. This tells jasmine to not use the default export so this means that we are just inporting the class.

## Installation Guide
