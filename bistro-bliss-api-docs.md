# Bistro Bliss API Documentation

> **Base URL:** `http://localhost:3001`
> **API Prefix:** `/api`
> **Authentication:** Bearer Token (JWT) — returned on login/register, valid for **30 days**.

---

## Authentication

Protected endpoints require the following HTTP header:

```
Authorization: Bearer <your_token_here>
```

---

## Modules

| Module | Base Path | Description |
|---|---|---|
| Auth | `/api/auth` | Register, login, and manage user profile |
| Menu | `/api/menu` | Public menu listing; admin CRUD |
| Bookings | `/api/bookings` | Table reservations for users and admin |
| Users | `/api/users` | Admin-only user management |

---

## 1. Auth

### 1.1 Register User

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/auth/register` |
| **Access** | Public |

**Request Body** (`application/json`):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

> **Note:** If the email contains the word `admin`, the user will be assigned the `admin` role automatically.

**Success Response** `201 Created`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": null,
  "address": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `400` | `"User already exists"` |
| `400` | `"Invalid user data"` |
| `500` | `"<server error message>"` |

---

### 1.2 Login User

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/auth/login` |
| **Access** | Public |

**Request Body** (`application/json`):

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response** `200 OK`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "01012345678",
  "address": "123 Main St, Cairo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Invalid email or password"` |
| `500` | `"<server error message>"` |

---

### 1.3 Get User Profile

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/auth/profile` |
| **Access** | Private (requires JWT) |

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response** `200 OK`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "01012345678",
  "address": "123 Main St, Cairo"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `404` | `"User not found"` |
| `500` | `"<server error message>"` |

---

### 1.4 Update User Profile

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `/api/auth/profile` |
| **Access** | Private (requires JWT) |

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body** (`application/json`) — all fields optional:

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "01098765432",
  "address": "456 New St, Alexandria",
  "password": "newpassword123"
}
```

**Success Response** `200 OK`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "user",
  "phone": "01098765432",
  "address": "456 New St, Alexandria",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `404` | `"User not found"` |
| `500` | `"<server error message>"` |

---

## 2. Menu

### 2.1 Get All Menu Items

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/menu` |
| **Access** | Public |

**Success Response** `200 OK`:

```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Classic Burger",
    "price": 89,
    "img": "https://example.com/burger.jpg",
    "category": "Main Dishes",
    "description": "Made with fresh, premium ingredients to satisfy your cravings.",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Category Enum Values:** `Breakfast` | `Main Dishes` | `Drinks` | `Desserts`

---

### 2.2 Create Menu Item

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/menu` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body** (`application/json`):

```json
{
  "name": "Grilled Salmon",
  "price": 145,
  "img": "https://example.com/salmon.jpg",
  "category": "Main Dishes",
  "description": "Fresh Atlantic salmon grilled to perfection."
}
```

**Success Response** `201 Created`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
  "name": "Grilled Salmon",
  "price": 145,
  "img": "https://example.com/salmon.jpg",
  "category": "Main Dishes",
  "description": "Fresh Atlantic salmon grilled to perfection.",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `400` | `"<validation error>"` |
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |

---

### 2.3 Update Menu Item

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `/api/menu/:id` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameter:** `:id` — the MongoDB `_id` of the menu item

**Request Body** (`application/json`) — all fields optional:

```json
{
  "name": "Grilled Salmon Deluxe",
  "price": 165,
  "img": "https://example.com/salmon-deluxe.jpg",
  "category": "Main Dishes",
  "description": "Upgraded with truffle butter sauce."
}
```

**Success Response** `200 OK`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
  "name": "Grilled Salmon Deluxe",
  "price": 165,
  "img": "https://example.com/salmon-deluxe.jpg",
  "category": "Main Dishes",
  "description": "Upgraded with truffle butter sauce.",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `404` | `"Menu item not found"` |
| `500` | `"<server error message>"` |

---

### 2.4 Delete Menu Item

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `/api/menu/:id` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameter:** `:id` — the MongoDB `_id` of the menu item

**Success Response** `200 OK`:

```json
{
  "message": "Menu item removed"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `404` | `"Menu item not found"` |
| `500` | `"<server error message>"` |

---

## 3. Bookings

### 3.1 Create Booking

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/bookings` |
| **Access** | Private (requires JWT) |

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body** (`application/json`):

```json
{
  "name": "John Doe",
  "phone": "01012345678",
  "date": "2024-02-14",
  "time": "19:00",
  "totalPerson": "4"
}
```

**Success Response** `201 Created`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
  "user": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Doe",
  "phone": "01012345678",
  "date": "2024-02-14",
  "time": "19:00",
  "totalPerson": "4",
  "status": "pending",
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `400` | `"<validation error>"` |
| `401` | `"Not authorized, no token"` |

---

### 3.2 Get My Bookings

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/bookings/my-bookings` |
| **Access** | Private (requires JWT) |

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response** `200 OK`:

```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
    "user": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "phone": "01012345678",
    "date": "2024-02-14",
    "time": "19:00",
    "totalPerson": "4",
    "status": "pending",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
]
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `500` | `"<server error message>"` |

---

### 3.3 Get All Bookings (Admin)

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/bookings` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response** `200 OK`:

```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
    "user": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "name": "John Doe",
    "phone": "01012345678",
    "date": "2024-02-14",
    "time": "19:00",
    "totalPerson": "4",
    "status": "pending",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
]
```

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `500` | `"<server error message>"` |

---

### 3.4 Update Booking Status (Admin)

| Field | Value |
|---|---|
| **Method** | `PATCH` |
| **URL** | `/api/bookings/:id/status` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameter:** `:id` — the MongoDB `_id` of the booking

**Request Body** (`application/json`):

```json
{
  "status": "accepted"
}
```

> **Valid status values:** `pending` | `accepted` | `rejected`

**Success Response** `200 OK`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
  "user": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Doe",
  "phone": "01012345678",
  "date": "2024-02-14",
  "time": "19:00",
  "totalPerson": "4",
  "status": "accepted",
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T13:00:00.000Z"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `400` | `"Invalid booking status"` |
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `404` | `"Booking not found"` |
| `500` | `"<server error message>"` |

---

## 4. Users (Admin Only)

### 4.1 Get All Users

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/users` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response** `200 OK`:

```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "01012345678",
    "address": "123 Main St, Cairo",
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-10T08:00:00.000Z"
  }
]
```

> **Note:** The `password` field is excluded from this response.

**Error Responses:**

| Status | Message |
|---|---|
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `500` | `"<server error message>"` |

---

### 4.2 Toggle User Role

| Field | Value |
|---|---|
| **Method** | `PATCH` |
| **URL** | `/api/users/:id/role` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameter:** `:id` — the MongoDB `_id` of the user to toggle

> Toggles between `user` and `admin`. An admin cannot toggle their own role.

**Success Response** `200 OK`:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `400` | `"You cannot change your own role"` |
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `404` | `"User not found"` |
| `500` | `"<server error message>"` |

---

### 4.3 Delete User

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `/api/users/:id` |
| **Access** | Private/Admin |

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameter:** `:id` — the MongoDB `_id` of the user to delete

> An admin cannot delete their own account.

**Success Response** `200 OK`:

```json
{
  "message": "User removed successfully"
}
```

**Error Responses:**

| Status | Message |
|---|---|
| `400` | `"You cannot delete yourself"` |
| `401` | `"Not authorized, no token"` |
| `403` | `"Not authorized as an admin"` |
| `404` | `"User not found"` |
| `500` | `"<server error message>"` |

---

## Quick Reference — All Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and get token |
| `GET` | `/api/auth/profile` | Private | Get current user profile |
| `PUT` | `/api/auth/profile` | Private | Update current user profile |
| `GET` | `/api/menu` | Public | Get all menu items |
| `POST` | `/api/menu` | Admin | Create a menu item |
| `PUT` | `/api/menu/:id` | Admin | Update a menu item |
| `DELETE` | `/api/menu/:id` | Admin | Delete a menu item |
| `POST` | `/api/bookings` | Private | Create a table booking |
| `GET` | `/api/bookings/my-bookings` | Private | Get current user's bookings |
| `GET` | `/api/bookings` | Admin | Get all bookings |
| `PATCH` | `/api/bookings/:id/status` | Admin | Update booking status |
| `GET` | `/api/users` | Admin | Get all users |
| `PATCH` | `/api/users/:id/role` | Admin | Toggle user role |
| `DELETE` | `/api/users/:id` | Admin | Delete a user |

---

## Data Models

### User
```json
{
  "_id": "string (ObjectId)",
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (hashed, never returned)",
  "role": "string (enum: user | admin)",
  "phone": "string (optional)",
  "address": "string (optional)",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

### MenuItem
```json
{
  "_id": "string (ObjectId)",
  "name": "string (required)",
  "price": "number (required)",
  "img": "string (required, URL or path)",
  "category": "string (enum: Breakfast | Main Dishes | Drinks | Desserts)",
  "description": "string (optional, has default)",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

### Booking
```json
{
  "_id": "string (ObjectId)",
  "user": "string (ObjectId ref to User)",
  "name": "string (required)",
  "phone": "string (required)",
  "date": "string (required, e.g. '2024-02-14')",
  "time": "string (required, e.g. '19:00')",
  "totalPerson": "string (required, e.g. '4')",
  "status": "string (enum: pending | accepted | rejected, default: pending)",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```
