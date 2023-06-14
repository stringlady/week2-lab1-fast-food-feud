// IMPORT ANY NEEDED COMPONENTS HERE
import { Dataset } from "./data/dataset"
import "./App.css"
import Header from "../src/components/Header/Header"
import Chip from "../src/components/Chip/Chip"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"
import { useState } from "react"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!

export function App() {
  const { data, categories, restaurants } = Dataset.createDataSet()
  const [categoryName, setCategoryName] = useState(null);
  const [resName, setResName] = useState(null);
  const [item, setItem] = useState(null);
  const currentMenuItems = data.filter((item) => {

    return item.food_category === categoryName && item.restaurant === resName
  })
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((cat, idx) =>(
            <Chip 
            key={cat} 
            label={cat}
            handleClick={() => {setCategoryName(cat)}} 
            isActive = {categoryName === cat}/>
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header title={appInfo.title} tagline={appInfo.tagline} desc={appInfo.description}/>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((res, idx) => (
            <Chip 
            key={res} 
            label={res}
            handleClick={() => {setResName(res)}}
            isActive={resName === res}/>
          ))}</div>
        </div>

        {/* INSTRUCTIONS GO HERE */}

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((value, idx) => (
              <Chip 
              key={value} 
              label={value.item_name}
              handleClick={()=>{setItem(value)}}
              isActive={item === value}/>
            ))}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">{
            item?<NutritionalLabel item={item}/>:null
          }</div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
