# T-Mobile Quote App

A modern, responsive web application for generating T-Mobile wireless service quotes. Users can select the number of lines, choose plans for each line, and select devices to get an accurate monthly cost estimate.

## Features

- **Line Selection**: Choose how many lines you need (1-10)
- **Plan Selection**: Select from T-Mobile's current plans (Essentials, Magenta, Magenta MAX)
- **Device Selection**: Choose from the latest smartphones including iPhone 17 series, Galaxy S25 series, Pixel 9 series, or BYOD
- **Quote Summary**: View detailed breakdown with monthly costs and total device costs
- **Export Options**: Download quote as text file or share via native sharing

## Current Plans (2024)

- **Essentials**: $60/mo - Basic unlimited plan with 5G
- **Magenta**: $70/mo - Includes HD streaming and Netflix Basic
- **Magenta MAX**: $85/mo - Premium plan with 4K streaming and premium perks

## Current Devices (2024)

### Apple iPhone Series
- iPhone 17: $799 ($33/mo)
- iPhone 17 Pro: $1,099 ($46/mo)
- iPhone 17 Pro Max: $1,199 ($50/mo)

### Samsung Galaxy Series
- Galaxy S25: $799 ($33/mo)
- Galaxy S25+: $999 ($42/mo)
- Galaxy S25 Ultra: $1,299 ($54/mo)

### Google Pixel Series
- Pixel 9: $699 ($29/mo)
- Pixel 9 Pro: $999 ($42/mo)

### BYOD Option
- Bring Your Own Device: $0/mo

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── LineSelection.jsx    # Step 1: Select number of lines
│   ├── PlanSelection.jsx    # Step 2: Select plans per line
│   ├── DeviceSelection.jsx  # Step 3: Select devices per line
│   └── QuoteSummary.jsx     # Step 4: View final quote
├── App.jsx                  # Main application component
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Lucide React**: Beautiful icons
- **CSS3**: Modern styling with gradients and animations

## Features in Detail

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

### Modern UI/UX
- Gradient backgrounds
- Smooth animations
- Card-based layout
- Step indicator
- Progress tracking

### Quote Calculation
- Real-time cost calculation
- Tax and fee estimation
- Device payment calculations
- Monthly total breakdown

## Customization

To update plans or devices, modify the arrays in the respective component files:

- **Plans**: `src/components/PlanSelection.jsx`
- **Devices**: `src/components/DeviceSelection.jsx`

## License

This project is for demonstration purposes. T-Mobile is a registered trademark of T-Mobile USA, Inc.
