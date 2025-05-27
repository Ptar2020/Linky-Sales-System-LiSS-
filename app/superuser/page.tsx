import { Suspense } from "react";
import SuperuserPage from "./superuser";

// export const generateMetadata = () => :Metadata {
//   return {title:"Superuser page"}
// }

const Superuser = () => {
  return (
    <Suspense fallback={<div>Loading superuser page...</div>}>
      <SuperuserPage />
    </Suspense>
  );
};

export default Superuser;
