import authJwt from "./authJwt";
import verifySignup from "./verifySignup";

const middleware = {
  authJwt,
  verifySignup,
};

export default middleware;
