const authorize = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (allowedRoles.includes(userRole)) {
        next(); // User has the necessary role, continue to the next middleware
      } else {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
    };
  };
  
  module.exports = { authorize };
  