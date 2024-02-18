import { StarshipDetailResult } from "../../../../api/starships/models/starship-detail-result";
import { Card, CardProperty } from "../../base/models/card";
import { StarshipProps } from "../models/starship-props";

const cardPropertyKeys: StarshipProps[] = ["length", "starshipClass", "crew"];

export const mapStarship = (model: StarshipDetailResult): Card => {
  if (!model) {
    return null;
  }

  return {
    title: model.name,
    properties: cardPropertyKeys.reduce(
      (prev, key: StarshipProps) => ({
        ...prev,
        [key]: mapToCardProperty(key, model[key]),
      }),
      {}
    ),
  };
};

const mapToCardProperty = (
  key: StarshipProps,
  value: unknown
): CardProperty => {
  return {
    translationKey: getTranslationKey(key),
    value: getValue(value),
    rawValue: value,
  };
};

const getTranslationKey = (key: StarshipProps): string => {
  return `cards.starships.${key}`;
};

const getValue = <T>(value: T): string => {
  return value?.toString();
};
