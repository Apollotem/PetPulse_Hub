const auth = {
    onCheckOut: () => {
      // const adminId = JSON.parse(localStorage.getItem("adminId"));
      const adminId = localStorage.getItem("adminId")
      return adminId;
    },
  };
  
  export default auth;