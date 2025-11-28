# Test-rabbitcode

This repository contains three intentionally flawed projects designed to test AI-powered PR review tools. Each project includes basic functionality with numerous code smells, security vulnerabilities, and anti-patterns.

## Projects

### 1. .NET WebAPI (`dotnet-webapi/`)
A basic REST API for user management with CRUD operations. Contains SQL injection vulnerabilities, hardcoded credentials, missing input validation, and other security issues.

**Key Issues:**
- SQL Injection vulnerabilities
- Hardcoded connection strings with credentials
- Plain text password storage
- Missing authorization checks
- Exception swallowing

### 2. React Native Application (`react-native-app/`)
A mobile application for user management. Contains hardcoded API keys, insecure storage, XSS vulnerabilities, and poor error handling.

**Key Issues:**
- Hardcoded API keys
- Insecure credential storage
- Plain text password transmission
- Missing input validation
- No error boundaries

### 3. Angular Application (`angular-app/`)
A web application for user management. Contains XSS vulnerabilities, insecure random generation, missing CSRF protection, and other security issues.

**Key Issues:**
- Hardcoded API credentials
- XSS vulnerabilities
- Insecure localStorage usage
- Missing CSRF protection
- No Content Security Policy

## Code Smells Checklist

See [CODE_SMELLS_CHECKLIST.md](./CODE_SMELLS_CHECKLIST.md) for a comprehensive list of all intentional code smells and security issues in each project.

## Usage

Each project can be used independently to test PR review tools:

1. Create a PR with changes to any of the projects
2. Run your AI PR review tool
3. Compare the findings against the checklist in `CODE_SMELLS_CHECKLIST.md`
4. Verify that the tool identifies the intentional issues

## Project Structure

```
.
├── dotnet-webapi/          # .NET 8.0 WebAPI project
├── react-native-app/       # React Native mobile app
├── angular-app/            # Angular 17 web application
├── CODE_SMELLS_CHECKLIST.md # Complete list of issues
└── README.md              # This file
```
