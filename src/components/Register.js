import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";

const Register = ({ handleRegister, waiting }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  };

  return (
    <>
      <Header
        mailHandler=""
        buttonText="Войти"
        linkHandler={() => history.push("/sign-in")}
        buttonClass=""
      />
      <section className="register">
        <h2 className="popup__title register__title">Регистрация</h2>
        <form className="popup__form register__form" onSubmit={handleSubmit}>
          <input
            required
            name="email"
            type="email"
            className="register__input register__input_type_email"
            placeholder="Email"
            minLength="5"
            maxLength="40"
            value={data.email}
            onChange={handleChange}
          />

          <input
            required
            name="password"
            type="password"
            className="register__input register__input_type_password"
            placeholder="Пароль"
            minLength="1"
            maxLength="40"
            value={data.password}
            onChange={handleChange}
          />

          <button type="submit" className="popup__submit register__button">
            {waiting || "Зарегистрироваться"}
          </button>
        </form>

        <div className="register__login">
          <p className="register__login-text">
            Уже зарегистрированы&#63;&nbsp;
          </p>
          <Link to="/sign-in" className="register__link">
            Войти
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;
