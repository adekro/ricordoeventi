import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignIn, useUser } from "@clerk/clerk-react";
import GoogleDriver from "../components/GoogleDriver";

const Test = () => {
  const [countries, setCountries] = useState([]);
  const supabase = createClient(
    "https://izwfoswztmmeomgskwyj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6d2Zvc3d6dG1tZW9tZ3Nrd3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MzE1MjMsImV4cCI6MjAzMTUwNzUyM30.uar5s-d2O4ghFF9hpZMSfWtipFpp8Dy5NIuAK1MYgrE"
  );

  const { user } = useUser();

  useEffect(() => {
    getCountries();
  }, []);

  if (!user) {
    return <SignIn />;
  }

  console.log(user.id, "user");

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <>
      <label>{user.id}</label>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
      <GoogleDriver></GoogleDriver>
    </>
  );
};

export default Test;
