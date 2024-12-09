import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface TitleAttributes {
  title: string;
}

const useTitle: React.FC<TitleAttributes> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
};

export default useTitle;
