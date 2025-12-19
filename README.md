# ResQFood — Real-Time Surplus Food Rescue Platform

**ResQFood** is a full-stack web platform designed to **reduce food wastage and improve garbage management** by connecting **restaurants, hotels, and event organizers** with **NGOs** in **real time**.  
The platform ensures that surplus food reaches people in need **before it expires**, instead of ending up in landfills.

> **“No food should become waste when someone needs it.”**

---

## 📌 Table of Contents
1. Introduction  
2. Problem Statement  
3. Proposed Solution  
4. Innovation & Uniqueness    
5. Technology Stack  
6. User Roles  
7. Complete Workflow  
8. Real-Time Features  
9. Automatic Expiry System  
10. Social Impact  
11. Food Waste & Garbage Management  
12. Feasibility & Scalability  
13. Comparison with Existing Solutions  
14. Future Scope  
15. Conclusion  

---

## 1️⃣ Introduction

Food wastage is one of the most critical global problems today.  
While restaurants and events discard large quantities of edible food daily, NGOs and shelters often struggle to source food on time.

**ResQFood** bridges this gap using modern web technologies, real-time communication, and automation.  
It transforms surplus food into a **resource**, not **garbage**.

---

## 2️⃣ Problem Statement

### Current Challenges:
- Surplus food is discarded due to lack of coordination
- NGOs receive information too late
- Manual donation systems are inefficient
- Food mixed with garbage becomes unusable
- No real-time tracking or expiry handling

### Result:
- Increased food waste
- Higher landfill burden
- Missed opportunities for social welfare

---

## 3️⃣ Proposed Solution — ResQFood

ResQFood provides a **real-time coordination platform** where:
- Restaurants list surplus food with expiry time,quantity,food image
- NGOs instantly view nearby available food on map
- Food is claimed and collected efficiently in real time
- Expired food is automatically removed via cron jobs

The system focuses on **speed, safety, and accountability**.

---

## 4️⃣ Innovation & Uniqueness

ResQFood is **not just a listing platform** — it is a **coordination system**.

### Key Innovations:
- ⚡ Real-time updates using WebSockets - Socket.io
- ⏱️ Automatic expiry via background cron jobs - Inngest
- 🔄 Live status synchronization across users
- 🧠 Time-zone safe expiry handling
- ♻️ Focus on food + garbage management together
- 📧 Send Emails to NGOs & Restaurants on claiming and collecting food with live locations

---

## 5️⃣ Technology Stack

### 🌐 Frontend
- React (Vite)
- Tailwind CSS
- Socket.IO Client

### 🧠 Backend
- Node.js
- Express.js
- Socket.IO
- Inngest (cron jobs)

### 🗄 Database & Storage
- MongoDB Atlas
- Cloudinary (Image Storage)

### 🚀 Deployment
- Frontend: Vercel  
- Backend: Fly.io  
- Database: MongoDB Atlas  

---

## 6️⃣ User Roles

### 🍴 Restaurant / Donor
- Create food posts
- Set expiry time
- Receive claim & collection notifications via sockets
- Receive claim & collection Email with google pickup location

### 🤝 NGO / Collector
- View nearby available food on real time map
- Claim food in real time
- Collect food before expiry
- Receive claim & collection notifications via sockets
- Receive claim & collection Email with google destination location

---

## 7️⃣ Complete End-to-End Workflow

1. Restaurant creates a food post
2. Food becomes instantly visible to NGOs in their map view
3. NGO claims the food in real time
4. Restaurant gets notified
5. NGO collects food
6. Restaurant gets notified
7. Status updates in real time
8. Unclaimed food expires automatically
9. Expired Foods get deleted from database automatically after 7 days

---

## 8️⃣ Real-Time Features

- Live food availability updates on map
- Instant notifications on claim & collection
- No page refresh required
- All users stay synchronized

---

## 9️⃣ Automatic Expiry System (Core Feature)

ResQFood uses **Inngest cron jobs** that:
- Run periodically in the background
- Check food expiry times
- Mark expired food as expired
- Prevent unsafe food distribution
- Update UI instantly via sockets

This ensures **food safety and reliability**.

---

## 🔟 Social Impact

### 🥗 Hunger Reduction
- Faster access to food for NGOs
- Reduced dependency on delayed donations

### 🌍 Sustainability
- Responsible food usage
- Environment-friendly system

---

## 1️⃣1️⃣ How ResQFood Reduces Food & Garbage Waste

- Prevents food from being discarded
- Encourages timely redistribution
- Stops expired food from entering supply
- Reduces overall garbage volume
- Promotes sustainable practices

---

## 1️⃣2️⃣ Feasibility & Scalability

### Why ResQFood is practical:
- No special hardware needed
- Cloud-based scalable infrastructure
- Can be adopted city-wise or nationally

---

## 1️⃣3️⃣ Comparison with Existing Surplus Food Apps

|         Feature         | ResQFood | Traditional Apps |
|-------------------------|----------|------------------|
| Real-time updates       |    ✅    |        ❌       |
| Auto expiry             |    ✅    |        ❌       |
| WebSocket alerts        |    ✅    |        ❌       |
| NGO-focused flow        |    ✅    |        ❌       |
| Garbage reduction logic |    ✅    |        ❌       |

---

## 1️⃣4️⃣ Future Scope

- 📱 Mobile application
- 🚚 Pickup route optimization
- 📊 Food waste analytics
- 🧠 AI demand prediction
- 🏛️ Government & municipality integration
- 🏆 Reward system for donors

---

## 1️⃣5️⃣ Conclusion

ResQFood demonstrates how **technology, automation, and social responsibility** can work together to solve a real-world problem.

It is not just a hackathon prototype —  
it is a **scalable, impactful, and sustainable solution** for food waste and social welfare.

---

### Home Page
![Home Page](./Screenshots/Hero.png)

### Features Section
![Features Section](./Screenshots/Features.png)

### Testimonials Section
![Testimonials Section](./Screenshots/Testimonials.png)

### Sign Up Page
![Sign Up Page](./Screenshots/Signup.png)

### Log In Page
![Log In Page](./Screenshots/Login.png)

### Edit Profile Page
![Edit Profile Page](./Screenshots/EditProfile.png)

### Restaurant Dashboard Page
![Restaurant Dashboard Page](./Screenshots/RestaurantDashboard.png)

### NGO Mapview Page
![NGO Mapview Page](./Screenshots/NGOMapview.png)

### Food Marker on Map
![Food Marker on Map](./Screenshots/FoodMarker.png)

### Food Modal on Map for claiming
![Food Modal on Map for claiming](./Screenshots/FoodClaimModal.png)

### NGO Dashboard Page
![NGO Dashboard Page](./Screenshots/Socket.png)

Built with ❤️ for society and sustainability  

---

## ⭐ Support

If you believe in reducing food waste and creating impact,  
**star this repository ⭐**
