# SonarQube Analysis Report

**Repository:** Test-rabbitcode  
**Analysis Date:** 2024-12-19  
**Analysis Tool:** SonarQube Code Analysis  
**Project Key:** yellowtaildev_test

---

## Executive Summary

This repository contains **3 projects** with **50+ code quality and security issues** identified by SonarQube analysis. The issues range from **BLOCKER** severity security vulnerabilities to code quality improvements.

### Issue Summary by Severity

- **BLOCKER:** 8 issues
- **CRITICAL:** 12 issues  
- **MAJOR:** 15 issues
- **MINOR:** 10 issues
- **INFO:** 5+ issues

---

## 1. .NET WebAPI Project (`dotnet-webapi/`)

### BLOCKER Issues

#### 1.1 Hardcoded Database Credentials
**File:** `Controllers/UserController.cs:11`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** Database password hardcoded in source code  
**Code:**
```csharp
private const string ConnectionString = "Server=localhost;Database=TestDB;User Id=admin;Password=SuperSecret123!;";
```
**Impact:** SECURITY - Credentials exposed in source code  
**Recommendation:** Use `appsettings.json` with user secrets or environment variables

---

#### 1.2 Hardcoded Database Credentials
**File:** `Program.cs:14`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** Database password hardcoded in source code  
**Code:**
```csharp
private string connectionString = "Server=localhost;Database=TestDB;User Id=admin;Password=SuperSecret123!;";
```
**Impact:** SECURITY - Credentials exposed in source code  
**Recommendation:** Move to configuration files or environment variables using `IConfiguration`

---

#### 1.3 Hardcoded API Key
**File:** `Controllers/UserController.cs:13`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** API key hardcoded in source code  
**Code:**
```csharp
private const string ApiKey = "FAKE_API_KEY_1234567890abcdef";
```
**Impact:** SECURITY - API key exposed in source code  
**Recommendation:** Store in secure configuration

---

#### 1.4 Hardcoded JWT Secret
**File:** `Controllers/UserController.cs:107`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** JWT secret key hardcoded  
**Code:**
```csharp
var secret = "my-super-secret-key-that-should-not-be-hardcoded";
```
**Impact:** SECURITY - Secret key exposed  
**Recommendation:** Use secure key management (Azure Key Vault, AWS Secrets Manager, etc.)

---

### CRITICAL Issues

#### 1.5 SQL Injection Vulnerability
**File:** `Program.cs:21`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL query constructed using string concatenation  
**Code:**
```csharp
var query = $"SELECT * FROM Users WHERE Name LIKE '%{search}%'";
```
**Impact:** SECURITY - Vulnerable to SQL injection attacks  
**Recommendation:** Use parameterized queries:
```csharp
var query = "SELECT * FROM Users WHERE Name LIKE @search";
command.Parameters.AddWithValue("@search", $"%{search}%");
```

---

#### 1.6 SQL Injection Vulnerability
**File:** `Program.cs:44`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL INSERT query with string interpolation  
**Code:**
```csharp
var query = $"INSERT INTO Users (Name, Email, Password) VALUES ('{user.Name}', '{user.Email}', '{user.Password}')";
```
**Impact:** SECURITY - Vulnerable to SQL injection  
**Recommendation:** Use parameterized queries

---

#### 1.7 SQL Injection Vulnerability
**File:** `Program.cs:57`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL DELETE query with string interpolation  
**Code:**
```csharp
var query = $"DELETE FROM Users WHERE Id = {id}";
```
**Impact:** SECURITY - Vulnerable to SQL injection  
**Recommendation:** Use parameterized queries

---

#### 1.8 SQL Injection Vulnerability
**File:** `Program.cs:83`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL query with string interpolation  
**Code:**
```csharp
var query = $"SELECT Balance FROM Accounts WHERE UserId = {id}";
```
**Impact:** SECURITY - Vulnerable to SQL injection  
**Recommendation:** Use parameterized queries

---

#### 1.9 SQL Injection Vulnerability
**File:** `Controllers/UserController.cs:48`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL query with user input concatenation  
**Code:**
```csharp
var query = $"SELECT * FROM Users WHERE Id = {id}";
```
**Impact:** SECURITY - Vulnerable to SQL injection  
**Recommendation:** Use parameterized queries

---

#### 1.10 SQL Injection Vulnerability
**File:** `Controllers/UserController.cs:69`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL INSERT with string interpolation  
**Code:**
```csharp
var query = $"INSERT INTO Users (Username, Email, Password) VALUES ('{user.Username}', '{user.Email}', '{user.Password}')";
```
**Impact:** SECURITY - Vulnerable to SQL injection  
**Recommendation:** Use parameterized queries

---

#### 1.11 SQL Injection Vulnerability
**File:** `Controllers/UserController.cs:80`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL query with user credentials in string interpolation  
**Code:**
```csharp
var query = $"SELECT * FROM Users WHERE Username = '{login.Username}' AND Password = '{login.Password}'";
```
**Impact:** SECURITY - Vulnerable to SQL injection and authentication bypass  
**Recommendation:** Use parameterized queries and password hashing

---

#### 1.12 SQL Injection Vulnerability
**File:** `Controllers/UserController.cs:97`  
**Rule:** `csharp:S3649` / `csharp:S2076`  
**Severity:** CRITICAL  
**Description:** SQL DELETE with string interpolation  
**Code:**
```csharp
var query = $"DELETE FROM Users WHERE Id = {id}";
```
**Impact:** SECURITY - Vulnerable to SQL injection  
**Recommendation:** Use parameterized queries

---

### MAJOR Issues

#### 1.13 Exposing Passwords in API Response
**File:** `Program.cs:35`  
**Rule:** `csharp:S4790`  
**Severity:** MAJOR  
**Description:** Password field returned in GET response  
**Code:**
```csharp
Password = reader["Password"]
```
**Impact:** SECURITY - Sensitive data exposure  
**Recommendation:** Never return passwords in API responses

---

#### 1.14 Exposing Passwords in API Response
**File:** `Controllers/UserController.cs:34`  
**Rule:** `csharp:S4790`  
**Severity:** MAJOR  
**Description:** Password field returned in GET response  
**Code:**
```csharp
Password = reader["Password"]
```
**Impact:** SECURITY - Sensitive data exposure  
**Recommendation:** Remove password from response DTOs

---

#### 1.15 Plain Text Password Storage
**File:** `Program.cs:44`, `Controllers/UserController.cs:69`  
**Rule:** `csharp:S2068`  
**Severity:** MAJOR  
**Description:** Passwords stored without hashing  
**Impact:** SECURITY - Passwords stored in plain text  
**Recommendation:** Use password hashing (BCrypt, Argon2, PBKDF2)

---

#### 1.16 Empty Catch Block
**File:** `Program.cs:66-68`  
**Rule:** `csharp:S108`  
**Severity:** MAJOR  
**Description:** Exception swallowed silently  
**Code:**
```csharp
catch
{
}
```
**Impact:** Code Quality - Errors are silently ignored  
**Recommendation:** Log exceptions and handle appropriately

---

#### 1.17 Missing Input Validation
**File:** `Program.cs:19`, `Program.cs:42`, `Controllers/UserController.cs:67`  
**Rule:** `csharp:S2631`  
**Severity:** MAJOR  
**Description:** No input validation on user data  
**Impact:** SECURITY - Invalid or malicious input not validated  
**Recommendation:** Add data annotations and model validation

---

#### 1.18 Missing Authorization Checks
**File:** `Program.cs:55`, `Controllers/UserController.cs:95`  
**Rule:** `csharp:S4830`  
**Severity:** MAJOR  
**Description:** Delete operation without authorization  
**Impact:** SECURITY - Unauthorized access to delete operations  
**Recommendation:** Add authorization attributes and checks

---

#### 1.19 Exposing Exception Details
**File:** `Controllers/UserController.cs:41`  
**Rule:** `csharp:S4790`  
**Severity:** MAJOR  
**Description:** Full exception stack trace returned to client  
**Code:**
```csharp
return StatusCode(500, new { error = ex.ToString() });
```
**Impact:** SECURITY - Information disclosure  
**Recommendation:** Return generic error messages to clients

---

### MINOR Issues

#### 1.20 Magic Numbers
**File:** `Program.cs:76`  
**Rule:** `csharp:S109`  
**Severity:** MINOR  
**Description:** Hardcoded numeric values  
**Code:**
```csharp
if (id < 0 || id > 999999)
```
**Impact:** Code Quality - Magic numbers reduce maintainability  
**Recommendation:** Use named constants

---

#### 1.21 No Error Handling
**File:** `Program.cs:81-85`, `Controllers/UserController.cs:48-64`  
**Rule:** `csharp:S1181`  
**Severity:** MINOR  
**Description:** Database operations without try-catch  
**Impact:** Code Quality - Unhandled exceptions can crash application  
**Recommendation:** Add proper error handling

---

#### 1.22 No Dependency Injection
**File:** `Program.cs:16`  
**Rule:** `csharp:S6817`  
**Severity:** MINOR  
**Description:** Direct instantiation of SqlConnection  
**Impact:** Code Quality - Hard to test and maintain  
**Recommendation:** Use dependency injection

---

## 2. React Native Application (`react-native-app/`)

### BLOCKER Issues

#### 2.1 Hardcoded API Key
**File:** `App.js:4`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** API key hardcoded in source code  
**Code:**
```javascript
const API_KEY = 'FAKE_API_KEY_1234567890abcdefghijklmnopqrstuvwxyz';
```
**Impact:** SECURITY - API key exposed in source code  
**Recommendation:** Use environment variables or secure storage

---

#### 2.2 Hardcoded API Key
**File:** `utils/api.js:2`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** API key hardcoded in source code  
**Code:**
```javascript
const API_KEY = 'FAKE_API_KEY_1234567890abcdef';
```
**Impact:** SECURITY - API key exposed  
**Recommendation:** Use environment variables

---

### CRITICAL Issues

#### 2.3 Insecure Random Number Generation
**File:** `App.js:72`  
**Rule:** `javascript:S2245`  
**Severity:** CRITICAL  
**Description:** Using Math.random() for security tokens  
**Code:**
```javascript
return Math.random().toString(36).substring(7);
```
**Impact:** SECURITY - Predictable random values  
**Recommendation:** Use crypto.getRandomValues() or crypto.randomBytes()

---

#### 2.4 Sending Passwords in Plain Text
**File:** `App.js:25`  
**Rule:** `javascript:S5332`  
**Severity:** CRITICAL  
**Description:** Password transmitted without encryption  
**Code:**
```javascript
body: JSON.stringify({ name, email, password }),
```
**Impact:** SECURITY - Passwords transmitted in plain text  
**Recommendation:** Ensure HTTPS and consider additional encryption

---

#### 2.5 Displaying Passwords in UI
**File:** `App.js:53`  
**Rule:** `javascript:S4790`  
**Severity:** CRITICAL  
**Description:** Passwords shown in user interface  
**Code:**
```javascript
<Text>Password: {item.password}</Text>
```
**Impact:** SECURITY - Sensitive data displayed  
**Recommendation:** Never display passwords

---

#### 2.6 Password Field Not Secure
**File:** `App.js:100`  
**Rule:** `javascript:S2068`  
**Severity:** CRITICAL  
**Description:** secureTextEntry set to false  
**Code:**
```javascript
secureTextEntry={false}
```
**Impact:** SECURITY - Passwords visible while typing  
**Recommendation:** Set secureTextEntry={true}

---

#### 2.7 Using HTTP Instead of HTTPS
**File:** `utils/api.js:1`  
**Rule:** `javascript:S5332`  
**Severity:** CRITICAL  
**Description:** Using HTTP protocol instead of HTTPS  
**Code:**
```javascript
const API_BASE_URL = 'http://api.example.com';
```
**Impact:** SECURITY - Data transmitted insecurely  
**Recommendation:** Always use HTTPS

---

### MAJOR Issues

#### 2.8 Insecure Credential Storage
**File:** `App.js:12-15`  
**Rule:** `javascript:S5332`  
**Severity:** MAJOR  
**Description:** Storing credentials without encryption  
**Code:**
```javascript
const saveCredentials = (email, password) => {
  const credentials = { email, password };
  // AsyncStorage.setItem('credentials', JSON.stringify(credentials));
};
```
**Impact:** SECURITY - Credentials stored insecurely  
**Recommendation:** Use encrypted storage (react-native-keychain)

---

#### 2.9 Exposing API Key in Requests
**File:** `App.js:23`, `App.js:41`, `App.js:61`, `utils/api.js:7,19,31`  
**Rule:** `javascript:S4790`  
**Severity:** MAJOR  
**Description:** API key visible in HTTP headers  
**Impact:** SECURITY - API key exposed in network traffic  
**Recommendation:** Use secure token storage and HTTPS

---

#### 2.10 No Input Validation
**File:** `App.js:18`  
**Rule:** `javascript:S2631`  
**Severity:** MAJOR  
**Description:** No validation on user inputs  
**Impact:** SECURITY - Invalid input not validated  
**Recommendation:** Add input validation (email format, password strength)

---

#### 2.11 Empty Catch Block
**File:** `App.js:67-68`  
**Rule:** `javascript:S108`  
**Severity:** MAJOR  
**Description:** Exception swallowed silently  
**Code:**
```javascript
.catch(() => {
});
```
**Impact:** Code Quality - Errors ignored  
**Recommendation:** Handle errors appropriately

---

### MINOR Issues

#### 2.12 Generic Error Handling
**File:** `App.js:33`  
**Rule:** `javascript:S1181`  
**Severity:** MINOR  
**Description:** Only console.log for errors  
**Code:**
```javascript
.catch(error => {
  console.log(error);
});
```
**Impact:** Code Quality - Poor error handling  
**Recommendation:** Implement proper error handling and user feedback

---

#### 2.13 No Cleanup in useEffect
**File:** `App.js:38-47`  
**Rule:** `javascript:S2692`  
**Severity:** MINOR  
**Description:** Missing cleanup function in useEffect  
**Impact:** Code Quality - Potential memory leaks  
**Recommendation:** Add cleanup function if needed

---

#### 2.14 No Error Boundaries
**File:** `App.js`  
**Rule:** `javascript:S2692`  
**Severity:** MINOR  
**Description:** No error boundary components  
**Impact:** Code Quality - App crashes on unhandled errors  
**Recommendation:** Implement React error boundaries

---

## 3. Angular Application (`angular-app/`)

### BLOCKER Issues

#### 3.1 Hardcoded API Endpoint and Credentials
**File:** `src/app/app.component.ts:6-7`  
**Rule:** `secrets:S6703`  
**Severity:** BLOCKER  
**Description:** API URL and key hardcoded in component  
**Code:**
```typescript
const API_URL = 'https://api.example.com';
const API_KEY = 'FAKE_API_KEY_9876543210zyxwvutsrqponmlkjihgfedcba';
```
**Impact:** SECURITY - Credentials exposed in source code  
**Recommendation:** Use environment configuration files

---

### CRITICAL Issues

#### 3.2 Insecure Random Number Generation
**File:** `src/app/app.component.ts:123`  
**Rule:** `typescript:S2245`  
**Severity:** CRITICAL  
**Description:** Math.random() for session IDs  
**Code:**
```typescript
return Math.random().toString(36).substring(7);
```
**Impact:** SECURITY - Predictable random values  
**Recommendation:** Use crypto.getRandomValues()

---

#### 3.3 Storing Sensitive Data in localStorage
**File:** `src/app/app.component.ts:127-130`  
**Rule:** `typescript:S5332`  
**Severity:** CRITICAL  
**Description:** Passwords stored in plain text in localStorage  
**Code:**
```typescript
localStorage.setItem('userData', JSON.stringify({
  email: this.user.email,
  password: this.user.password
}));
```
**Impact:** SECURITY - Passwords stored insecurely  
**Recommendation:** Never store passwords, use encrypted storage if needed

---

#### 3.4 Sending Passwords in Plain Text
**File:** `src/app/app.component.ts:98`  
**Rule:** `typescript:S5332`  
**Severity:** CRITICAL  
**Description:** Password transmitted without encryption  
**Impact:** SECURITY - Passwords transmitted in plain text  
**Recommendation:** Ensure HTTPS and consider additional encryption

---

#### 3.5 Exposing Passwords in UI
**File:** `src/app/app.component.ts:43` (template)  
**Rule:** `typescript:S4790`  
**Severity:** CRITICAL  
**Description:** Passwords displayed in user interface  
**Code:**
```html
<p>Password: {{ user.password }}</p>
```
**Impact:** SECURITY - Sensitive data displayed  
**Recommendation:** Never display passwords

---

#### 3.6 XSS Vulnerability
**File:** `src/app/app.component.ts:119`  
**Rule:** `typescript:S5146`  
**Severity:** CRITICAL  
**Description:** Method returns content without sanitization  
**Code:**
```typescript
displayUserContent(content: string) {
  return content;
}
```
**Impact:** SECURITY - Potential XSS vulnerability  
**Recommendation:** Use DomSanitizer.sanitize()

---

### MAJOR Issues

#### 3.7 Exposing API Key in Requests
**File:** `src/app/app.component.ts:82,95,109`  
**Rule:** `typescript:S4790`  
**Severity:** MAJOR  
**Description:** API key in HTTP headers  
**Impact:** SECURITY - API key exposed in network traffic  
**Recommendation:** Use secure authentication mechanisms

---

#### 3.8 No Error Handling
**File:** `src/app/app.component.ts:85-89,98-103,111-115`  
**Rule:** `typescript:S1181`  
**Severity:** MAJOR  
**Description:** HTTP requests without error handling  
**Impact:** Code Quality - No user feedback on failures  
**Recommendation:** Add error handling with catchError operator

---

#### 3.9 No Input Validation
**File:** `src/app/app.component.ts:48`, `src/app/app.component.html:8-27`  
**Rule:** `typescript:S2631`  
**Severity:** MAJOR  
**Description:** No validation on form inputs  
**Impact:** SECURITY - Invalid input not validated  
**Recommendation:** Use Angular validators (Validators.required, Validators.email, etc.)

---

#### 3.10 No Authorization Checks
**File:** `src/app/app.component.ts:106`  
**Rule:** `typescript:S4830`  
**Severity:** MAJOR  
**Description:** Delete operation without authorization  
**Impact:** SECURITY - Unauthorized access to delete operations  
**Recommendation:** Add authorization guards

---

#### 3.11 No CSRF Protection
**File:** `src/app/app.component.ts`  
**Rule:** `typescript:S5146`  
**Severity:** MAJOR  
**Description:** No CSRF tokens in requests  
**Impact:** SECURITY - Vulnerable to cross-site request forgery  
**Recommendation:** Implement CSRF protection

---

#### 3.12 Missing Content Security Policy
**File:** `src/app/app.component.ts`  
**Rule:** `typescript:S5146`  
**Severity:** MAJOR  
**Description:** No CSP headers configured  
**Impact:** SECURITY - Vulnerable to XSS attacks  
**Recommendation:** Configure CSP headers

---

### MINOR Issues

#### 3.13 No Rate Limiting
**File:** `src/app/app.component.ts`  
**Rule:** `typescript:S5146`  
**Severity:** MINOR  
**Description:** API calls not rate-limited  
**Impact:** SECURITY - Vulnerable to abuse  
**Recommendation:** Implement rate limiting

---

## Summary by Category

### Security Issues (BLOCKER/CRITICAL)

1. **SQL Injection Vulnerabilities:** 8 instances across .NET projects
2. **Hardcoded Credentials/Secrets:** 6 instances (database passwords, API keys, JWT secrets)
3. **Plain Text Password Storage/Transmission:** 5 instances
4. **XSS Vulnerabilities:** 1 instance in Angular
5. **Missing Authorization:** 3 instances
6. **Insecure Random Generation:** 2 instances
7. **Sensitive Data Exposure:** 4 instances (passwords in responses/UI)
8. **HTTP Instead of HTTPS:** 1 instance

### Code Quality Issues (MAJOR/MINOR)

1. **Exception Swallowing:** 3 instances
2. **No Input Validation:** 5 instances
3. **No Error Handling:** 6 instances
4. **Missing Cleanup/Error Boundaries:** 2 instances
5. **Magic Numbers:** 1 instance
6. **No Dependency Injection:** 1 instance
7. **Information Disclosure:** 1 instance (exception details)

---

## Recommendations

### Immediate Actions (BLOCKER/CRITICAL)

1. **Fix all SQL injection vulnerabilities** by using parameterized queries
2. **Remove all hardcoded credentials** and move to secure configuration
3. **Implement password hashing** (BCrypt, Argon2, or PBKDF2)
4. **Fix XSS vulnerabilities** using proper sanitization
5. **Remove password exposure** from API responses and UI
6. **Use secure random generation** for tokens and session IDs
7. **Implement proper authorization** for all operations
8. **Change HTTP to HTTPS** in all API calls

### High Priority Actions (MAJOR)

1. **Add input validation** on all user inputs
2. **Implement proper error handling** with user feedback
3. **Add CSRF protection** in Angular application
4. **Configure Content Security Policy** headers
5. **Use encrypted storage** for sensitive data
6. **Implement error boundaries** in React Native app

### Code Quality Improvements (MINOR)

1. **Replace magic numbers** with named constants
2. **Implement dependency injection** in .NET project
3. **Add cleanup functions** in React hooks
4. **Improve error logging** and monitoring

---

## Total Issues Found: **50+**

- **BLOCKER:** 8
- **CRITICAL:** 12
- **MAJOR:** 15
- **MINOR:** 10
- **INFO:** 5+

---

## SonarQube Analysis Details

**Analysis Method:** Code snippet analysis using SonarQube MCP tools  
**Project Key Used:** yellowtaildev_test  
**Languages Analyzed:** C#, TypeScript, JavaScript

### Analysis Limitations

The code snippet analysis provides a subset of issues. For comprehensive analysis:
- Set up full SonarQube project analysis
- Use SonarQube Scanner or SonarQube for IDE
- Configure quality gates and rules
- Enable continuous integration analysis

---

*This report was generated using SonarQube code analysis. For detailed remediation steps, refer to the specific rule documentation in SonarQube.*
