# Dabchi - E-commerce Website

Dabchi is a modern, full-stack e-commerce platform for a Tunisian brand specializing in men's and women's clothing with categorized product listings, built with cutting-edge technologies for optimal performance and user experience.

> **⚠️ Project Status: Work in Progress**  
> This project is currently under active development. Authentication system, email functionality, and core features are being implemented and refined.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](your-vercel-url-here) *(Coming Soon)*
- **Backend API**: [Spring Boot API endpoint](your-api-url-here) *(In Development)*

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core E-commerce Functionality
- **Product Catalog**: Browse men's and women's clothing collections
- **Category Management**: Organized product categories (shirts, pants, dresses, accessories, etc.)
- **Product Search & Filtering**: Advanced search with filters by category, price, size, color
- **Shopping Cart**: Add, remove, and modify items with Redux-managed cart state
- **User Authentication**: Secure registration, login, profile management, and social login options *(In Development)*
- **Order Management**: Complete checkout process with order tracking *(In Progress)*
- **Responsive Design**: Mobile-first approach with seamless cross-device experience

### Advanced Features
- **Real-time Inventory**: Live stock updates *(Planned)*
- **Social Login**: OAuth 2 integration with Google, Facebook, and GitHub *(In Development)*
- **Wishlist**: Save favorite items for later *(Coming Soon)*
- **Product Reviews**: Customer feedback and rating system *(Planned)*
- **Email Notifications**: Order confirmations, shipping updates, and promotional emails *(In Development)*
- **Interactive API Documentation**: Comprehensive Swagger UI for testing and development *(In Progress)*
- **Admin Dashboard**: Product and order management interface *(Planned)*
- **Payment Integration**: Secure payment processing (ready for integration) *(Future Release)*

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest UI library with enhanced concurrent features and improved performance
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux patterns
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing for SPA navigation
- **Axios** - HTTP client for API communication

### Backend
- **Spring Boot 3.x** - Enterprise-grade Java framework
- **Spring Security** - Authentication and authorization
- **OAuth 2 Client** - Social login integration (Google, Facebook, GitHub)
- **Spring Data JPA** - Data persistence with Hibernate
- **Java Mail Sender** - Email notification service for orders and user communications
- **Swagger UI** - Interactive API documentation and testing interface
- **Maven** - Dependency management and build automation
- **JWT** - JSON Web Tokens for stateless authentication
- **Spring Boot Validation** - Input validation and error handling

### Database & Infrastructure
- **PostgreSQL** - Robust relational database hosted on Supabase
- **Supabase** - Backend-as-a-Service for database hosting and management
- **Docker Compose** - Container orchestration for pgAdmin
- **pgAdmin** - Database administration interface
- **Vercel** - Frontend deployment and hosting platform

## 🏗 Architecture

```
fashion-store-ecommerce/
├── ecomm-client/          # React + TypeScript Frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── ecomm-api/             # Spring Boot Backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── docker-compose.yml     # pgAdmin container
└── README.md

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React + TS    │    │   Spring Boot   │    │   PostgreSQL    │
│ (ecomm-client)  │◄──►│  (ecomm-api)    │◄──►│   (Supabase)    │
│   Vite + Vercel │    │   REST API      │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         │              ┌─────────────────┐             │
         └──────────────►│    pgAdmin      │◄────────────┘
                        │   (Docker)      │
                        └─────────────────┘
```

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Java 17+** (for Spring Boot)
- **Maven 3.6+**
- **Docker & Docker Compose** (for pgAdmin)
- **Git** for version control
- **Supabase Account** for database hosting
- **OAuth 2 Provider Accounts** (Google Cloud Console, Facebook Developer, GitHub OAuth Apps)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fashion-store-ecommerce.git
cd fashion-store-ecommerce
```

### 2. OAuth 2 Provider Setup

> **⚠️ Setup Required**: OAuth 2 integration is currently being implemented. Follow these steps to set up provider applications for testing.

Before running the application, set up OAuth 2 applications:

**Google OAuth 2:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:8080/login/oauth2/code/google`

**Facebook OAuth 2:**
1. Go to [Facebook Developer Console](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure Valid OAuth Redirect URIs: `http://localhost:8080/login/oauth2/code/facebook`

**GitHub OAuth 2:**
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:8080/login/oauth2/code/github`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd ../backend

# Install Maven dependencies
mvn clean install

# Create application properties
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

### 4. Database Setup

```bash
# Navigate to project root
cd ..

# Start pgAdmin container
docker-compose up -d pgadmin
```

## 🔐 Environment Variables

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Fashion Store
VITE_APP_VERSION=1.0.0
```

### Backend (application.properties)
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://db.supabase.co:5432/your-database
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
jwt.secret=your-jwt-secret-key
jwt.expiration=86400000

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Email Configuration (Java Mail Sender)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

# OAuth 2 Configuration
spring.security.oauth2.client.registration.google.client-id=your-google-client-id
spring.security.oauth2.client.registration.google.client-secret=your-google-client-secret
spring.security.oauth2.client.registration.google.scope=openid,profile,email

spring.security.oauth2.client.registration.facebook.client-id=your-facebook-app-id
spring.security.oauth2.client.registration.facebook.client-secret=your-facebook-app-secret
spring.security.oauth2.client.registration.facebook.scope=email,public_profile

spring.security.oauth2.client.registration.github.client-id=your-github-client-id
spring.security.oauth2.client.registration.github.client-secret=your-github-client-secret
spring.security.oauth2.client.registration.github.scope=user:email

# Swagger UI Configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
springdoc.packages-to-scan=com.fashionstore.controller

# CORS Configuration
cors.allowed-origins=http://localhost:5173,https://your-vercel-domain.vercel.app
```

### Docker Compose (docker-compose.yml)
```yaml
version: '3.8'
services:
  pgadmin:
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@fashionstore.com
      PGADMIN_DEFAULT_PASSWORD: your-pgadmin-password
    ports:
      - "5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin

volumes:
  pgadmin_data:
```

## 🚀 Running the Application

> **🔧 Development Status**: The application is under active development. Some features may not be fully functional yet.

### Development Mode

1. **Start the Backend**
```bash
cd ecomm-api
mvn spring-boot:run
```

2. **Start the Frontend**
```bash
cd ecomm-client
npm run dev
```

3. **Start pgAdmin (before starting backend)**
```bash
cd ecomm-api
docker-compose up -d pgadmin
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Documentation**: http://localhost:8080/api-docs
- **pgAdmin**: http://localhost:5050

## 📚 API Documentation

The API is fully documented using **Swagger UI** and can be accessed at `http://localhost:8080/swagger-ui.html` when running locally.

> **📝 Note**: API endpoints are being actively developed and documented. Some endpoints may be incomplete or subject to change.

### Authentication Endpoints *(In Development)*
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login with email/password
- `GET /api/auth/oauth2/authorization/{provider}` - OAuth 2 login (google, facebook, github)
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Product Endpoints
- `GET /api/products` - Get all products with pagination
- `GET /api/products/{id}` - Get product by ID

### Category Endpoints
- `GET /api/categories` - Get all categories


### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/{itemId}` - Update cart item
- `DELETE /api/cart/remove/{itemId}` - Remove item from cart

### Email Endpoints *(In Development)*
- `POST /api/email/order-confirmation` - Send order confirmation email
- `POST /api/email/shipping-notification` - Send shipping update email  
- `POST /api/email/password-reset` - Send password reset email
- `POST /api/email/welcome` - Send welcome email to new users

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order details

## 🗄 Database Schema

> **🔧 Database Structure**: Currently being designed and implemented. Schema may evolve as development progresses.

### Key Tables
- **users** - User account information *(In Development)*
- **oauth2_users** - OAuth 2 social login user details *(In Development)*
- **categories** - Product categories (men/women subdivisions) *(Implemented)*
- **products** - Product catalog with details *(In Progress)*
- **cart_items** - Shopping cart contents *(In Progress)*
- **orders** - Order information *(Planned)*
- **order_items** - Individual items within orders *(Planned)*
- **reviews** - Product reviews and ratings *(Future Release)*
- **email_templates** - Email notification templates *(In Development)*
- **email_logs** - Email sending history and status *(In Development)*

## 🚀 Deployment

> **📋 Deployment Status**: Deployment configurations are being prepared. Production deployment coming soon.

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch *(In Setup)*

### Backend (Options)
- **Heroku**: Deploy Spring Boot JAR *(Configuration in Progress)*
- **AWS EC2**: Deploy on cloud instance *(Planned)*
- **Railway**: Simple Spring Boot deployment *(Testing)*
- **Render**: Free tier option *(Under Consideration)*

### Database
- Already hosted on **Supabase** - no additional deployment needed
- Ensure connection strings are updated for production *(In Progress)*

## 🤝 Contributing

> **👥 Contributions Welcome**: This project is actively being developed. Contributions, suggestions, and feedback are highly appreciated!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Follow Redux Toolkit patterns for state management
- Write unit tests for new features
- Follow REST API conventions
- Use meaningful commit messages
- Test email functionality in development environment *(Email system in development)*
- Document API endpoints using Swagger annotations
- Test OAuth 2 integration with different providers *(OAuth integration in progress)*

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@fashionstore.com or create an issue on GitHub.

> **💬 Development Updates**: Follow the repository for regular updates on development progress, new features, and release notes.

## 🙏 Acknowledgments

- React 19 team for the latest features and improvements
- Redux Toolkit team for simplified state management
- Spring Boot team for the robust framework
- Java Mail Sender for reliable email services
- Supabase for reliable database hosting
- Vercel for seamless deployment experience
