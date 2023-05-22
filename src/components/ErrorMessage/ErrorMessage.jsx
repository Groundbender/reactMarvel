import gif from "./dog-computer.gif";

const ErrorMessage = () => {
  // достаем из папки public гифку
  // return <img src={process.env.PUBLIC_URL + "/dog-computer.gif"} alt="" />;

  return (
    <img
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      src={gif}
      alt=""
    />
  );
};

export default ErrorMessage;
