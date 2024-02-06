import * as userService from "../services/user-service.js";
import { setErrorResponse, setResponse } from "./response-handler.js";
import jwt from "jsonwebtoken";

export const login = async (request, response) => {
  try {
    const params = { ...request.body };
    const user = await userService.searchByEmail(params);

    if (user && params.currentPassword === user.currentPassword) {
      // create token
      const payload ={ id: user._id, email: user.email, password: user.currentPassword, type: user.userType }; 
      const token = jwt.sign(payload,"secretEncryptKey",{ expiresIn: '30m' })

      // send it in the response
      setResponse({ token }, response);
    } else {
      setErrorResponse('401', "Invalid credentials", response);
    }
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse('500', e, response);
  }
};
