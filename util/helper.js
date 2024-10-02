const responseHelper = (res, status,  success,message, otherData = {}) => {
    res.status(status).json({
      success,
      message,
      ...otherData,
    });
  };
  
  export { responseHelper };
  