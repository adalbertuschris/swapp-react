import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

function Home() {
  const { t } = useTranslation();

  return (
    <div className={classes["homepage"]}>
      <h1 className={classes["title"]}>{t("home.title")}</h1>

      <div className={classes["game-group"]}>
        <h3 className={classes["game-group-title"]}>{t("cards.title")}</h3>

        <ul className={classes["game-list"]}>
          <li className={classes["game-list-item"]}>
            <Link data-test="resource-link" to="/cards/people">
              {t("cards.people.title")}
            </Link>
          </li>
          <li className={classes["game-list-item"]}>
            <Link data-test="resource-link" to="/cards/starships">
              {t("cards.starships.title")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
