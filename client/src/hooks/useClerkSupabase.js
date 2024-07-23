import { createClient } from "@supabase/supabase-js";
const useClerkSupabase = (clerk_id)=>{
    const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
    
    const getUserId= async ()=>{

        const {data,error} = await supabase.from("users").select("id").eq("user_id",clerk_id).single();

        return data.id;

    }

    return{
        getUserId
    }

}
export default useClerkSupabase;