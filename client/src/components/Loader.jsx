import { useContext } from "react";
import { Context } from "../AppWrapper";
import { Dna } from "react-loader-spinner";

const Loader = () => {
  const { loading } = useContext(Context);

  return (
    <Dna
      visible={loading}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Loader;
