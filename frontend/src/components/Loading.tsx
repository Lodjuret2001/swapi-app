import { useState } from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  return <>{isLoading && <div className="animate-spin"></div>}</>;
};

export default Loading;
