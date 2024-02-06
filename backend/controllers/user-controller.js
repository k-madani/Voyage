import * as userService from "../services/user-service.js";
import { validateUser } from "../validate/validation.js";
import * as subsService from "../services/subscribers-service.js";
import { setErrorResponse, setResponse } from "./response-handler.js";
import * as subs from '../controllers/subscriber-controller.js';

export const getUser = async (request, response) => {
  try {
    let user;

    // fetch query params
    const { email, id } = request.query;

    // check if we need to search data in db by email / id
    if (email && email !== null && email.trim() !== '') {
      user = await userService.searchByEmail({ email });
    } else {
      user = await userService.searchById({ id });
    }

    setResponse(user, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

export const createUser = async (request, response) => {
  try {
    const params = { ...request.body };
    // search if the user already exists
    const existingUser = await userService.searchByEmail(params);
    // if the user exists then throw error
    if (existingUser && Object.keys(existingUser).length()) {
      setErrorResponse('403', "User already exists.", response);
    } else {
      // validate user
      const validatedResult = validateUser(params);
      if (validatedResult.length === 0) {
        const newUser = await userService.create(params);

        const msgContent = `<div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #007bff;">Welcome to Voyage!</h2>
          <p>Dear ${params.firstName},</p>
          <p>Thank you for registering with us. We're excited to have you as part of our community!</p>
          <p>Explore our website and discover the latest updates and features. If you have any questions, feel free to reach out to our support team.</p>
          <p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p>
        </div>`;

        subsService.createSubscriber({ "email": params.email, "type": "voyager" });
        subs.sendEmail([params.email], "", msgContent);
        setResponse(newUser, response);
      } else {
        setErrorResponse('400', validatedResult, response);
      }
    }

  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

export const removeUser = async (request, response) => {
  try {
    const id = request.params.id;
    const registerUser = await userService.remove(id);
    setResponse({}, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

export const updateUser = async (request, response) => {
  try {
    const id = request.params.id;
    const params = { ...request.body };

    const validatedResult = validateUser(params);

    if (id && validatedResult.length === 0) {
      // update user in user db
      const updatedUser = await userService.update(params, id);
      setResponse(updatedUser, response);
    } else {
      setErrorResponse('400', validatedResult, response);
    }
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};

export const updatePassword = async(request,response) => {
  try{
    const params = {...request.body};
    const user = await userService.searchByEmail(params);
    if(!user.previousPasswords.includes(user.currentPassword)){
      user.previousPasswords.push(user.currentPassword);
    }

    if(user.previousPasswords.includes(params.currentPassword)){
      setErrorResponse('400', 'The password entered matches the previous passwords', response);
    } 

    user.currentPassword = params.currentPassword;

    const updatedUser = await userService.update(user,user._id);
    setResponse(updatedUser,response);
  } catch (err){
    setErrorResponse('500',err,response);
  }
}