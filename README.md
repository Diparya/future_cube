# Future Cube Project
The Future Cube Project is an interactive 3D experience built with Next.js and Three.js. This project displays a rotating cube where each face represents a different aspect of a sustainable future, such as food systems, water supplies, and environmental conservation. Users can click or tap on each cube face to navigate to video content related to that face's theme.

## Overview
This project utilizes Three.js for rendering a 3D cube with custom textures, and Next.js for page navigation and dynamic routing. Each cube face includes text over an image representing different themes. Users can explore video content associated with each theme by clicking on a face of the cube.

## Features
- 3D Interactive Cube: A rotating cube with images and text on each face.
- Responsive Design: Optimized for desktop and mobile.
- Dynamic Video Navigation: Each cube face navigates to a themed video when clicked.
- Looping Background Video: A looping background video plays initially to enhance visual engagement.

## Project Structure
- pages/: Contains the main pages of the app, including the cube display (cube) and the video player (video).
- components/VideoPlayer.js: Displays video content for the selected cube face.
- public/: Stores images for cube faces and videos for each theme.

## Installation
### Prerequisites
- Node.js and npm/yarn installed

### Steps
1. Clone this repository:
   git clone https://github.com/Diparya/future_cube.git
   cd future-cube-project

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

