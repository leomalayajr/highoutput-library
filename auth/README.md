# Auth

## Class: **Auth**

### **new Auth(options)**
* **options.secretKey** `string` Secret key to use in generating the JWT.
* **options.userModel** `UserModel` User model.
* **options.properyMap** `object` (Optional) An object specifying the property to use as `username` and `password`. Only applied if `options.userModel` is a `Mongoose` model.

#### Example
```javascript
import mongoose, { Schema } from 'mongoose';

const AccountModel = mongoose.model('Account', new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  }
}));

const auth = new Auth({
  secretKey: '4fb473f82ba47bf6acbab33e7529fb96',
  userModel: AccountModel,
  propertyMap: {
    username: 'email',
  },
});
```

### **auth.createJWT(claims)**
* **claims.sub** `string | number` ID of the owner of the JWT.
* **claims.exp** `number` (Optional) UNIX timestamp of the expiration time.
* Returns: **jwt** `string`

Create a json web token.

#### Example
```javascript
await auth.createJWT({
  sub: '507f1f77bcf86cd799439011',
  exp: 1524663851,
});
```

### **auth.verifyJWT(token, subject)**
* **token** `string` JWT.
* **subject** `string | number` (Optional) ID of the owner of the JWT.
* Returns: **claims** `object`

Verify and decode a json web token.

#### Example
```javascript
await auth.verifyJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWQ3MTZlZjc1ZTZhODc1MTQ0Y2Q0NDQiLCJpYXQiOjE1MjQ2MjYzNjMsImV4cCI6MTUyNTIzMTE2M30.z2xgs0BeLQsTBiG9sphjkP_JljYht2o4AgI4ClWgZqw', '507f1f77bcf86cd799439011');
```

### **auth.createPasswordHash(password)**
* **password** `string` Password.
* Returns: **hash** `string`

Generate a password hash.

#### Example
```javascript
await auth.createPasswordHash('123456Seven');
```

### **auth.comparePasswordHash(password, hash)**
* **password** `string` Password.
* **hash** `string` Password.
* Returns: **valid** `boolean`

Compare password to hash.

#### Example
```javascript
await auth.comparePasswordHash('123456Seven', '$2b$10$r9mOi7JbCEjhqCkxPVJXRedw2LPyWOp/gz8uAd7ELd35Qb5IGC3NO');
```

### **auth.createAccessToken(params)**
* **params.username** `string` Username.
* **params.password** `string` Password.
* **params.expiresIn** `string` (Optional) Amount of time before the **accessToken** expires. Must be compatible to the `ms` package.
* **params.claims** `object` (Optional) Additional claims to include in the JWT.
* Returns: **accessToken** `string`
* Throws:
  * `INVALID_CREDENTIALS`

Create an access token.

#### Example
```javascript
await auth.createAccessToken({
  username: 'roger',
  password: '123456Seven',
});
```

### **auth.verifyAccessToken(params)**
* **params.accessToken** `string` Access token.
* **params.subject** `string | number` (Optional) ID of the owner of the **accessToken**.
* Returns: **claims** `object` Claims stored in the JWT.
* Throws:
  * `INVALID_TOKEN`

Verify a json web token.

#### Example
```javascript
await auth.verifyAccessToken({
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWQ3MTZlZjc1ZTZhODc1MTQ0Y2Q0NDQiLCJpYXQiOjE1MjQ2MjYzNjMsImV4cCI6MTUyNTIzMTE2M30.z2xgs0BeLQsTBiG9sphjkP_JljYht2o4AgI4ClWgZqw',
});
```

### **auth.changePassword(params)**
* **params.accessToken** `string` Access token.
* **params.subject** `string | number` (Optional) ID of the owner of the **accessToken**.
* **params.oldPassword** `string` Old password.
* **params.newPassword** `string` New Password.
* Throws:
  * `INVALID_TOKEN`
  * `INVALID_CREDENTIALS`

Change the user password.

#### Example
```javascript
await auth.changePassword({
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWQ3MTZlZjc1ZTZhODc1MTQ0Y2Q0NDQiLCJpYXQiOjE1MjQ2MjYzNjMsImV4cCI6MTUyNTIzMTE2M30.z2xgs0BeLQsTBiG9sphjkP_JljYht2o4AgI4ClWgZqw',
  oldPassword: 'password',
  newPassword: '123456Seven',
});
```

### **auth.requestResetPassword(params)**
* **params.subject** `string | number` ID of the user requesting the password reset.
* **params.expiresIn** `string` (Optional) Amount of time before the **requestToken** expires.
* Returns: **requestToken** `string`
* Throws:
  * `USER_NOT_FOUND`

Request for a password reset.

#### Example
```javascript
await auth.requestResetPassword({
  subject: '507f1f77bcf86cd799439011',
});
```

### **auth.resetPassword(params)**
* **params.requestToken** `string` Request token.
* **params.subject** `string | number` (Optional) ID of the owner of the **requestToken**.
* **params.password** `string` New Password.
* Throws:
  * `INVALID_TOKEN`

Reset password.

#### Example
```javascript
await auth.resetPassword({
  requestToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWQ3MTZlZjc1ZTZhODc1MTQ0Y2Q0NDQiLCJpYXQiOjE1MjQ2MjYzNjMsImV4cCI6MTUyNTIzMTE2M30.z2xgs0BeLQsTBiG9sphjkP_JljYht2o4AgI4ClWgZqw',
  password: '123456Seven',
});
```

## Class: **UserModel**
The **UserModel** can be any of the following types:
* `Mongoose` model
* Custom object containing the following functions:
  * **findByUsername(username)** `Promise<{ id: string | number, password: string }>`
  * **findById(id)** `Promise<{ id: string | number, password: string }>`
  * **updatePassword(id, password)** `Promise<void>`

#### Example
```javascript
const bcrypt = require('bcrypt');
const R = require('ramda');

class UserModel {
  constructor() {
    this.users = [];
  }

  async insertUser(user) {
    this.users.push({
      ...user,
      password: await bcrypt.hash(user.password, 8),
    });
  }

  async findByUsername(username) {
    return R.find(R.propEq('username', username))(this.users);
  }

  async findById(id) {
    return R.find(R.propEq('id', id))(this.users);
  }

  async updatePassword(id, password) {
    const user = R.find(R.propEq('id', id))(this.users);

    if (!user) {
      return;
    }

    user.password = password;
  }
}
```