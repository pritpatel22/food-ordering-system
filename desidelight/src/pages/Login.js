// import { BiLogInCircle } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import { login, reset, getUserInfo } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";
import style from "./style.module.css";

const Login = () => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const { email, password } = formData;

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const userData = {
  //     email,
  //     password,
  //   };
  //   // dispatch(login(userData));
  // };

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSuccess || user) {
  //     navigate("/dashboard");
  //   }

  //   dispatch(reset());
  //   dispatch(getUserInfo());
  // }, [isError, isSuccess, user, navigate, dispatch]);
  // const { loginUser } = useContext(AuthContext);

  return (
    <>
      <div className={style.login_form}>
        <div className={style.form_container}>
          <p className={style.title}>Login</p>
          <form className={style.form}>
            <div className={style.input_group}>
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder=""
                // onChange={handleChange}
                // value={email}
                required
              />
            </div>
            <div className={style.input_group}>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder=""
                // onChange={handleChange}
                // value={password}
                required
              />
              <div className={style.forgot}>
                <a rel="noopener noreferrer" href="/resetpassword">
                  Forgot Password ?
                </a>
              </div>
            </div>
            <button
              className="btn btn-success d-block mx-auto w-100"
              type="submit"
              // onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {/* <div className="container auth__container">
        <h1 className="main__title">Login</h1> */}

      {/* {isLoading && <Spinner />} */}

      {/* <form className="auth__form">
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          <Link to="/resetpassword">Forget Password ?</Link>

          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div> */}
    </>
  );
};

export default Login;
