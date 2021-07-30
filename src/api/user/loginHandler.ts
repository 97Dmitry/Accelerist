export const login = async (data: { email: string; password: string }) => {
  const contents = await fetch(
    "https://accelerist.herokuapp.com/api/v1/auth/sign_in",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(contents);
  return contents;
};


