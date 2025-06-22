require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const seedBlogs = [
  {
    title: 'The Future is Now: An Introduction to Smart Home Diagnostics',
    author: 'Dr. Eva Chen',
    body: 'Smart home medical diagnostics are shifting healthcare from the clinic to the living room. This post explores the fundamental concepts, from IoT sensors to AI-powered analysis, and how they are creating a proactive and personalized health monitoring ecosystem right where we live.',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-8a2839234993?q=80&w=1920'
  },
  {
    title: 'Beyond the Thermometer: How AI Analyzes Your Vitals at Home',
    author: 'Dr. Eva Chen',
    body: 'Artificial intelligence is the brain behind smart health devices. Learn how algorithms analyze patterns in your heart rate, sleep quality, and even your voice to detect subtle health changes, offering insights that go far beyond traditional single-point measurements.',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1920'
  },
  {
    title: 'Wearable Tech as Your 24/7 Guardian',
    author: 'Dr. Eva Chen',
    body: 'From smartwatches to fitness rings, wearables have become powerful tools for continuous health monitoring. We delve into the technology, the data they collect, and how they empower users to take control of their well-being by providing a constant stream of actionable health data.',
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1920'
  },
  {
    title: '"Alexa, Am I Okay?" The Role of Voice Assistants in Health',
    author: 'Dr. Eva Chen',
    body: 'Voice assistants are becoming health companions. This article examines their growing capabilities, from medication reminders and symptom checking to detecting signs of cognitive or respiratory issues through subtle changes in speech patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1587a23363360-52358c899f7a?q=80&w=1920'
  },
  {
    title: 'Securing Your Health Data in a Connected Home',
    author: 'Dr. Eva Chen',
    body: 'With great data comes great responsibility. The privacy and security of personal health information are paramount. We discuss the challenges and solutions, including data encryption, secure cloud storage, and user-controlled data access, ensuring your sensitive information stays safe.',
    imageUrl: 'https://images.unsplash.com/photo-1550645612-82f5d2914b65?q=80&w=1920'
  },
  {
    title: 'Chronic Disease Management with Smart Home Devices',
    author: 'Dr. Eva Chen',
    body: 'For individuals with chronic conditions like diabetes or hypertension, smart home devices are a game-changer. Discover how continuous glucose monitors, smart blood pressure cuffs, and automated alerts help patients and doctors manage conditions more effectively and prevent complications.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920'
  },
  {
    title: 'Early Warnings: How Your Home Can Detect Health issues Before You Do',
    author: 'Dr. Eva Chen',
    body: 'The true power of smart home diagnostics lies in early detection. Smart mats that analyze gait, beds that track respiratory rates, and toilets that analyze waste can identify potential health problems, such as fall risks or infections, long before symptoms become apparent.',
    imageUrl: 'https://images.unsplash.com/photo-1620912189895-e7a68a483377?q=80&w=1920'
  },
  {
    title: 'The Smart Bathroom: Analyzing Health Through Daily Routines',
    author: 'Dr. Eva Chen',
    body: 'The bathroom is being transformed into a health-tech hub. This post explores the latest innovations, including smart mirrors that analyze skin conditions, smart scales that measure body composition, and advanced toilets that provide valuable urinalysis data without any extra effort from the user.',
    imageUrl: 'https://images.unsplash.com/photo-1582738412147-383a137c34b3?q=80&w=1920'
  },
  {
    title: 'Integrating Telemedicine with Home Diagnostics for Seamless Care',
    author: 'Dr. Eva Chen',
    body: 'The synergy between home diagnostics and telemedicine is creating a new model of healthcare. Learn how real-time data from your home devices can be shared securely with your doctor, enabling more accurate remote consultations, timely interventions, and a truly continuous care loop.',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d25d1d?q=80&w=1920'
  },
  {
    title: 'Building Your Smart Health Ecosystem: A Starter\'s Guide',
    author: 'Dr. Eva Chen',
    body: 'Ready to start your smart health journey? This practical guide offers tips on choosing the right devices, ensuring interoperability, and integrating them into a cohesive system that provides a holistic view of your health and well-being. We cover everything from foundational devices to advanced sensors.',
    imageUrl: 'https://images.unsplash.com/photo-1631555159485-f6619a6d09bc?q=80&w=1920'
  }
];

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(async () => {
    console.log('Database connected for seeding.');
    // Clean out the collection before seeding
    await Blog.deleteMany({});
    console.log('Existing blogs deleted.');
    // Insert the new blogs
    await Blog.insertMany(seedBlogs);
    console.log('Database seeded with 10 new blog posts.');
  })
  .catch(err => console.error(err))
  .finally(() => {
    mongoose.connection.close();
    console.log('Database connection closed.');
  });
