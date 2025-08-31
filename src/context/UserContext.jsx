import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest"); // guest por defecto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // chequea si hay sesión activa
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);

      if (session?.user) {
        // 🔑 acá vamos a consultar el rol desde Supabase
        const { data, error } = await supabase
          .from("brand_members")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        if (error) {
          // si no existe en brand_members, chequeamos si es admin fijo
          const adminIds = [
            "5bb0ee89-c830-45bb-a226-10cadf335993", // juanbayala
            "f3ee597e-e4e7-44ee-b205-e087a329de98", // brickcontenidos
          ];
          if (adminIds.includes(session.user.id)) {
            setRole("admin");
          } else {
            setRole("user"); // usuario normal
          }
        } else {
          setRole(data.role);
        }
      } else {
        setRole("guest");
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
