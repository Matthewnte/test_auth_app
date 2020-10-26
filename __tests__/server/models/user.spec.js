/**
 * @jest-environment node
 */
import User from '../../../server/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

describe('The user model', () => {
  // Create test user info
    const user = {
      name: 'John',
      email: 'test@test.com',
      password: 'test1234',
    };

    // Initialize a new user
    let newUser;

  beforeAll(async () => {
    // Establish mongoose connection
    await mongoose.connect('mongodb://localhost:27017/auth_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a new user
    newUser = await User.create(user);
  })

  it('should hash user password before saving to the database', async () => {
    // Test if the newUser password is hashed
    expect(bcrypt.compareSync(user.password, newUser.password)).toBe(true);
  });

  it('should set email confirm code before saving to the database', async () => {
    // Test expected value
    expect(newUser.emailConfirmCode).toEqual(expect.any(String));
  })

  afterAll(async () => {
    // close connection
    await mongoose.connection.close();
  })
});
