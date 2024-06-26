# E-Commerce Project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)

## Introduction

This is a fully functional e-commerce application built with the MERN stack. It includes features like product listing, user authentication, cart functionality, payment integration, and more.

## Features

- User Authentication (Sign up, Sign in, Sign out)
- Product listing and detail pages
- Shopping cart functionality
- Order management
- Payment integration with Razorpay
- Admin functionality inculding Dashboard and Admin Menu
- Image upload using Multer
- Responsive design using TailwindCSS

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Uploads**: Multer
- **Payment Gateway**: Razorpay

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Clone the Repository

<code>
git clone https://github.com/your-username/e-commerce-project.git
cd e-commerce-project
</code>

### Install Dependencies

<code>
npm install
</code>

### Environment Variables

Create a `.env` file in the current directory and add the following:

<code>
PORT=your_port
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=your_node_env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_NAME=your_razorpay_name
</code>

### Run the Application

Start both the backend and frontend servers simultaneously:

<code>
npm run dev
</code>

## Usage

- Open your browser and navigate to `http://localhost:PORT` to see the application in action.
- Sign up for an account and explore the features.
- Add products to your cart and proceed to checkout using Razorpay for payment.

## Contributions

Contributions are welcome! Please open an issue or submit a pull request for any changes.
