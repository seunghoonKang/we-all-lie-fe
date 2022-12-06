import React from 'react';
import { ReactComponent as CategoryFood } from '../../assets/category_food.svg';
import { ReactComponent as CategorySport } from '../../assets/category_sport.svg';
import { ReactComponent as CategoryCountry } from '../../assets/category_country.svg';
import { ReactComponent as CategoryAnimal } from '../../assets/category_animal.svg';

const SelectCategoryImg = ({ category }) => {
  return (
    <>
      {category === '스포츠' ? (
        <CategorySport />
      ) : category === '음식' ? (
        <CategoryFood />
      ) : category === '도시' ? (
        <CategoryCountry />
      ) : category === '동물' ? (
        <CategoryAnimal />
      ) : category === '장소' ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectCategoryImg;
