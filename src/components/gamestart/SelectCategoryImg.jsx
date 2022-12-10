import React from 'react';
import { ReactComponent as CategoryFood } from '../../assets/category_food.svg';
import { ReactComponent as CategorySport } from '../../assets/category_sport.svg';
import { ReactComponent as CategoryCountry } from '../../assets/category_country.svg';
import { ReactComponent as CategoryAnimal } from '../../assets/category_animal.svg';
import { ReactComponent as CategoryPlace } from '../../assets/category_place.svg';

const SelectCategoryImg = ({ category, width, height }) => {
  return (
    <>
      {category === '스포츠' && <CategorySport width={width} height={height} />}
      {category === '음식' && <CategoryFood width={width} height={height} />}
      {category === '나라' && <CategoryCountry width={width} height={height} />}
      {category === '동물' && <CategoryAnimal width={width} height={height} />}
      {category === '장소' && <CategoryPlace width={width} height={height} />}
    </>
  );
};

export default SelectCategoryImg;
