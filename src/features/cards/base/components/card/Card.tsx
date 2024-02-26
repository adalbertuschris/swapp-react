import { useTranslation } from "react-i18next";
import { Card as CardInfo } from "../../models/card";
import classes from "./Card.module.css";

type CardProps = {
  card: CardInfo;
};

function Card({ card }: CardProps) {
  const { t } = useTranslation();

  const cardProperties = Object.values(card.properties);

  return (
    <div className={classes["card"]}>
      <div className={classes["card-header"]}>
        <div className={classes["card-title"]}>{card.title}</div>
        {card?.subtitle && (
          <div className={classes["card-subtitle"]}>{card.subtitle}</div>
        )}
      </div>

      <ul className={classes["card-content"]}>
        {cardProperties.map((property) => (
          <li key={property.translationKey}>
            {t(property.translationKey)}: {property.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
