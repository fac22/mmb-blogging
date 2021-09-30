# **Micro-blog**

## **fac22 Week 1 Project by Michael, Mohamed and Barbara**

## **Instructions**

[https://learn.foundersandcoders.com/course/syllabus/apprenticeship/server/project/](https://learn.foundersandcoders.com/course/syllabus/apprenticeship/server/project/)

Your project this week is to build a **microblogging site**. It should allow users to **submit their own posts** and **view all the posts** submitted by others.

Note: we aren’t expecting the data to persist when the server restarts (we’ll be looking at databases for this next week).

### **User stories -> make each into an issue**

### **Core**

- [x]  As an opinionated person, I want to: **post** my thoughts so others can read them
- [x]  As a bored person, I want to: **read** what other people have posted

### **Stretch**

- [x]  As an impulsive person, I want to: **delete** my posts so no one can see them anymore

### **Acceptance Criteria**

### **Pages**

- [x]  1 **page** with a **form to submit posts**,
- [x]  1 **page** showing **all posts**

### **Files**

```jsx
**No index.html** files (all HTML responses should be created dynamically within Node)
```

```jsx
**No script.js** No client-side JavaScript (all logic should happen on the server)
```

- [x]  → **Only server.js**

### **Also**

- [x]  All static assets served correctly (**CSS, favicon** etc)
    - link CSS when we create html in server.js
- [x]  **Tests** for each server route
- [x]  A responsive, mobile-first **design**
- [x]  Ensure your app is **accessible** to as many different users as possible

### Testing

- Below are the tests for all of our routes

#### Testing that we can navigate to the message board
![messageBoard](.public/images/messageTest.PNG)

### Testing that we can navigate to the posting page
![Posting page](.public/images/postingTest.PNG)


### Testing that we can post a message and view it 
![Full test](.public/images/writeSendTest.PNG)

### Test that the delete button is working correctly
![Delete](.public/images/messageInfo.PNG)