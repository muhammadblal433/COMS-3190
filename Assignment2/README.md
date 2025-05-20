# Assignment 2 Project Repository – SE/COM S 3190

Welcome to the Assignment 2 Repository for SE/COM S 3190 - Construction of User Interfaces (Spring 2025). This repository contains all the necessary files and resources for completing Assignment 2 - Movie Review Manager Web Application.

## 📚 Project Overview

The Movie Review Manager is a multi-page web application that allows users to browse a paginated list of movies, submit reviews, and view submitted reviews. This project requires students to demonstrate their ability to work with HTML, CSS, and JavaScript, while also emphasizing collaboration and GitLab usage.

### Important Notes:

- You must adhere to the provided specifications and cannot use a different project concept.
- The project must only use HTML, CSS, and JavaScript (No frameworks like React, Angular, or Vue). Bootstrap is allowed.
- Minimum of three pages required for Movie Listing, Review Submission, and Review Summary.
- The Movie Listing view must be paginated with at least three pages, each displaying at least six movies.

## 📚 Design Requirements

### 1️⃣ Movie Listing View

✔️ Two pages of movies (preferably categorized by language or genre).  
✔️ Minimum of 6 movies per page.  
✔️ Navigation controls (Previous/Next Buttons or a Navigation Bar).  
✔️ Movie listings must be loaded from JSON files (`movies1.json`, `movies2.json`).  
✔️ Each movie must include:
   - Title
   - Release year
   - Genre
   - Cast
   - Director
   - Image/Poster
   - Short description  
✔️ Search bar to filter movies by title.  
✔️ Write Review button for each movie.  
✔️ View Reviews button leading to the Review Summary View.  

### 2️⃣ Review Submission View

✔️ Users select a movie from a dropdown menu.  
✔️ Text area to write the review.  
✔️ Rating system (1-5 stars) using radio buttons or a dropdown.  
✔️ Submit button saves the review and navigates back to Movie Listing.  
✔️ Cancel button navigates back without saving input.  

### 3️⃣ Review Summary View

✔️ Displays a list of submitted reviews including:
   - Movie Title
   - Review text
   - Rating  
✔️ Back to Movies button resets the review form and navigates back.  

## 📂 Folder Structure

The repository follows a structured layout for better organization:

```
📂 Project Root  
│── 📂 src  
│   ├── 📂 html  
│   ├── 📂 css  
│   ├── 📂 js  
│   ├── 📂 assets  
│   ├── 📂 data  
│
│── 📂 Documents  
│   ├── team_development_report.pdf  
│   ├── video.mp4  
│
│── 📄 README.md  
```

- All CSS files go in `/src/css/`.
- All JavaScript files go in `/src/js/`.
- All images and assets should be placed in `/src/assets/`, either directly or as image URLs within JSON files. These JSON files should also be stored in the same folder (`/src/assets/`).
- JSON movie files (`movies1.json`, `movies2.json`) go in `/src/data/`.
- All project documentation (`team_development_report.pdf`, `video.mp4`) goes in `/Documents/`.

### Update to Assignment Requirements
- The number of required movie pages has been reduced from three to two, but review submission and summary features are still required.
- If you've already completed the assignment with three movie pages, your work will be graded accordingly. If not, you can follow either the original or revised requirements.
- Use the existing Git repository files; two movie pages and one review submission page should be sufficient. The provided JavaScript files can be used to handle reviews and summaries.
### Suggestions for Review Submission & Summary
- Store review data using a global array variable.
- Push form input data into this array and update the summary dynamically.
- Structure the data efficiently for better organization.
- This update is intended to ease your workload while maintaining essential features. Reach out if you have any questions. 

## 📌 Submission Guidelines

Students must submit their final project via GitLab.

✔️ Push changes regularly.  
✔️ Each team member must make at least 2 meaningful pushes:
   - One for a feature implementation (e.g., adding movie listing, review submission).
   - One for a bug fix or enhancement (e.g., UI improvements, error fixes).  
✔️ Meaningful commit messages.  
✔️ Final GitLab repository URL must be submitted on Canvas before the deadline.  

## 🗓 Final Submission Instructions

📌 GitLab repository URL must be submitted on Canvas before the deadline.

🕒 Final Deadline: March 8, 2025, at 11:59 PM CST  

🚨 **No late submissions will be accepted!** 🚨

## 🎯 Grading Rubric

| **Item**                     | **Description**                                                      | **Points** |
|------------------------------|----------------------------------------------------------------------|------------|
| **Communication & Collaboration** | Equal participation & team contributions                           | 20         |
| **Movie Listings**            | Website contains 3 paginated movie listing pages                   | 45         |
| **Review Submission**         | Users can write & submit reviews with ratings                      | 15         |
| **Review Summary**            | Users can view submitted reviews                                   | 10         |
| **Video Explanation**         | Clear technical & procedural explanations (max 3 min, MP4 format) | 10         |
| **Total**                     |                                                                      | **100**    |

## 📄 Project PDF Document

A PDF document must be included in the `/Documents/` folder. The document should contain:
   - Individual contributions from each team member.
   - A brief description of the development process.
   - How the team collaborated and communicated. 
   - **This document is required for submission.**

## ❗ Important Policies

- No extensions will be granted under any circumstances.  
- The project must be fully functional by the demo date.  
- Assignment 2 grades are final.
- Failure to meet the submission deadline results in a score of 0.  

## 🔗 Additional Resources

- **Office Hours:** Check Canvas for schedule.  
- **Piazza Discussions:** Ask questions early to get assistance.  

🚀 Start early and follow best practices to ensure success!  
📩 For any issues, contact your assigned TA.  

## 🎉 Happy Coding! 🎉
