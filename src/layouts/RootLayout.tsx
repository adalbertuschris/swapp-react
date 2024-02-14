import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import classes from "./RootLayout.module.css";

function RootLayout() {
  const { t } = useTranslation();

  return (
    <>
      <Toolbar>
        <Link data-test="title" className={classes["link"]} to="/">
          {t("app.title")}
        </Link>
      </Toolbar>

      <div className="main">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
