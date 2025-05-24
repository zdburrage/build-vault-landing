# BuildVault

## Project Overview

BuildVault is a SaaS application designed for construction and development estimates. It leverages AI to provide accurate and efficient estimates for building projects.

## Features

- **AI-Powered Estimates**: Utilizes OpenAI to generate detailed build-out estimates.
- **User Authentication**: Secure login and user management.
- **Responsive Design**: Modern UI with a focus on user experience.
- **Dashboard**: Separate layouts for marketing and authenticated users.

## Technologies Used

- **Frontend**: Vite, React, TypeScript, Tailwind CSS, shadcn-ui
- **Backend**: Express
- **Authentication**: WorkOS AuthKit
- **AI Integration**: OpenAI

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd build-vault-landing
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     OPENAI_API_KEY=your_openai_api_key
     OPENAI_ASSISTANT_ID=your_openai_assistant_id
     ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment

To deploy the project, use the Lovable platform or your preferred hosting service.

## Custom Domain

You can connect a custom domain by navigating to Project > Settings > Domains and clicking Connect Domain.

For more details, refer to the [Setting up a custom domain guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).
