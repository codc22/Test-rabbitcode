# Code Smells and Security Issues Checklist

This document lists all intentional code smells, security vulnerabilities, and anti-patterns introduced in the three projects for PR review testing.

## .NET WebAPI Project (`dotnet-webapi/`)

### Security Issues

1. **Hardcoded Connection String with Credentials** (`Program.cs:12`)
   - Connection string with username and password hardcoded in source code
   - Should use configuration files or environment variables

2. **SQL Injection Vulnerabilities** (`Program.cs:19`, `Program.cs:40`, `Program.cs:50`)
   - Direct string concatenation in SQL queries
   - No parameterized queries
   - Vulnerable to SQL injection attacks

3. **Exposing Passwords in API Response** (`Program.cs:28`)
   - Password field returned in GET response
   - Sensitive data should never be exposed

4. **Storing Plain Text Passwords** (`Program.cs:35`)
   - Passwords stored without hashing
   - Should use password hashing (bcrypt, Argon2, etc.)

5. **No Authorization Checks** (`Program.cs:45`)
   - Delete operation has no authorization/authentication
   - Anyone can delete any user

### Code Quality Issues

6. **No Dependency Injection** (`Program.cs:15`)
   - Direct instantiation of SqlConnection
   - Should use dependency injection

7. **No Input Validation** (`Program.cs:33`, `Program.cs:35`)
   - User input not validated before processing
   - No model validation attributes

8. **Exception Swallowing** (`Program.cs:52`)
   - Empty catch block swallows exceptions
   - Errors are silently ignored

9. **Magic Numbers** (`Program.cs:60`)
   - Hardcoded numeric values (0, 999999)
   - Should use named constants

10. **No Error Handling** (`Program.cs:66`)
    - Database operations without try-catch
    - No error handling for failed queries

---

## React Native Application (`react-native-app/`)

### Security Issues

1. **Hardcoded API Key** (`App.js:4`)
   - API key exposed in source code
   - Should use environment variables or secure storage

2. **Insecure Credential Storage** (`App.js:12-15`)
   - Storing credentials in AsyncStorage without encryption
   - Sensitive data should be encrypted

3. **Sending Passwords in Plain Text** (`App.js:24`)
   - Password transmitted without encryption
   - Should use HTTPS and proper encryption

4. **Exposing API Key in Requests** (`App.js:25`, `App.js:40`, `App.js:60`)
   - API key visible in HTTP headers
   - Should use secure token storage

5. **Displaying Passwords in UI** (`App.js:50`)
   - Passwords shown in user interface
   - Should never display passwords

6. **Insecure Random Number Generation** (`App.js:66`)
   - Using Math.random() for security tokens
   - Should use cryptographically secure random generator

### Code Quality Issues

7. **No Input Validation** (`App.js:20`)
   - No validation on user inputs
   - Should validate email format, password strength, etc.

8. **Generic Error Handling** (`App.js:30`)
   - Only console.log for errors
   - Should have proper error handling and user feedback

9. **No Cleanup in useEffect** (`App.js:36`)
   - Missing cleanup function
   - Could cause memory leaks

10. **No Error Boundaries** (`App.js:54`)
    - No error boundary components
    - App crashes on unhandled errors

11. **Silent Failure** (`App.js:65`)
    - Empty catch block
    - Errors are ignored

12. **No Input Sanitization** (`App.js:78`)
    - User input not sanitized
    - Potential XSS vulnerabilities

13. **Password Visible in Plain Text** (`App.js:88`)
    - secureTextEntry set to false
    - Passwords visible while typing

---

## Angular Application (`angular-app/`)

### Security Issues

1. **Hardcoded API Endpoint and Credentials** (`app.component.ts:4-5`)
   - API URL and key hardcoded in component
   - Should use environment configuration

2. **Exposing API Key in Requests** (`app.component.ts:40`, `app.component.ts:55`, `app.component.ts:70`)
   - API key in HTTP headers
   - Should use secure authentication

3. **Sending Passwords in Plain Text** (`app.component.ts:55`)
   - Password transmitted without encryption
   - Should use proper encryption

4. **XSS Vulnerability** (`app.component.ts:80`)
   - Direct rendering of user input without sanitization
   - Should use Angular's DomSanitizer

5. **Insecure Random Number Generation** (`app.component.ts:85`)
   - Math.random() for session IDs
   - Should use crypto.getRandomValues()

6. **Storing Sensitive Data in localStorage** (`app.component.ts:90`)
   - Passwords stored in plain text in localStorage
   - Should use encrypted storage or avoid storing passwords

7. **No CSRF Protection** (`app.component.ts:95`)
   - No CSRF tokens in requests
   - Vulnerable to cross-site request forgery

8. **Missing Content Security Policy** (`app.component.ts:96`)
   - No CSP headers configured
   - Vulnerable to XSS attacks

### Code Quality Issues

9. **No Error Handling** (`app.component.ts:35`, `app.component.ts:50`, `app.component.ts:65`)
   - HTTP requests without error handling
   - No user feedback on failures

10. **No Input Validation** (`app.component.ts:48`)
    - No validation on form inputs
    - Should use Angular validators

11. **No Authorization Checks** (`app.component.ts:64`)
    - Delete operation without authorization
    - Anyone can delete users

12. **No Rate Limiting** (`app.component.ts:97`)
    - API calls not rate-limited
    - Vulnerable to abuse

---

## Summary by Category

### Critical Security Issues
- SQL Injection vulnerabilities (3 instances in .NET)
- Hardcoded credentials/API keys (6 instances across projects)
- Plain text password storage/transmission (5 instances)
- Missing authorization (3 instances)
- XSS vulnerabilities (2 instances)

### High Priority Issues
- Exception swallowing (3 instances)
- No input validation (5 instances)
- Insecure random number generation (2 instances)
- Exposing sensitive data (3 instances)

### Code Quality Issues
- No dependency injection (1 instance)
- Magic numbers (1 instance)
- No error handling (6 instances)
- Missing cleanup/error boundaries (2 instances)
- No CSRF protection (1 instance)
- Missing Content Security Policy (1 instance)

### Total Issues: 50+

---

## Testing Instructions

1. Review each project's code for the listed issues
2. Check if the PR review tool identifies:
   - Security vulnerabilities
   - Code smells
   - Best practice violations
   - Performance issues
3. Verify that the tool provides actionable recommendations
4. Test the tool's ability to categorize issues by severity

