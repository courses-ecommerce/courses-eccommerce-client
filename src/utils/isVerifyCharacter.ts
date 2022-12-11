const isVerifyCharacter = {
  isGender: (name?: boolean) => {
    if (!name) return "Chưa thiết lập giới tính";
    return name ? "Nam" : "Nữ";
  },

  isEmail: (email: string) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
};

export default isVerifyCharacter;
