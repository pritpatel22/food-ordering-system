import React from "react";

const Activate = () => {
  function handleSubmit(e) {
    e.preventdefault();
  }
  return (
    <div>
      <div className="container auth__container">
        <h1 className="main__title">Activate Account</h1>

        {/* {isLoading && <Spinner />} */}

        <button
          className="btn btn-accent btn-activate-account"
          type="submit"
          onClick={handleSubmit}
        >
          Activate Account
        </button>
      </div>
    </div>
  );
};
export default Activate;
