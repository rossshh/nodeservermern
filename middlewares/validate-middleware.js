const signupSchema=require('../validation/auth-validation');

const validate = (signupSchema) =>async(req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        const parseBody = await signupSchema.parseAsync(req.body);
        req.body = parseBody;
        next();
        
    } catch (err) {
        console.error('Validation Error:', err);
    const error = {
      status: 422,
      message: "Please fill input properly!",
      extraDetails: err.issues[0].message,
    };
    next(error); //Pass the error to the next middleware (error middleware)
  }
}
module.exports = validate;