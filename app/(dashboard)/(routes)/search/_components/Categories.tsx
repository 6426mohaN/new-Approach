"use client"

import { Category } from '@prisma/client'
import{

    FcMultipleDevices,
    FcElectricity,
    FcAutomotive,

} from 'react-icons/fc'

import { 

  FaSkullCrossbones,
  FaPlane 

} from "react-icons/fa";

import { GiBattleTank } from "react-icons/gi";
import { IconType } from "react-icons/lib"
import { MdElectricBolt } from "react-icons/md";

import CategoryItem from './category-item'
interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
   "Computer Science": FcMultipleDevices,
    "Eectrical Power": FcElectricity,
    "Electronics": MdElectricBolt,
    "Chemical": FaSkullCrossbones,
    "Aeronautics": FaPlane,
    "Armament": GiBattleTank,
    "Motor Vehicles": FcAutomotive
}

export const Categories = ({
    items,
}: CategoriesProps) => {
  return (
    <div className=" flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
        key = {item.id}
        label = {item.name} 
        icon = {iconMap[item.name]}
        value = {item.id}
        />
      ))}
    </div>
  )
}
