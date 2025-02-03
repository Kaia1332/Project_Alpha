# Project Proposal: "Game: Mapping WWI’s Global Impact"  


## Problem Statement
The management team of the Hive group of secondary schools has noticed a lack of engagement in non-STEM subjects over the last two years. They would like to try and reverse this trend and have asked an external team to come up with a solution that places student enjoyment at the heart of the learning experience.

## Solution Proposal
 Create an interactive game where students explore key WWI events via a historical map, analyze their global connections, and reinforce learning through quizzes.  


### MVP Features  
### 1. Interactive WWI Map
- **Technology**: Leaflet.js with predefined markers.  
- **Key Events**: 8-10 pivotal WWI locations
- **Clickable Markers**: Each marker triggers a popup with:  
    - **A 100-word summary** 
    - **Global Connections** 
    - **1 historical image**

### 2. Quiz System
- **Questions**: 3-5 multiple-choice questions per event.
- **Scoring**: Points saved to the database, unlock badges.

### 3. User Roles  
- **Students**: Play the game, win badges, take quizzes.  
- **Teachers**: View class progress
- **Parents**: Basic dashboard showing completed events.  

### 4. Optional? :Simple forum for student discussions
 





## Stakeholder Analysis  

<img src="./Assets/Stakeholder analysis.png">

| **Stakeholder**       | **Interest/Requirements**                                            | **Management Strategy**                                                                 |
|------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| **Hive Foundation**    | Improve engagement in non-STEM subjects                 | MVP demo highlighting critical thinking connections              |
| **Students**           | Engaging and interactive learning tool                         | Gamified elements (badges, quizzes)       |
| **Teachers**           | Track student progress                            | Simplify teacher dashboard                           |
| **Parents**            | Monitor child’s learning progress                             | Basic dashboard with clear metrics               |
| **Development Team**   | Deliver MVP on time; avoid burnout.                                                       | Agile standups, clear task ownership         |


## Risk analysis
  - **Time Management**
    - **Mitigation**: Daily standups, Trello tracking, prioritize MVP features
  - **Insufficient Testing Coverage**
    - **Mitigation**: Aim for 2 tests/day at least.


## Agile Project Plan 

| **Day** | **Objective**                          | **Key Deliverables**                                                                 |  
|---------|----------------------------------------|-------------------------------------------------------------------------------------|  
| **1**   | Setup & Auth                           | - Finalized 8-10 WWI events.<br>- Leaflet.js map with markers.<br>- Auth     |  
| **2**   | Backend & Data                         | - Seeded database.<br>- API endpoints.<br>- Quiz UI draft. |  
| **3**   | Integration & Dashboards               | - Quiz connected to backend.<br>- Teacher dashboard.|  
| **4**   | Styling & Deployment                   | - Styled UI.<br>- Deployed backend/frontend.<br>- Testing.       |  
| **5**   | Presentation                           | - Demo video.<br>- Presentation.                         |  


## Team Task Alignment  
| **Name** | **Responsibilities**                                  |  
|------------|-------------------------------------------------------|  
| **Kaia**   | project coordination, styling, demo video, features needed support      |  
| **Ismail** | Backend (Auth, API), database deployment.              |  
| **Eri** | Seed WWI data(ERD), quiz scoring logic          |  
| **Naeem**    | Frontend(game/map/quiz UI)       |  
| **Mashnoor**  | Frontend(Teacher/parent dashboards, progress tables.)         |  



## Notice！

- 1. Please follow the **Git workflow**:[Team Work Guide 1](./Assets/Team%20Work%20Guide%201.md)
- 2. Aim for **2 tests/day** at least