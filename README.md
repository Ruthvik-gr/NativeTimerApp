# React Native Timer App

## Overview
The **React Native Timer App** allows users to create, manage, and interact with multiple customizable timers. Users can assign timers to categories, visualize progress, perform bulk actions, and maintain a history of completed timers. The app is designed with a clean UI/UX while keeping third-party dependencies minimal.

## Features

### 1. Core Features
- **Add Timer**: Create new timers with a name, duration, and category.
- **Timer List with Grouping**: View timers grouped by categories in expandable/collapsible sections.
- **Timer Management**:
  - Start, pause, and reset timers.
- **Progress Visualization**: Display a progress bar or percentage for each timer.
- **Bulk Actions**: Start, pause, or reset all timers within a category.
- **User Feedback**: Show a modal with a congratulatory message when a timer completes.

### 2. Enhanced Functionality
- **Timer History**: Maintain a log of completed timers, viewable on a separate screen.
- **Customizable Alerts**: Option to set a halfway alert for each timer.

### 3. Bonus Features (Optional)
- **Export Timer Data**: Export timer history as a JSON file.


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Ruthvik-gr/NativeTimerApp.git
   cd project
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3.  Run on Expo by scanning the QR code with the Expo Go app:
   ```sh
   npx expo start
   ```

4. Run on a simulator or device:
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## Usage
- Open the app and create timers by specifying a name, duration, and category.
- View timers grouped by category and control them individually or in bulk.
- Track timer progress with visual indicators.
- View completed timers in the **History** section.
- Enable halfway alerts for better tracking.
