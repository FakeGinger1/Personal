Name: Laura Orlowska
Student Id: 52207358


Design Process:

When approaching the aesthetics of the design of my website, I wanted to include 
colour schemes and design choices that reflected my personality as the website was 
about me. I settled for a pink colour scheme as it is my favourite colour. By making 
the pinks a tiny bit more muted and only using a few variations of the colour, I believe 
I achieved an eye-catching look for the website while maintaining its readability. I 
opted for a fairly minimalistic layout to contrast the fun colouring of the pages. 
However, I introduced elements of interest throughout the text orientation, the 
gridding and interactive BootStrap5 elements. My aim was to make the pages consistent 
through their colouring and navigation bar at the top while making them interesting and 
distinct through each page's layout. I adjusted the colour schemes of the standard BS5 
navbar and nav elements to make them seamlessly interact with the rest of the web pages 
and their elements. Using GIMP I created a banner for my home page which utilises the colours 
seen throughout the web design as well as images which reflect topics which are covered in 
the later sections of the home and about pages.  I wanted to use an icon library to make my 
page design more interesting while providing a more intuitive navigation of the pages as a whole. 
I opted for using FontAwsome ([2]Font Awesome 5, 2017) as it provides a large variety of free to 
use icons which matched the topics discussed in my web pages. I made the icons used in the headings 
hidden on screens 
smaller than 767px to align with the responsiveness of my design and make the mobile layout 
more simple and minimalistic. 


Chat Application Development:
The chat application works using socket.io and assigning a socket to each user in the chat. 
The client and server side of the application communicate with each other by emitting events either
 to all the users or to all users except the user sending the message, joining, leaving or typing. 
Implementing the new user announcements into the chat was fairly simple however there was a bug 
where the “new user joined” message would be doubled for all existing users whenever a new user joined.
I fixed this by utilising an if statement at the beginning of my userjoins function which checks for 
an occurrence of the element user in the userlist and then returns a boolean value stopping the rest 
of the function going ahead and therefore not emitting duplicate messages each time a new user joins. 

Challenges Faced:

I faced many challenges throughout the development process of my website. Surprisingly the 
vertical text headings on the about page were the most challenging part of the layout process. 
It took a lot of trial and error of different CSS styling to achieve the exact transformation I 
wanted on the specified screen sizes and orientations. The JavaScript typing indicator was the 
other main challenge in this project as it was my first time implementing JavaScript, NodeJs and 
Socket.io into a web application. The website linked below ([1]Mateusz Piguła, 2020) helped me to 
get a grasp on the sample code and how each element worked which allowed me to tweak the code to 
fulfill the project requirements.



References:

[1] Author: Mateusz Piguła. Node.js Socket.io tutorial: Real-time chat application | TSH.io. [online] 
Available at: https://tsh.io/blog/socket-io-tutorial-real-time-communication/. (Accessed 30/11/2022)

[2]Font Awesome 5 (2017). Font Awesome 5. [online] Fontawesome.com. Available at: https://fontawesome.com/.

