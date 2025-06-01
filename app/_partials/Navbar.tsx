"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../_utils/AuthProvider";
import { showSuccessMsg, showErrorMsg } from "../_utils/Alert";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

interface User {
  _id?: string;
  username?: string;
  is_superuser?: boolean;
  business?: {
    _id?: string;
    name?: string;
  };
}

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const logOut = async () => {
    const confirmed = await swal({
      title: "Confirm to log out",
      icon: "warning",
      dangerMode: true,
    });

    if (confirmed) {
      try {
        const res = await fetch("/api/user/logout", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setUser(null);
        showSuccessMsg(data.success);
        router.push("/login");
      } catch (error) {
        showErrorMsg(
          error instanceof Error ? error.message : "Error logging out"
        );
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".navbar")) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${menuOpen ? "navbar-menu-open" : ""}`}>
          <div className="nav-links">
            <Link className="nav-link" href="/">
              {user?.business?.name}
            </Link>
            <Link
              className="nav-link"
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            {user && (
              <>
                <Link
                  className="nav-link"
                  href={`/product/${user?.business?._id}`}
                  title="All the business products."
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  className="nav-link"
                  href={`/sales/${user?._id}`}
                  title="All my product sales."
                  onClick={() => setMenuOpen(false)}
                >
                  MySales
                </Link>
              </>
            )}
            {user?.is_superuser && (
              <Link
                className="nav-link"
                href="/superuser"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user?._id ? (
              <button
                onClick={() => {
                  logOut();
                  setMenuOpen(false);
                }}
                className="nav-link"
              >
                Logout ({user?.username})
              </button>
            ) : (
              <Link
                className="nav-link"
                href="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useAuth } from "../_utils/AuthProvider";
// import { showSuccessMsg, showErrorMsg } from "../_utils/Alert";
// import { useRouter } from "next/navigation";

// const Navbar = () => {
//   const { user, setUser } = useAuth();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const logOut = async () => {
//     const confirmed = await swal({
//       title: "Confirm to log out",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     });

//     if (confirmed) {
//       try {
//         const res = await fetch("/api/user/logout", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });
//         const data = await res.json();
//         setUser(null);
//         showSuccessMsg(data.success);
//       } catch (error) {
//         showErrorMsg(
//           error instanceof Error ? error.message : "Error logging out"
//         );
//       }
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!(event.target as HTMLElement).closest(".navbar")) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [menuOpen]);

//   return (
//     <nav className="navbar bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Brand Logo */}
//         <Link className="text-xl font-bold" href="/">
//           {user?.business.name}
//         </Link>

//         {/* Hamburger Button */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             />
//           </svg>
//         </button>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             menuOpen ? "block" : "hidden"
//           } md:flex md:items-center w-full md:w-auto absolute md:static top-16 left-0 bg-gray-800 md:bg-transparent z-10`}
//         >
//           <div className="flex flex-col md:flex-row md:space-x-4 p-4 md:p-0">
//             <Link
//               className="py-2 md:py-0 hover:text-gray-300"
//               href="/about"
//               onClick={() => setMenuOpen(false)}
//             >
//               About
//             </Link>
//             {user && (
//               <>
//                 <Link
//                   className="py-2 md:py-0 hover:text-gray-300"
//                   href={`/product/${user?.business?._id}`}
//                   title="All the business products."
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Products
//                 </Link>
//                 <Link
//                   className="py-2 md:py-0 hover:text-gray-300"
//                   href={`/sales/${user?._id}`}
//                   title="All my product sales."
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   MySales
//                 </Link>
//               </>
//             )}
//             {user?.is_superuser && (
//               <Link
//                 className="py-2 md:py-0 hover:text-gray-300"
//                 href="/superuser"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Superuser
//               </Link>
//             )}
//             {user?._id ? (
//               <button
//                 onClick={() => {
//                   logOut();
//                   setMenuOpen(false);
//                 }}
//                 className="py-2 md:py-0 hover:text-gray-300 text-left"
//               >
//                 Logout ({user?.username})
//               </button>
//             ) : (
//               <Link
//                 className="py-2 md:py-0 hover:text-gray-300"
//                 href="/login"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useAuth } from "../_utils/AuthProvider";
// import { showSuccessMsg, showErrorMsg } from "../_utils/Alert";
// import { useRouter } from "next/navigation";

// const Navbar = () => {
//   const { user, setUser } = useAuth();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const logOut = async () => {
//     const confirmed = await swal({
//       title: "Confirm to log out",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     });

//     if (confirmed) {
//       try {
//         const res = await fetch("/api/user/logout", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });
//         const data = await res.json();
//         setUser(null);
//         showSuccessMsg(data.success);
//       } catch (error) {
//         showErrorMsg(
//           error instanceof Error ? error.message : "Error logging out"
//         );
//       }
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!(event.target as HTMLElement).closest(".navbar")) {
//         setMenuOpen(false);
//       }
//     };

//     if (menuOpen) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [menuOpen]);

//   return (
//     <div className="header">
//       <Link className="nav-link" href="/">
//         {user?.business.name}
//       </Link>

//       <Link className="nav-link" href="/about">
//         About
//       </Link>
//       {user && (
//         <>
//           <Link
//             className="nav-link"
//             href={`/product/${user?.business?._id}`}
//             title="All the business products. "
//           >
//             Products
//           </Link>
//           <Link
//             className="nav-link"
//             href={`/sales/${user?._id}`}
//             title="All my product sales. "
//           >
//             MySales
//           </Link>
//         </>
//       )}

//       {user?.is_superuser && (
//         <Link className="nav-link" href={"/superuser"}>
//           Superuser
//         </Link>
//       )}

//       {user?._id ? (
//         <button onClick={logOut} className="nav-link">
//           Logout ({user?.username})
//         </button>
//       ) : (
//         <Link className="nav-link" href="/login">
//           Login
//         </Link>
//       )}
//       <hr />
//     </div>
//   );
// };
// export default Navbar;
