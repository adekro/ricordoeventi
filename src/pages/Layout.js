import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const [userType, setUserType] = useState([]);
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
  );

  const { user } = useUser();

  useEffect(() => {
    getUserType();
  }, []);

  if (!user) {
    return <SignIn />;
  }

  console.log(user.id, "user");

  async function getUserType() {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id);
    setUserType(data);
  }

  return (
    <>
      {userType[0]?.user_type === 10 && <button>AREA ADMIN</button>}
      <label>{user.id}</label>
      <ul>
        {userType?.map((country) => (
          <li key={country.user_type}>{country.user_type}</li>
        ))}
      </ul>
    </>
  );
};
export default Layout;
