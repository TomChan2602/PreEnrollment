# Pre-Enrollment System

A comprehensive web-based course enrollment management system built with:
- **Backend**: PHP with PDO and MySQL
- **Frontend**: React with React Router
- **Database**: MySQL with relational schema

## Features

### Student Features
- ✅ User registration and authentication
- ✅ Course enrollment with schedule selection
- ✅ Maximum of 4 courses per semester
- ✅ Maximum of 3 classes per day
- ✅ View enrollment status in real-time
- ✅ Receive notifications for enrollment updates
- ✅ Cancel pending enrollments
- ✅ View course schedules and availability

### Admin Features
- ✅ Manage enrollments (approve/reject)
- ✅ View pending enrollments
- ✅ Enrollment statistics
- ✅ Generate reports:
  - Students enrolled per course
  - Students enrolled by day
- ✅ Advanced enrollment analysis

### System Features
- ✅ Secure authentication with password hashing
- ✅ Session-based user management
- ✅ Protection against SQL injection
- ✅ Input validation and sanitization
- ✅ Real-time notifications
- ✅ Enrollment conflict detection
- ✅ Capacity management

## System Rules

- **Maximum 30 students per class**
- **Fixed class times:**
  - Morning: 8:15 AM - 11:15 AM
  - Afternoon: 11:30 AM - 2:30 PM
  - Evening: 3:00 PM - 6:00 PM
- **Students can have maximum 3 classes per day**
- **Students can enroll in maximum 4 courses per semester**

## Available Courses (Semester 2)

- ICT310 - ITSM
- ICT309 - GRC
- ICT307 - Project1
- ICT305 - Topics in IT
- ICT301 - ICT PM
- ICT206 - Software Eng
- ICT204 - Cyber Security
- ICT203 - Web App Dev
- ICT202 - Cloud Comp
- ICT201 - DBS
- ICT103 - Programming

## Installation

### Prerequisites
- XAMPP (Apache + MySQL + PHP)
- Node.js 14+ and npm

### Setup Steps

1. **Start XAMPP services:**
   ```
   Open XAMPP Control Panel and start Apache and MySQL
   ```

2. **Create database:**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create new database named `enrollment_db`
   - Import `database/enrollment.sql`

3. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

4. **Create admin account:**
   - Visit http://localhost/PreEnrollment/setup_admin.php
   - Fill in admin details and create account

5. **Start the React development server:**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application:**
   - Open http://localhost:3000 in your browser
   - Or http://localhost/PreEnrollment for the index page

## Usage

### Student Workflow
1. Register for a new account (student registration)
2. Log in with your credentials
3. Browse available courses
4. Enroll in courses (up to 4 per semester)
5. View and manage your enrollments
6. Receive notifications when enrollments are approved/rejected

### Admin Workflow
1. Log in with admin credentials
2. View pending enrollment requests
3. Approve or reject enrollments
4. Monitor enrollment statistics
5. Generate reports by course and time

## Project Structure

```
PreEnrollment/
├── admin/                    # Admin pages (future)
├── student/                 # Student pages (future)
├── api/                     # PHP API endpoints
│   ├── auth.php            # Authentication
│   ├── courses.php         # Course management
│   ├── enrollments.php     # Enrollment management
│   └── notifications.php   # Notifications
├── config/                 # Configuration files
│   ├── db.php             # Database connection
│   └── constants.php      # Application constants
├── database/              # Database files
│   └── enrollment.sql     # Database schema
├── includes/              # PHP components
│   └── functions.php      # Helper functions
├── frontend/              # React frontend
│   ├── public/           # Static files
│   ├── src/              # React source code
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   └── styles/       # CSS files
│   └── package.json      # Frontend dependencies
├── setup_admin.php        # Admin account setup
├── index.php             # Main entry point
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth.php?action=register` - Register new student
- `POST /api/auth.php?action=login` - Login user
- `GET /api/auth.php?action=logout` - Logout user
- `GET /api/auth.php?action=check` - Check authentication status

### Courses
- `GET /api/courses.php?action=list` - List all courses
- `GET /api/courses.php?action=schedules` - Get course schedules
- `GET /api/courses.php?action=details` - Get course details
- `POST /api/courses.php?action=create` - Create course (admin)
- `POST /api/courses.php?action=add_schedule` - Add schedule (admin)
- `DELETE /api/courses.php?action=delete` - Delete course (admin)
- `DELETE /api/courses.php?action=delete_schedule` - Delete schedule (admin)

### Enrollments
- `GET /api/enrollments.php?action=my_enrollments` - Get student's enrollments
- `POST /api/enrollments.php?action=enroll` - Enroll in course
- `DELETE /api/enrollments.php?action=cancel` - Cancel enrollment
- `GET /api/enrollments.php?action=pending` - Get pending enrollments (admin)
- `POST /api/enrollments.php?action=approve` - Approve enrollment (admin)
- `POST /api/enrollments.php?action=reject` - Reject enrollment (admin)
- `GET /api/enrollments.php?action=stats` - Get statistics (admin)

### Notifications
- `GET /api/notifications.php?action=list` - Get notifications
- `GET /api/notifications.php?action=unread` - Get unread count
- `PUT /api/notifications.php?action=mark_read` - Mark as read

## Database Schema

### Tables
- **users** - User accounts (students and admins)
- **students** - Student profile information
- **courses** - Course definitions
- **course_schedules** - Course schedule instances
- **schedule_times** - Fixed time slots
- **enrollments** - Student course enrollments
- **notifications** - User notifications

## Security Features

- 🔒 Password hashing with bcrypt (PHP password_hash)
- 🔒 SQL injection prevention with prepared statements
- 🔒 Session-based authentication
- 🔒 Input validation and sanitization
- 🔒 CSRF protection ready (implement tokens on production)
- 🔒 Role-based access control

## Development

### Backend
- PHP 7.4+ with PDO
- MySQL database with prepared statements
- RESTful API endpoints
- Helper functions for common operations

### Frontend
- React 18 with Hooks
- React Router v6 for navigation
- Axios for HTTP requests
- CSS modules and global styles
- Responsive design

### Database
- Relational schema with foreign keys
- Indexed queries for performance
- Transaction support
- Cascade delete for data integrity

## Testing

### Sample Credentials
After setup, you can create:
- **Admin account** via setup_admin.php
- **Student accounts** via registration page

### Test Scenarios
1. Register as student → Login → Enroll in courses
2. Admin login → Approve/Reject enrollments
3. Check notifications → View enrollment status
4. Cancel pending enrollment
5. View enrollment statistics

## Troubleshooting

### Database connection fails
- Verify MySQL is running in XAMPP
- Check credentials in `config/db.php`
- Ensure database `enrollment_db` exists

### API returns 401 Unauthorized
- Check session is active
- Verify user is logged in
- Clear browser cookies and re-login

### React app won't load
- Ensure Node.js and npm are installed
- Run `npm install` in frontend directory
- Check if port 3000 is available
- Try `npm start` again

### Enrollment validation errors
- Check maximum courses per semester (4)
- Check maximum classes per day (3)
- Verify no schedule conflicts
- Check course capacity

## Production Deployment

1. Build React app: `npm run build`
2. Copy build files to web server
3. Update API URL in frontend config
4. Set up SSL/HTTPS
5. Configure environment variables
6. Set up database backups
7. Enable error logging
8. Implement rate limiting
9. Add CSRF tokens
10. Use environment-specific configs

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is provided as-is for educational purposes.

## Support

For issues or questions, contact the system administrator.

## Version

Version 1.0.0 - Initial Release
